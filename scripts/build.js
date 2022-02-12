const fs = require('fs').promises
const camelcase = require('camelcase')
const { promisify } = require('util')
const rimraf = promisify(require('rimraf'))
const svgr = require('@svgr/core').default
const babel = require('@babel/core')
const { compile: compileVue } = require('@vue/compiler-dom')

let transform = {
  react: async (svg, componentName, format) => {
    let component = await svgr(svg, {}, { componentName })
    let { code } = await babel.transformAsync(component, {
      plugins: [[require('@babel/plugin-transform-react-jsx'), { useBuiltIns: true }]],
    })

    if (format === 'esm') {
      return code
    }

    return code
      .replace('import * as React from "react"', 'const React = require("react")')
      .replace('export default', 'module.exports =')
  },
  vue: (svg, componentName, format) => {
    let { code } = compileVue(svg, {
      mode: 'module',
    })

    if (format === 'esm') {
      return code.replace('export function', 'export default function')
    }

    return code
      .replace(
        /import\s+\{\s*([^}]+)\s*\}\s+from\s+(['"])(.*?)\2/,
        (_match, imports, _quote, mod) => {
          let newImports = imports
            .split(',')
            .map((i) => i.trim().replace(/\s+as\s+/, ': '))
            .join(', ')

          return `const { ${newImports} } = require("${mod}")`
        }
      )
      .replace('export function render', 'module.exports = function render')
  },
  svelte: (svg, componentName, format) => {
    return svg.replace("<svg ", () => "<svg {...$$props} ")
  },
}

async function getIcons(style) {
  let files = await fs.readdir(`./optimized/${style}`)
  return Promise.all(
    files.map(async (file) => ({
      svg: await fs.readFile(`./optimized/${style}/${file}`, 'utf8'),
      componentName: `${camelcase(file.replace(/\.svg$/, ''), {
        pascalCase: true,
      })}Icon`,
    }))
  )
}

function exportAll(icons, format, includeExtension = true) {
  return icons
    .map(({ componentName }) => {
      let extension = includeExtension ? '.js' : ''
      if (format === 'esm') {
        return `export { default as ${componentName} } from './${componentName}${extension}'`
      }
      return `module.exports.${componentName} = require("./${componentName}${extension}")`
    })
    .join('\n')
}

async function buildIcons(package, style, format) {
  let outDir = `./${package}/${style}`
  if (format === 'esm') {
    outDir += '/esm'
  }

  await fs.mkdir(outDir, { recursive: true })

  let icons = await getIcons(style)

  await Promise.all(
    icons.flatMap(async ({ componentName, svg }) => {
      let content = await transform[package](svg, componentName, format)

      const settingsByPackage = {
        react: {
          types: `import * as React from 'react';\ndeclare function ${componentName}(props: React.ComponentProps<'svg'>): JSX.Element;\nexport default ${componentName};\n`,
          ext: 'js',
        },
        vue: {
          types: `import { RenderFunction } from 'vue';\ndeclare const ${componentName}: RenderFunction;\nexport default ${componentName};\n`,
          ext: 'js',
        },
        svelte: {
          types: `import { SvelteComponentTyped } from "svelte";\nexport declare class ${componentName} extends SvelteComponentTyped<svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["svg"]>, {}, { default: {}; } > {};`,
          ext: 'svelte',
          additionalAction(){
            fs.writeFile(`${outDir}/${componentName}.js`, `import ${componentName} from "./${componentName}.svelte";\nexport default ${componentName};`, 'utf8')
          }
        },
      }

      const { types, ext, additionalAction } = settingsByPackage[package]

      const actions = [
        fs.writeFile(`${outDir}/${componentName}.${ext}`, content, 'utf8'),
        ...(types ? [fs.writeFile(`${outDir}/${componentName}.d.ts`, types, 'utf8')] : []),
      ]

      if(additionalAction){
        actions.push(additionalAction())
      }

      return actions
    })
  )

  await fs.writeFile(`${outDir}/index.js`, exportAll(icons, format), 'utf8')

  await fs.writeFile(`${outDir}/index.d.ts`, exportAll(icons, 'esm', false), 'utf8')
}

function main(package) {
  console.log(`Building ${package} package...`)

  Promise.all([rimraf(`./${package}/outline/*`), rimraf(`./${package}/solid/*`)])
    .then(() =>
      Promise.all([
        buildIcons(package, 'solid', 'esm'),
        buildIcons(package, 'solid', 'cjs'),
        buildIcons(package, 'outline', 'esm'),
        buildIcons(package, 'outline', 'cjs'),
        fs.writeFile(`./${package}/outline/package.json`, `{"module": "./esm/index.js"}`, 'utf8'),
        fs.writeFile(`./${package}/outline/esm/package.json`, `{"type": "module"}`, 'utf8'),
        fs.writeFile(`./${package}/solid/package.json`, `{"module": "./esm/index.js"}`, 'utf8'),
        fs.writeFile(`./${package}/solid/esm/package.json`, `{"type": "module"}`, 'utf8'),
      ])
    )
    .then(() => console.log(`Finished building ${package} package.`))
}

let [package] = process.argv.slice(2)

if (!package) {
  throw Error('Please specify a package')
}

main(package)
