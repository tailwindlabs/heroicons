const fs = require('fs').promises
const path = require('path')

const srcPaths = {
  micro: path.resolve(__dirname, '../src/16/solid/'),
  mini: path.resolve(__dirname, '../src/20/solid/'),
  solid: path.resolve(__dirname, '../src/24/solid/'),
  outline: path.resolve(__dirname, '../src/24/outline/'),
}

const deprecated = [
  'arrow-left-on-rectangle.svg',
  'arrow-right-on-rectangle.svg',
  'arrow-small-down.svg',
  'arrow-small-left.svg',
  'arrow-small-right.svg',
  'arrow-small-up.svg',
  'bold.svg',
  'italic.svg',
  'minus-small.svg',
  'plus-small.svg',
  'underline.svg',
  'viewfinder-circle.svg',
  'arrow-left-on-rectangle.svg',
  'arrow-right-on-rectangle.svg',
  'arrow-small-down.svg',
  'arrow-small-left.svg',
  'arrow-small-right.svg',
  'arrow-small-up.svg',
  'bold.svg',
  'italic.svg',
  'minus-small.svg',
  'plus-small.svg',
  'underline.svg',
  'viewfinder-circle.svg',
  'arrow-left-on-rectangle.svg',
  'arrow-right-on-rectangle.svg',
  'arrow-small-down.svg',
  'arrow-small-left.svg',
  'arrow-small-right.svg',
  'arrow-small-up.svg',
  'bold.svg',
  'italic.svg',
  'minus-small.svg',
  'plus-small.svg',
  'underline.svg',
  'viewfinder-circle.svg',
]

async function main() {
  let files = await Promise.all(
    Object.entries(srcPaths).map(async ([name, path]) => {
      return { name, files: (await fs.readdir(path)).filter((file) => file.endsWith('.svg')) }
    })
  )

  let diffs = []
  for (let current of files) {
    for (let other of files) {
      if (current === other) continue

      for (let file of current.files) {
        if (!other.files.includes(file)) {
          // Ignore deprecated icons in micro
          // They're not going to be added
          if (other.name === 'micro' && deprecated.includes(file)) continue

          diffs.push({
            package: current.name,
            file: file,
            'Missing in?': other.name,
          })
        }
      }
    }
  }
  if (diffs.length > 0) {
    console.table(diffs)
  } else {
    console.log('All good!')
  }
}

main()
