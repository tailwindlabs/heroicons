// The only reason this file exists is to appease Vite's optimizeDeps feature which requires a root-level import.

module.exports = new Proxy(
  {},
  {
    get: (_, property) => {
      if (property === '__esModule') {
        return {}
      }

      throw new Error(
        `Importing from \`@heroicons/vue\` directly is not supported. Please import from either \`@heroicons/vue/20/solid\`, \`@heroicons/vue/24/solid\`, or \`@heroicons/vue/24/outline\` instead.`
      )
    },
  }
)
