const fs = require('fs').promises
const camelcase = require('camelcase')
const { promisify } = require('util')
const rimraf = promisify(require('rimraf'))
const svgr = require('@svgr/core').default
const babel = require('@babel/core')
const { compile: compileVue } = require('@vue/compiler-dom')
const { dirname } = require('path')
const { deprecated } = require('./deprecated')

let transform = {
  react: async (svg, componentName, format, isDeprecated) => {
    let component = await svgr(svg, { ref: true, titleProp: true }, { componentName })
    let { code } = await babel.transformAsync(component, {
      plugins: [[require('@babel/plugin-transform-react-jsx'), { useBuiltIns: true }]],
    })

    // Add a deprecation warning to the component
    if (isDeprecated) {
      /** @type {string[]} */
      let lines = code.split('\n')
      lines.splice(1, 0, `/** @deprecated */`)
      code = lines.join('\n')
    }

    code = code.replace('React.forwardRef(', '/*#__PURE__*/ React.forwardRef(')

    if (format === 'esm') {
      return code
    }

    return code
      .replace('import * as React from "react"', 'const React = require("react")')
      .replace('export default', 'module.exports =')
  },
  vue: (svg, componentName, format, isDeprecated) => {
    let { code } = compileVue(svg, {
      mode: 'module',
    })

    // Add a deprecation warning to the component
    if (isDeprecated) {
      /** @type {string[]} */
      let lines = code.split('\n')
      lines.splice(2, 0, `/** @deprecated */`)
      code = lines.join('\n')
    }

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
}

async function getIcons(style) {
  let files = await fs.readdir(`./optimized/${style}`)
  return Promise.all(
    files.map(async (file) => ({
      svg: await fs.readFile(`./optimized/${style}/${file}`, 'utf8'),
      componentName: `${camelcase(file.replace(/\.svg$/, ''), {
        pascalCase: true,
      })}Icon`,
      isDeprecated: deprecated.includes(file),
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

async function ensureWrite(file, text) {
  await fs.mkdir(dirname(file), { recursive: true })
  await fs.writeFile(file, text, 'utf8')
}

async function ensureWriteJson(file, json) {
  await ensureWrite(file, JSON.stringify(json, null, 2) + '\n')
}

async function buildIcons(package, style, format) {
  let outDir = `./${package}/${style}`
  if (format === 'esm') {
    outDir += '/esm'
  }

  let icons = await getIcons(style)

  await Promise.all(
    icons.flatMap(async ({ componentName, svg, isDeprecated }) => {
      let content = await transform[package](svg, componentName, format, isDeprecated)

      /** @type {string[]} */
      let types = []

      if (package === 'react') {
        types.push(`import * as React from 'react';`)
        if (isDeprecated) {
          types.push(`/** @deprecated */`)
        }
        types.push(`declare const ${componentName}: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>;`)
        types.push(`export default ${componentName};`)
      } else {
        types.push(`import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue';`)
        if (isDeprecated) {
          types.push(`/** @deprecated */`)
        }
        types.push(`declare const ${componentName}: FunctionalComponent<HTMLAttributes & VNodeProps>;`)
        types.push(`export default ${componentName};`)
      }

      return [
        ensureWrite(`${outDir}/${componentName}.js`, content),
        ...(types ? [ensureWrite(`${outDir}/${componentName}.d.ts`, types.join("\n") + "\n")] : []),
      ]
    })
  )

  await ensureWrite(`${outDir}/index.js`, exportAll(icons, format))

  await ensureWrite(`${outDir}/index.d.ts`, exportAll(icons, 'esm', false))
}

/**
 * @param {string[]} styles
 */
async function buildExports(styles) {
  let pkg = {}

  // To appease Vite's optimizeDeps feature which requires a root-level import
  pkg[`.`] = {
    import: `./index.esm.js`,
    require: `./index.js`,
  }

  // For those that want to read the version from package.json
  pkg[`./package.json`] = { default: './package.json' }

  // Backwards compatibility with v1 imports (points to proxy that prints an error message):
  pkg['./outline'] = { default: './outline/index.js' }
  pkg['./outline/index'] = { default: './outline/index.js' }
  pkg['./outline/index.js'] = { default: './outline/index.js' }
  pkg['./solid'] = { default: './solid/index.js' }
  pkg['./solid/index'] = { default: './solid/index.js' }
  pkg['./solid/index.js'] = { default: './solid/index.js' }

  // Explicit exports for each style:
  for (let style of styles) {
    pkg[`./${style}`] = {
      types: `./${style}/index.d.ts`,
      import: `./${style}/esm/index.js`,
      require: `./${style}/index.js`,
    }
    pkg[`./${style}/*`] = {
      types: `./${style}/*.d.ts`,
      import: `./${style}/esm/*.js`,
      require: `./${style}/*.js`,
    }
    pkg[`./${style}/*.js`] = {
      types: `./${style}/*.d.ts`,
      import: `./${style}/esm/*.js`,
      require: `./${style}/*.js`,
    }

    // This dir is basically an implementation detail, but it's needed for
    // backwards compatibility in case people were importing from it directly.
    pkg[`./${style}/esm/*`] = {
      types: `./${style}/*.d.ts`,
      import: `./${style}/esm/*.js`,
    }
    pkg[`./${style}/esm/*.js`] = {
      types: `./${style}/*.d.ts`,
      import: `./${style}/esm/*.js`,
    }
  }

  return pkg
}

async function main(package) {
  const cjsPackageJson = { module: './esm/index.js', sideEffects: false }
  const esmPackageJson = { type: 'module', sideEffects: false }

  console.log(`Building ${package} package...`)

  await Promise.all([
    rimraf(`./${package}/16/solid/*`),
    rimraf(`./${package}/20/solid/*`),
    rimraf(`./${package}/24/outline/*`),
    rimraf(`./${package}/24/solid/*`),
  ])

  await Promise.all([
    buildIcons(package, '16/solid', 'cjs'),
    buildIcons(package, '16/solid', 'esm'),
    buildIcons(package, '20/solid', 'cjs'),
    buildIcons(package, '20/solid', 'esm'),
    buildIcons(package, '24/outline', 'cjs'),
    buildIcons(package, '24/outline', 'esm'),
    buildIcons(package, '24/solid', 'cjs'),
    buildIcons(package, '24/solid', 'esm'),
    ensureWriteJson(`./${package}/16/solid/esm/package.json`, esmPackageJson),
    ensureWriteJson(`./${package}/16/solid/package.json`, cjsPackageJson),
    ensureWriteJson(`./${package}/20/solid/esm/package.json`, esmPackageJson),
    ensureWriteJson(`./${package}/20/solid/package.json`, cjsPackageJson),
    ensureWriteJson(`./${package}/24/outline/esm/package.json`, esmPackageJson),
    ensureWriteJson(`./${package}/24/outline/package.json`, cjsPackageJson),
    ensureWriteJson(`./${package}/24/solid/esm/package.json`, esmPackageJson),
    ensureWriteJson(`./${package}/24/solid/package.json`, cjsPackageJson),
  ])

  let packageJson = JSON.parse(await fs.readFile(`./${package}/package.json`, 'utf8'))

  packageJson.exports = await buildExports(['16/solid', '20/solid', '24/outline', '24/solid'])

  await ensureWriteJson(`./${package}/package.json`, packageJson)

  return console.log(`Finished building ${package} package.`)
}

let [package] = process.argv.slice(2)

if (!package) {
  throw new Error('Please specify a package')
}

main(package)
