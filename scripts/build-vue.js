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
            return fs.readFile(`./solid/${file}`, 'utf8').then((svg) => {
              const fileName = `${camelcase(file.replace(/\.svg$/, ''), {
                pascalCase: true,
              })}.vue`
              const content = `<template>${svg}</template>`
              return fs.writeFile(`./vue/solid/${fileName}`, content).then(() => fileName)
            })
          })
        )
      }),

      fs.readdir('./outline').then((files) => {
        return Promise.all(
          files.map((file) => {
            return fs.readFile(`./outline/${file}`, 'utf8').then((svg) => {
              const fileName = `${camelcase(file.replace(/\.svg$/, ''), {
                pascalCase: true,
              })}.vue`
              const content = `<template>${svg}</template>`
              return fs.writeFile(`./vue/outline/${fileName}`, content).then(() => fileName)
            })
          })
        )
      }),
    ])
  })
  .then(() => console.log('Finished building Vue components.'))
