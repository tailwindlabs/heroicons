<p align="center">
  <a href="https://heroicons.com" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/tailwindlabs/heroicons/HEAD/.github/logo-dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/tailwindlabs/heroicons/HEAD/.github/logo-light.svg">
      <img alt="Heroicons" width="315" height="117" style="max-width: 100%" src="https://raw.githubusercontent.com/tailwindlabs/heroicons/HEAD/.github/logo-light.svg">
    </picture>
  </a>
</p>

<p align="center">Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS.<p>

<p align="center">
  <a href="https://heroicons.com"><strong>Browse at Heroicons.com &rarr;</strong></a>
</p>

<p align="center">
    <a href="https://github.com/tailwindlabs/heroicons/releases"><img src="https://img.shields.io/npm/v/@heroicons/vue" alt="Latest Release"></a>
    <a href="https://github.com/tailwindlabs/heroicons/blob/master/vue/LICENSE"><img src="https://img.shields.io/npm/l/@heroicons/vue.svg" alt="License"></a>
</p>

## Basic Usage

First, install `@heroicons/vue` from npm:

```sh
npm install @heroicons/vue
```

Now each icon can be imported individually as a Vue component:

```vue
<template>
  <div>
    <BeakerIcon class="size-6 text-blue-500" />
    <p>...</p>
  </div>
</template>

<script setup>
import { BeakerIcon } from '@heroicons/vue/24/solid'
</script>
```

The 24x24 outline icons can be imported from `@heroicons/vue/24/outline`, the 24x24 solid icons can be imported from `@heroicons/vue/24/solid`, the 20x20 solid icons can be imported from `@heroicons/vue/20/solid`, and the 16x16 solid icons can be imported from `@heroicons/vue/16/solid`.

Icons use an upper camel case naming convention and are always suffixed with the word `Icon`.

[Browse the full list of icon names on UNPKG &rarr;](https://unpkg.com/browse/@heroicons/vue/24/outline/)

## Contributing

While we absolutely appreciate anyone's willingness to try and improve the project, we're currently only interested in contributions that fix bugs, for example things like incorrect TypeScript types, or fixing an icon that's been exported with a fill instead of a stroke, etc.

**We're not accepting contributions for new icons or adding support for other frameworks like Svelte or SolidJS**. Instead we encourage you to release your own icons in your own library, and create your own packages for any other frameworks you'd like to see supported.

## License

This library is MIT licensed.
