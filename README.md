# @morev/equal-heights

![Stability of "master" branch](https://img.shields.io/github/workflow/status/MorevM/equal-heights/Build/master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Last commit](https://img.shields.io/github/last-commit/morevm/equal-heights)
![Release version](https://img.shields.io/github/v/release/morevm/equal-heights?include_prereleases)
![GitHub Release Date](https://img.shields.io/github/release-date/morevm/equal-heights)
![Keywords](https://img.shields.io/github/package-json/keywords/morevm/equal-heights)

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
import { MoreMatchHeight } from '@morev/equal-heights';

const matchHeight = new MoreMatchHeight({
  /* custom options for all groups of elements (optional) */
});

matchHeight.add([
  { selector: '.some-selector', options: { /* custom options for this group of elements (optional) */ } },
  { selector: '.another-selector' },
]);
```

### Vue module

```vue
<template>
  <div v-equal-heights="'.item'">
    <div class="item">...</div>
    <div class="item">...</div>
    <div class="item">...</div>
  </div>
</template>

<script>
  import { MoreMatchHeight } from '@morev/equal-heights/vue';

  export default {
    directives: {
      'equal-heights': MoreMatchHeight,
    },
  };
  </script>
```

Global usage:

```js
import MoreMatchHeight from '@morev/equal-heights/vue';

Vue.use(MoreMatchHeight);
```

## Options

### byRows

```ts
{
  byRows: boolean;
}
```

Whether only the elements in the same row should have equal height, instead of all the elements in stack.

Default: `true`.

### isEnabled

```ts
{
  isEnabled: (window: Window) => boolean;
}
```

A function to test whether the elements should have the equal height. Accepts the `window` object as the argument.\
Returns a value that coerces to `true` to set equal height, or to `false` otherwise.

Default: `() => true`.

### isDisabled

```ts
{
  isDisabled: (window: Window) => boolean;
}
```

A function to test whether the elements should not have the equal height. Accepts the `window` object as the argument.\
Returns a value that coerces to `true` to unset equal height, or to `false` otherwise.

Default: `() => true`.

### resizeObserver

```ts
{
  resizeObserver: boolean;
}
```

Whether to observe resizing of the elements using the `ResizeObserver`.

Default: `true`.

### mutationObserver

```ts
{
  mutationObserver: boolean;
}
```

Whether to observe adding/removing of the elements using the `MutationObserver`.

Default: `true`.

### parent

```ts
{
  parent: HTMLElement;
}
```

Common parent element of a given elements.

Default: `document.body`.

## Methods

### add

Adds a new group(s) of elements and (optionally) its specific options.

**Parameters:**

| Name   | Type                       | Default | Description                                                                                                                       |
|--------|----------------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------|
| input* | `string\|object\|object[]` | —       | The input settings: elements selector, an object structured of {selector: string, options?: object}, or an array of such objects. |

**Returns:**

`MoreMatchHeight` - The class instance.

**Example:**

```js
import { MoreMatchHeight } from '@morev/equal-heights';

const matchHeight = new MoreMatchHeight();

matchHeight.add('.selector-one');
matchHeight.add({ selector: '.selector-two', options: { /* custom options (optional) */ } });
matchHeight.add([
  { selector: '.selector-three', options: { /* custom options (optional) */ } },
  { selector: '.selector-four' },
]);
```

### remove

Removes the elements from the stack.

**Parameters:**

| Name      | Type                     | Default     | Description                                   |
|-----------|--------------------------|-------------|-----------------------------------------------|
| selector* | `string`                 | —           | Selector of the elements being de-registered. |
| parent    | `HTMLElement\|undefined` | `undefined` | Common parent element.                        |

**Returns:**

`MoreMatchHeight` - The class instance.

**Example:**

```js
import { MoreMatchHeight } from '@morev/equal-heights';

const matchHeight = new MoreMatchHeight();

matchHeight.add([
  { selector: '.some-selector', options: { parent: document.querySelector('.parent-selector') } },
  { selector: '.another-selector' },
]);

// ...

matchHeight.remove('.some-selector', document.querySelector('.parent-selector')); // only the `.another-selector` elements are being processed now
```

### update

Updates the registered elements state.

**Parameters:**

—

**Returns:**

`MoreMatchHeight` - The class instance.

**Example:**

```js
import { MoreMatchHeight } from '@morev/equal-heights';

const matchHeight = new MoreMatchHeight();

matchHeight.add([
  { selector: '.some-selector' },
  { selector: '.another-selector' },
]);

// ...

matchHeight.update(); // manually update all the registered elements sizes
```

### reset

Restores the initial state of all the registered elements and removes it from the stack.

**Parameters:**

—

**Returns:**

`MoreMatchHeight` - The class instance.

**Example:**

```js
import { MoreMatchHeight } from '@morev/equal-heights';

const matchHeight = new MoreMatchHeight();

matchHeight.add([
  { selector: '.some-selector' },
  { selector: '.another-selector' },
]);

// ...

matchHeight.reset(); // there are no elements being processed now
```
