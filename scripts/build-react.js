const fs = require('fs').promises
const camelcase = require('camelcase')
const { promisify } = require('util')
const rimraf = promisify(require('rimraf'))
const svgr = require('@svgr/core').default
const babel = require('@babel/core')

console.log('Building React components...')

async function svgToReact(svg, componentName, format) {
  let component = await svgr(svg, {}, { componentName })
  let { code } = await babel.transformAsync(component, {
    plugins: [
      [require('@babel/plugin-transform-react-jsx'), { useBuiltIns: true }],
    ],
  })

  if (format === 'esm') {
    return code
  }

  return code
    .replace('import * as React from "react"', 'const React = require("react")')
    .replace('export default', 'module.exports =')
}

async function getIcons(style) {
  let files = await fs.readdir(`./${style}`)
  return Promise.all(
    files.map(async (file) => ({
      svg: await fs.readFile(`./${style}/${file}`, 'utf8'),
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

async function buildIcons(style, format) {
  let outDir = `./react/${style}`
  if (format === 'esm') {
    outDir += '/esm'
  }

  await fs.mkdir(outDir, { recursive: true })

  let icons = await getIcons(style)

  await Promise.all(
    icons.flatMap(async ({ componentName, svg }) => [
      fs.writeFile(
        `${outDir}/${componentName}.js`,
        await svgToReact(svg, componentName, format),
        'utf8'
      ),
      fs.writeFile(
        `${outDir}/${componentName}.d.ts`,
        `import * as React from 'react';\ndeclare function ${componentName}(props: React.ComponentProps<'svg'>): JSX.Element;\nexport default ${componentName};\n`,
        'utf8'
      ),
    ])
  )

  await fs.writeFile(`${outDir}/index.js`, exportAll(icons, format), 'utf8')
  await fs.writeFile(
    `${outDir}/index.d.ts`,
    exportAll(icons, 'esm', false),
    'utf8'
  )
}

Promise.all([rimraf('./react/outline/*'), rimraf('./react/solid/*')])
  .then(() =>
    Promise.all([
      buildIcons('solid', 'esm'),
      buildIcons('solid', 'cjs'),
      buildIcons('outline', 'esm'),
      buildIcons('outline', 'cjs'),
      fs.writeFile(
        './react/outline/package.json',
        `{"module": "./esm/index.js"}`,
        'utf8'
      ),
      fs.writeFile(
        './react/solid/package.json',
        `{"module": "./esm/index.js"}`,
        'utf8'
      ),
    ])
  )
  .then(() => console.log('Finished building React components.'))
