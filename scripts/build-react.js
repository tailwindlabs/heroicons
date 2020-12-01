const fs = require('fs').promises
const camelcase = require('camelcase')
const { promisify } = require('util')
const rimraf = promisify(require('rimraf'))
const svgr = require('@svgr/core').default

const rootDir = './react'

console.log(svgr)

function svgToReact(svg, componentName) {
  return svgr(svg, { typescript: true }, { componentName })
}

console.log('Building React components...')

rimraf(`${rootDir}/lib/*`)
  .then(() => {
    return rimraf(`${rootDir}/solid/*`)
  })
  .then(() => {
    return Promise.all([
      fs.readdir('./solid').then((files) => {
        return Promise.all(
          files.map((file) => {
            const componentName = `${camelcase(file.replace(/\.svg$/, ''), { pascalCase: true })}`
            return fs
              .readFile(`./solid/${file}`, 'utf8')
              .then((content) => {
                return svgToReact(content, `${componentName}Icon`)
              })
              .then((component) => {
                const fileName = `${componentName}.tsx`
                const content = component
                return fs.writeFile(`${rootDir}/solid/${fileName}`, content).then(() => fileName)
              })
          })
        ).then((fileNames) => {
          const exportStatements = fileNames
            .map((fileName) => {
              const componentName = `${camelcase(fileName.replace(/\.tsx$/, ''), {
                pascalCase: true,
              })}`
              return `export { default as ${componentName} } from './${componentName}'`
            })
            .join('\n')

          return fs.writeFile(`${rootDir}/solid/index.ts`, exportStatements)
        })
      }),

      fs.readdir('./outline').then((files) => {
        return Promise.all(
          files.map((file) => {
            const componentName = `${camelcase(file.replace(/\.svg$/, ''), { pascalCase: true })}`
            return fs
              .readFile(`./outline/${file}`, 'utf8')
              .then((content) => {
                return svgToReact(content, `${componentName}Icon`)
              })
              .then((component) => {
                const fileName = `${componentName}.tsx`
                const content = component
                return fs.writeFile(`${rootDir}/outline/${fileName}`, content).then(() => fileName)
              })
          })
        ).then((fileNames) => {
          const exportStatements = fileNames
            .map((fileName) => {
              const componentName = `${camelcase(fileName.replace(/\.tsx$/, ''), {
                pascalCase: true,
              })}`
              return `export { default as ${componentName} } from './${componentName}'`
            })
            .join('\n')

          return fs.writeFile(`${rootDir}/outline/index.ts`, exportStatements)
        })
      }),
    ])
  })
  .then(() => console.log('Finished building React components.'))
