// The only reason this file exists is to appease Vite's optimizeDeps feature which requires a root-level import.

module.exports = new Proxy(
  {},
  {
    get: (_, property) => {
      if (property === '__esModule') {
        return {}
      }

      throw new Error(
        `Importing from \`@heroicons/svelte\` directly is not supported. Please import from either \`@heroicons/svelte/20/solid\`, \`@heroicons/svelte/24/solid\`, or \`@heroicons/svelte/24/outline\` instead.`
      )
    },
  }
)
