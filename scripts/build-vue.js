const svgToVue = require('svg-to-vue')
const fs = require('fs').promises
const dedent = require('dedent')
const camelcase = require('camelcase')
const { promisify } = require('util')
const rimraf = promisify(require('rimraf'))

console.log('Building Vue components...')

rimraf('./vue/outline/*')
  .then(() => {
    return rimraf('./vue/solid/*')
  })
  .then(() => {
    return Promise.all([
      fs.readdir('./solid').then((files) => {
        return Promise.all(
          files.map((file) => {
            return fs
              .readFile(`./solid/${file}`, 'utf8')
              .then((content) => {
                return svgToVue(content)
              })
              .then((component) => {
                const fileName = `${camelcase(file.replace(/\.svg$/, ''), { pascalCase: true })}.js`
                return fs
                  .writeFile(`./vue/solid/${fileName}`, dedent(component))
                  .then(() => fileName)
              })
          })
        ).then((fileNames) => {
          const exportStatements = fileNames
            .map((fileName) => {
              const componentName = fileName.replace(/\.js$/, '')
              return `export { default as ${componentName} } from './${fileName}'`
            })
            .join('\n')

          return fs.writeFile('./vue/solid/index.js', exportStatements)
        })
      }),

      fs.readdir('./outline').then((files) => {
        return Promise.all(
          files.map((file) => {
            return fs
              .readFile(`./outline/${file}`, 'utf8')
              .then((content) => {
                return svgToVue(content)
              })
              .then((component) => {
                const fileName = `${camelcase(file.replace(/\.svg$/, ''), { pascalCase: true })}.js`
                return fs
                  .writeFile(`./vue/outline/${fileName}`, dedent(component))
                  .then(() => fileName)
              })
          })
        ).then((fileNames) => {
          const exportStatements = fileNames
            .map((fileName) => {
              const componentName = fileName.replace(/\.js$/, '')
              return `export { default as ${componentName} } from './${fileName}'`
            })
            .join('\n')

          return fs.writeFile('./vue/outline/index.js', exportStatements)
        })
      }),
    ])
  })
  .then(() => console.log('Finished building Vue components.'))
