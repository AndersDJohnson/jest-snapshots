# jest-snapshots

[![npm](https://img.shields.io/npm/v/jest-snapshots.svg)](https://www.npmjs.com/package/jest-snapshots)

> Jest snapshot test helper for React components with various props sets.

Used to DRY up and reduce boilerplate in tests. Low barrier to entry = less effort = encourage more tests. If no props are provided, they will be generated via [`react-fake-props`](https://github.com/typicode/react-fake-props).

## Install

[![yarn add --dev jest-snapshots (copy)](https://copyhaste.com/i?t=yarn%20add%20--dev%20jest-snapshots)](https://copyhaste.com/c?t=yarn%20add%20--dev%20jest-snapshots "yarn add --dev jest-snapshots (copy)") [![npm install --save-dev jest-snapshots (copy)](https://copyhaste.com/i?t=npm%20install%20--save-dev%20jest-snapshots)](https://copyhaste.com/c?t=npm%20install%20--save-dev%20jest-snapshots "npm install --save-dev jest-snapshots (copy)")

## Use

```js
import snapshots from 'jest-snapshots'
import TestComponent from './TestComponent'

snapshots(TestComponent, {
  'with none': {},
  'with one': { one: 'something' },
  'with two': { one: 'something', two: 'and more' }
})
```

Which, without `jest-snapshots`, would be effectively the same as writing tests manually as follows (but about half the noise; 11 vs. 5 lines, 401 vs. 220 characters):

```js
import React from 'react'
import { shallow } from 'enzyme'
import TestComponent from './TestComponent'

describe('TestComponent snapshots', () => {
  it('with none', () => {
    expect(shallow(<TestComponent />)).toMatchSnapshot()
  })
  it('with one', () => {
    expect(shallow(<TestComponent one="something" />)).toMatchSnapshot()
  })
  it('with two', () => {
    expect(shallow(<TestComponent one="something" two="and more" />)).toMatchSnapshot()
  })
})
```

Alternatively, you can pass an array of props sets, rather than provide names as keys (indexes will be used):

```js
import snapshots from 'jest-snapshots'
import TestComponent from './TestComponent'

snapshots(TestComponent, [
  {},
  { one: 'something' },
  { one: 'something', two: 'and more' }
])
```

Or you can pass just a component reference, which will result in a single snapshot using no props (equivalent to passing `[{}]`):

```js
snapshots(TestComponent)
```

To have `jest-snapshots` auto-generate props via `react-fake-props`, you must provide a file path to the component, rather than a class/function reference. There are two ways to achieve this. In either case, a `.js` suffix is assumed and added automatically if the path doesn't end in `.js`/`.jsx`/`.ts`/`.tsx`. You can pass an array including `__dirname` and it will be joined automatically.

```js
import snapshots from 'jest-snapshots'

snapshots([__dirname, 'TestComponent'])
```

Or you can pass an explicit path:

```js
import { join } from 'path'
import snapshots from 'jest-snapshots'

snapshots(join(__dirname, 'TestComponent'))
```

Finally, here are more examples with additional options:

```js
import snapshots from 'jest-snapshots'
import TestComponent from './TestComponent'

snapshots({
  component: TestComponent,
  mount: true, // Use enzyme's `mount` instead of `shallow`.
  props: {
    'with one': { one: 'something' },
    'with two': { one: 'something', two: 'and more' }
  }
})

snapshots({
  component: [__dirname, 'TestComponent'],
  // Pass options to `react-fake-props`, such as to generate optional props:
  fakePropsOptions: {
    optional: true
  }
})
```
