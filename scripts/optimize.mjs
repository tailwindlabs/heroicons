import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { optimize } from 'svgo'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

/**
 * @param {object} attrs
 * @param {string[]} attrs.remove
 * @param {Record<string, string | null>} attrs.add
 * @returns {import('svgo').Config}
 */
function buildConfig({ remove, add }) {
  return {
    js2svg: {
      pretty: true,
      indent: 2,
    },

    plugins: [
      'preset-default',
      'removeDimensions',
      'sortAttrs',
      'cleanupListOfValues',
      {
        name: 'removeAttrs',
        params: {
          attrs: remove,
        },
      },
      {
        name: 'addAttributesToSVGElement',
        params: {
          attributes: [
            add,
            {
              'aria-hidden': 'true',
              'data-slot': 'icon',
            },
          ],
        },
      },
    ],
  }
}

let sets = {
  '16/solid': buildConfig({
    remove: ['fill'],
    add: { fill: 'currentColor' },
  }),

  '20/solid': buildConfig({
    remove: ['fill'],
    add: { fill: 'currentColor' },
  }),

  '24/solid': buildConfig({
    remove: ['fill'],
    add: { fill: 'currentColor' },
  }),

  '24/outline': buildConfig({
    remove: ['stroke', 'path:stroke-width'],
    add: {
      'stroke-width': '1.5',
      stroke: 'currentColor',
    },
  }),
}

let originalDir = path.resolve(__dirname, path.join('..', './src'))
let optimizedDir = path.resolve(__dirname, path.join('..', './'))

let start = process.hrtime.bigint()

let paths = []

await Promise.all(
  Object.entries(sets).map(async ([set, config]) => {
    console.log(`- Analyzing ${set}`)

    let inputDir = path.join(originalDir, set)
    let outputDir = path.join(optimizedDir, set)

    let files = await fs.readdir(inputDir, { recursive: true })

    for (let file of files) {
      if (!file.endsWith('.svg')) continue

      paths.push({
        inputPath: path.join(inputDir, file),
        outputPath: path.join(outputDir, file),
        config,
      })
    }
  })
)

console.log(`- Optimizing ${paths.length} SVGs`)

await Promise.all(
  paths.map(async ({ inputPath, outputPath, config }) => {
    let content = await fs.readFile(inputPath, 'utf8')
    let result = optimize(content, config)
    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(outputPath, result.data, { recursive: true })
  })
)

let elapsed = process.hrtime.bigint() - start

console.log(`- Done in ${(Number(elapsed) / 1e9).toFixed(3)} seconds`)
