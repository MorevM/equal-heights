# @morev/equal-heights

![Stability of "master" branch](https://img.shields.io/github/workflow/status/MorevM/equal-heights/Build/master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Last commit](https://img.shields.io/github/last-commit/morevm/equal-heights)
![Release version](https://img.shields.io/github/v/release/morevm/equal-heights?include_prereleases)
![GitHub Release Date](https://img.shields.io/github/release-date/morevm/equal-heights)
![Keywords](https://img.shields.io/github/package-json/keywords/morevm/equal-heights)

JavaScript plugin to make elements the same height across different containers. \
In fact, this is a crutch, but it's necessary until we get [CSS Subgrid](https://caniuse.com/css-subgrid) ready.

> If you can use CSS Subgrid - use it. \
> This plugin tries to do literally the same, but, of course, is less performant than browsers can do.

Plugin is written in pure JavaScript, so it can be called "framework agnostic". \
There is already a version for Vue 2 and 3 done via [directives](https://vuejs.org/guide/reusability/custom-directives.html).

## Table of contents

* [Installation](#installation)
  * [Using `yarn`](#using-yarn)
  * [Using `npm`](#using-npm)
  * [Using `pnpm`](#using-pnpm)
* [Usage](#usage)
* [Options](#options)
* [Methods](#methods)
* [Vue module](#vue-module)
  * [Global registration](#global-registration)
  * [Local registration](#local-registration)
  * [Example](#examples)

## Installation

### Using `yarn`

```bash
yarn add @morev/equal-heights
```

### Using `npm`

```bash
npm install @morev/equal-heights
```

### Using `pnpm`

```bash
pnpm add @morev/equal-heights
```

## Usage

```js
import { EqualHeights } from '@morev/equal-heights';

const equalHeights = new EqualHeights({
  /* custom options for all groups of elements (optional) */
});

equalHeights.add([
  { selector: '.some-selector', options: { /* custom options for this group of elements (optional) */ } },
  { selector: '.another-selector' },
]);
```

## Options

<details>
  <summary><code>byRows</code></summary>
  <br />

  Whether only the elements in the same row should have equal height, instead of all the elements in stack.

  ```ts
  // Default: true
  export type OptionByRows = boolean;
  ```

</details>

<details>
  <summary><code>isEnabled</code></summary>
  <br />

  A function to test whether the elements should have the equal height. Accepts the `window` object as the argument. \
  Returns a value that coerces to `true` to set equal height, or to `false` otherwise.

  ```ts
  // Default: () => true
  export type OptionIsEnabled = (window: Window) => boolean;
  ```

</details>

<details>
  <summary><code>isDisabled</code></summary>
  <br />

  A function to test whether the elements should **not** have the equal height. Accepts the `window` object as the argument. \
  Returns a value that coerces to `true` to unset equal height, or to `false` otherwise.

  ```ts
  // Default: () => false
  export type OptionIsDisabled = (window: Window) => boolean;
  ```

</details>

<details>
  <summary><code>resizeObserver</code></summary>
  <br />

  Whether to observe resizing of the elements using the `ResizeObserver`.

  ```ts
  // Default: true
  export type OptionResizeObserver = boolean;
  ```

</details>

<details>
  <summary><code>mutationObserver</code></summary>
  <br />

  Whether to observe adding/removing of the elements using the `MutationObserver`.

  ```ts
  // Default: true
  export type OptionMutationObserver = boolean;
  ```

</details>

<details>
  <summary><code>parent</code></summary>
  <br />

  Common parent element of a given elements.

  ```ts
  // Default: document.body
  export type OptionMutationObserver = HTMLElement;
  ```

</details>

## Methods

<details>
  <summary><code>add</code></summary>
  <br />

  Adds a new group(s) of elements and (optionally) its specific options.

  **Parameters:**

  | Name   | Type                                 | Description                                                                                                       |
  |--------|--------------------------------------|-------------------------------------------------------------------------------------------------------------------|
  | input* | `string\|string[]\|object\|object[]` | Elements selector, an object structured of `{ selector: string, options?: object }`, or an array of such objects. |

  **Returns:**

  `EqualHeights` - The class instance.

  **Example:**

  ```js
  import { EqualHeights } from '@morev/equal-heights';

  const equalHeights = new EqualHeights();

  equalHeights.add('.selector-one');
  equalHeights.add({ selector: '.selector-two', options: { /* custom options (optional) */ } });
  equalHeights.add([
    { selector: '.selector-three', options: { /* custom options (optional) */ } },
    { selector: '.selector-four' },
  ]);
  ```

</details>

<details>
  <summary><code>remove</code></summary>
  <br />

  Removes the elements from the stack.

  **Parameters:**

  | Name      | Type                     | Description                                   |
  |-----------|--------------------------|-----------------------------------------------|
  | selector* | `string`                 | Selector of the elements being de-registered. |
  | parent    | `HTMLElement\|undefined` | Common parent element.                        |

  **Returns:**

  `EqualHeights` - The class instance.

  **Example:**

  ```js
  import { EqualHeights } from '@morev/equal-heights';

  const equalHeights = new EqualHeights();

  equalHeights.add([
    { selector: '.some-selector', options: { parent: document.querySelector('.parent-selector') } },
    { selector: '.another-selector' },
  ]);

  // ...

  equalHeights.remove('.some-selector', document.querySelector('.parent-selector'));
  // only the `.another-selector` elements are being processed now
  ```

</details>


<details>
  <summary><code>update</code></summary>
  <br />

  **Returns:**

  `EqualHeights` - The class instance.

  **Example:**

  ```js
  import { EqualHeights } from '@morev/equal-heights';

  const equalHeights = new EqualHeights();

  equalHeights.add([
    { selector: '.some-selector' },
    { selector: '.another-selector' },
  ]);

  // ...

  equalHeights.update(); // manually update all the registered elements sizes
  ```

</details>


<details>
  <summary><code>reset</code></summary>
  <br />

  Restores the initial state of all the registered elements and removes it from the stack.

  **Returns:**

  `EqualHeights` - The class instance.

  **Example:**

  ```js
  import { EqualHeights } from '@morev/equal-heights';

  const equalHeights = new EqualHeights();

  equalHeights.add([
    { selector: '.some-selector' },
    { selector: '.another-selector' },
  ]);

  // ...

  equalHeights.reset(); // there are no elements being processed now
  ```

</details>


## Vue module

The Vue module (2 and 3 both) distributes in the same package and avaliable via a named export called `/vue`.

In fact, there are three exports: `/vue`, `/vue2` and `/vue3`, and main `/vue` export is dynamical - it mapped to version of Vue used in your project.

Underhood, it utilized the [postinstall](https://docs.npmjs.com/cli/v8/using-npm/scripts) npm hook. \
After installing the package, the script will start to check the installed Vue version and redirect the exports to based on the local Vue version. \
If no Vue installation is found, the script will install the version for Vue 3 as default.

It feels pretty robust, but if you're worried about, prefer an explicit named import according to the version you're using.

> There are also CLI to switch mapping of main export: \
> `yarn equal-heights-vue-version <version>`, where `<version>` is "2" of "3"

<details>
  <summary>😥 I got an error "This dependency was not found"</summary>

  For environments that can't resolve `exports` field (such as [Nuxt 2](https://nuxtjs.org/))
  just replace import with direct path to file:

  ```js
  import { plugin as EqualHeights } from '@morev/equal-heights/dist/vue.cjs';
  ```

</details>

### Global registration

#### Vue 2

```js
import Vue from 'vue';
import { plugin as EqualHeights } from '@morev/equal-heights/vue';

Vue.use(EqualHeights);
```

#### Vue 3

```js
import { createApp } from 'vue';
import { plugin as EqualHeights } from '@morev/equal-heights/vue';

const app = createApp(App);
app.use(EqualHeights);
```

### Local registration

```vue
<template>
  <ul class="list" v-equal-heights="'.item-title'">
    // ...
  </ul>
</template>

<script>
  import { directive as equalHeights } from '@morev/equal-heights/vue';

  export default {
    name: 'some-component',
    directives: { equalHeights },
    // ...
  }
</script>
```

---

### Examples

#### Single selector

```vue
<template>
  <ul v-equal-heights="'.item-tags'">
    <li v-for="item in items" :key="item.id">
      <div class="item-tags">...</div>
      <img class="item-image" src="..." alt="Product image" />
      <div class="item-title">...</div>
    </li>
  </ul>
</template>
```

---

#### Multiple selectors

```vue
<template>
  <ul v-equal-heights="['.item-tags', '.item-title']">
    <li v-for="item in items" :key="item.id">
      <div class="item-tags">...</div>
      <img class="item-image" src="..." alt="Product image" />
      <div class="item-title">...</div>
    </li>
  </ul>
</template>
```

---

#### Custom options

```vue
<template>
  <ul
    v-equal-heights="{
      selector: '.item-tags', // May also be an array of strings
      options: {
        isEnabled: (window) => window.innerWidth >= 768,
      }
    }"
  >
    <li v-for="item in items" :key="item.id">
      <div class="item-tags">...</div>
      <img class="item-image" src="..." alt="Product image" />
      <div class="item-title">...</div>
    </li>
  </ul>
</template>
```

---

#### Multiple groups with custom options

```vue
<template>
  <ul
    v-equal-heights="[
      {
        selector: '.item-tags', // May also be an array of strings
        options: {
          isEnabled: (window) => window.innerWidth >= 768,
        }
      },
      {
        selector: '.item-title', // May also be an array of strings
        options: {
          isEnabled: (window) => isAligned && window.innerWidth >= 360,
        }
      }
    ]"
  >
    <li v-for="item in items" :key="item.id">
      <div class="item-tags">...</div>
      <img class="item-image" src="..." alt="Product image" />
      <div class="item-title">...</div>
    </li>
  </ul>
</template>
```
