// The only reason this file exists is to appease Vite's optimizeDeps feature which requires a root-level import.

export default new Proxy(
  {},
  {
    get: (_, property) => {
      if (property === '__esModule') {
        return {}
      }

      throw new Error(
        `Importing from \`@jokula-heroicons/vue\` directly is not supported. Please import from either \`@jokula-heroicons/vue/16/jk\`, \`@jokula-heroicons/vue/20/jk\`, \`@jokula-heroicons/vue/24/jk\`, \`@jokula-heroicons/vue/16/solid\`, \`@jokula-heroicons/vue/20/solid\`, \`@jokula-heroicons/vue/24/solid\`, or \`@jokula-heroicons/vue/24/outline\` instead.`
      )
    },
  }
)
