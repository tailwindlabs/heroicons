const fs = require('fs').promises
const path = require('path')

const srcPaths = {
  mini: path.resolve(__dirname, '../src/20/solid/'),
  solid: path.resolve(__dirname, '../src/24/solid/'),
  outline: path.resolve(__dirname, '../src/24/outline/'),
}

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
