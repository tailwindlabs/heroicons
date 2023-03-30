<p align="center">
  <a href="https://heroicons.com/#gh-light-mode-only" target="_blank">
    <img src="./.github/logo-light.svg" alt="Heroicons" width="300">
  </a>
  <a href="https://heroicons.com/#gh-dark-mode-only" target="_blank">
    <img src="./.github/logo-dark.svg" alt="Heroicons" width="300">
  </a>
</p>

<p align="center">
  Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS. <br>Available as basic SVG icons and via first-party <a href="#react">React</a> and <a href="#vue">Vue</a> libraries.
<p>

<p align="center">
  <a href="https://heroicons.com"><strong>Browse at Heroicons.com &rarr;</strong></a>
</p>

<p align="center">
    <a href="https://github.com/tailwindlabs/heroicons/releases"><img src="https://img.shields.io/npm/v/heroicons" alt="Latest Release"></a>
    <a href="https://github.com/tailwindlabs/heroicons/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/heroicons.svg" alt="License"></a>
</p>

## Basic Usage

The quickest way to use these icons is to simply copy the source for the icon you need from [heroicons.com](https://heroicons.com) and inline it directly into your HTML:

```html
<svg
  class="h-6 w-6 text-gray-500"
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

First, install `@heroicons/react` from npm:

```sh
npm install @heroicons/react
```

Now each icon can be imported individually as a React component:

```js
import { BeakerIcon } from '@heroicons/react/24/solid'

function MyComponent() {
  return (
    <div>
      <BeakerIcon className="h-6 w-6 text-blue-500" />
      <p>...</p>
    </div>
  )
}
```

The 24x24 outline icons can be imported from `@heroicons/react/24/outline`, the 24x24 solid icons can be imported from `@heroicons/react/24/solid`, and the 20x20 solid icons can be imported from `@heroicons/react/20/solid`.

Icons use an upper camel case naming convention and are always suffixed with the word `Icon`.

[Browse the full list of icon names on UNPKG &rarr;](https://unpkg.com/browse/@heroicons/react/24/outline/)

## Vue

_Note that this library currently only supports Vue 3._

First, install `@heroicons/vue` from npm:

```sh
npm install @heroicons/vue
```

Now each icon can be imported individually as a Vue component:

```vue
<template>
  <div>
    <BeakerIcon class="h-6 w-6 text-blue-500" />
    <p>...</p>
  </div>
</template>

<script setup>
import { BeakerIcon } from '@heroicons/vue/24/solid'
</script>
```

The 24x24 outline icons can be imported from `@heroicons/vue/24/outline`, the 24x24 solid icons can be imported from `@heroicons/vue/24/solid`, and the 20x20 solid icons can be imported from `@heroicons/vue/20/solid`.

Icons use an upper camel case naming convention and are always suffixed with the word `Icon`.

[Browse the full list of icon names on UNPKG &rarr;](https://unpkg.com/browse/@heroicons/vue/24/outline/)

## License

This library is MIT licensed.
