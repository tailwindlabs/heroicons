# sodaicons

## React

First, install `@sodaicons/react` from npm:

```sh
npm install @sodaicons/react
```

Now each icon can be imported individually as a React component:

```js
import { BeakerIcon } from '@sodaicons/react/solid'

function MyComponent() {
  return (
    <div>
      <BeakerIcon className="h-5 w-5 text-blue-500"/>
      <p>...</p>
    </div>
  )
}
```

The 24x24 outline icons can be imported from `@sodaicons/react/outline`, and the 20x20 solid icons can be imported from `@sodaicons/react/solid`.

Icons use an upper camel case naming convention and are always suffixed with the word `Icon`.

[Browse the full list of icon names on UNPKG &rarr;](https://unpkg.com/browse/@sodaicons/react/outline/)


## Vue

*Note that this library currently only supports Vue 3.*

First, install `@sodaicons/vue` from npm:

```sh
npm install @sodaicons/vue
```

Now each icon can be imported individually as a Vue component:

```vue
<template>
  <div>
    <BeakerIcon class="h-5 w-5 text-blue-500"/>
    <p>...</p>
  </div>
</template>

<script>
import { BeakerIcon } from '@sodaicons/vue/solid'

export default {
  components: { BeakerIcon }
}
</script>
```

The 24x24 outline icons can be imported from `@sodaicons/vue/outline`, and the 20x20 solid icons can be imported from `@sodaicons/vue/solid`.

Icons use an upper camel case naming convention and are always suffixed with the word `Icon`.

[Browse the full list of icon names on UNPKG &rarr;](https://unpkg.com/browse/@sodaicons/vue/outline/)

## License

This library is MIT licensed.
