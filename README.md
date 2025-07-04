<br>
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jokuladesign/jokula-heroicons/HEAD/.github/logo-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/jokuladesign/jokula-heroicons/HEAD/.github/logo-light.svg">
    <img alt="Heroicons" width="515" height="auto" style="max-width: 100%" src="https://raw.githubusercontent.com/jokuladesign/jokula-heroicons/HEAD/.github/logo-light.svg">
  </picture>
</p>
<br>

<p align="center">
  A Jokula hard fork of Heroicons. All icons are additive to the core Heroicons set, and are created in their own `jk` packages.
  <br><br>This fork attempts to leave the canonical Heroicon source svg directories untouched, enabling downstream sync from `tailwindlabs/heroicons` into the `src` directory.
  <br><br>See `.github/CONTRIBUTING.md` for more information.
  <br>Available as basic SVG icons and via first-party <a href="#react">React</a> and <a href="#vue">Vue</a> libraries.
<p>

<!-- p align="center">
    <a href="https://github.com/tailwindlabs/heroicons/releases"><img src="https://img.shields.io/npm/v/heroicons" alt="Latest Release"></a>
    <a href="https://github.com/tailwindlabs/heroicons/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/heroicons.svg" alt="License"></a>
</p -->

## Developer Notes
`npm run build && npm install`
<br>
See CONTRIBUTING.md

## Basic Usage

The quickest way to use these icons is to copy the source for the icon you need from the repository SVGs at `optimized/<16 | 20 | 24>/jk` and inline it directly into your HTML:

```html
<svg
  class="size-6 text-gray-500"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  stroke-width="2"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
  />
</svg>
```

Both icon styles are preconfigured to be stylable by setting the `color` CSS property, either manually or using utility classes like `text-gray-500` in a framework like [Tailwind CSS](https://tailwindcss.com).

## React

First, install `@jokula-heroicons/react` from npm:

```sh
npm install @jokula-heroicons/react
```

Now each icon can be imported individually as a React component:

```js
import { IslNorthernLightsIcon } from '@jokula-heroicons/react/24/jk'

function MyComponent() {
  return (
    <div>
      <IslNorthernLightsIcon className="size-6 text-blue-500" />
      <p>...</p>
    </div>
  )
}
```

The `jk` 16x16, 20x20, and 24x24 outline icons can be imported from `@jokula-heroicons/react/<16 | 20 | 24>/jk`.

The original 24x24 solid icons can be imported from `@jokula-heroicons/react/24/solid`, the 20x20 solid icons can be imported from `@jokula-heroicons/react/20/solid`, and the 16x16 solid icons can be imported from `@heroicons/react/16/solid`.


## Vue

First, install `@jokula-heroicons/vue` from npm:

```sh
npm install @jokula-heroicons/vue
```

Now each icon can be imported individually as a Vue component:

```vue
<template>
  <div>
    <IslNorthernLightsIcon class="size-6 text-blue-500" />
    <p>...</p>
  </div>
</template>

<script setup>
import { IslNorthernLightsIcon } from '@jokula-heroicons/vue/24/jk'
</script>
```

The `jk` 16x16, 20x20, and 24x24 outline icons can be imported from `@jokula-heroicons/vue/<16 | 20 | 24>/jk`.

The original 24x24 solid icons can be imported from `@jokula-heroicons/vue/24/solid`, the 20x20 solid icons can be imported from `@jokula-heroicons/vue/20/solid`, and the 16x16 solid icons can be imported from `@heroicons/vue/16/solid`.

Icons use an upper camel case naming convention and are always suffixed with the word `Icon`.

## License

This library is MIT licensed.
