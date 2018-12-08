# jest-in-case

> [Jest](https://facebook.github.io/jest/) utility for creating variations of
> the same test

## Example

```js
import { add, subtract } from './math';
import cases from 'jest-in-case';

cases('add(augend, addend)', opts => {
  expect(add(opts.augend, opts.addend)).toBe(opts.total);
}, [
  { name: '1 + 1 = 2', augend: 1, addend: 1, total: 2 },
  { name: '2 + 1 = 3', augend: 2, addend: 1, total: 3 },
  { name: '3 + 1 = 4', augend: 3, addend: 1, total: 4 },
]);
```

## Installation

```sh
yarn add --dev jest-in-case
```

## Usage

In your [Jest](https://facebook.github.io/jest/) tests, import `cases` from
`jest-in-case`.

```js
import cases from 'jest-in-case';
// or
const cases = require('jest-in-case');
```

Then you can call `cases` with a `title`, a `tester`, and some `testCases`.

```js
cases(title, tester, testCases);
```

`testCases` can either be an array of objects with a `name` property:

```js
cases('add(augend, addend)', opts => {
  expect(add(opts.augend, opts.addend)).toBe(opts.total);
}, [
  { name: '1 + 1 = 2', augend: 1, addend: 1, total: 2 },
  { name: '2 + 1 = 3', augend: 2, addend: 1, total: 3 },
  { name: '3 + 1 = 4', augend: 3, addend: 1, total: 4 },
]);
```

Or an object of objects with the names as the keys:

```js
cases('subtract(minuend, subtrahend)', opts => {
  expect(subtract(opts.minuend, opts.subtrahend)).toBe(opts.difference);
}, {
  '1 - 1 = 0': { minuend: 1, subtrahend: 1, difference: 0 },
  '2 - 1 = 1': { minuend: 2, subtrahend: 1, difference: 1 },
  '3 - 1 = 2': { minuend: 3, subtrahend: 1, difference: 2 },
});
```

Inside of a test case you can put whatever properties you want, except for
`name`, `only`, or `skip`:

```js
cases('title', fn, [
  { name: 'reserved 1', only: true, skip: true, whatever: 'you', want: 'here' },
  { name: 'reserved 2', only: true, skip: true, whatever: 'you', want: 'here' },
  { name: 'reserved 3', only: true, skip: true, whatever: 'you', want: 'here' },
]);
```

- `name` is passed to `test(name, fn)` to become the name of your test
- When `only` is set to `true` it will use Jest's `test.only` function
- When `skip` is set to `true` it will use Jest's `test.skip` function

The `tester` function is called on each test case with your options:

```js
cases('title', opts => {
  console.log('passed: ', opts);
}, {
  'test 1': { foo: 1 },
  'test 2': { bar: 2 },
  'test 3': { baz: 3 },
});

// passed: { foo: 1 }
// passed: { bar: 2 }
// passed: { baz: 3 }
```

Your tester function works just like functions passed to Jest's `test` function
do (Just with a prepended argument):

```js
cases('async functions', async opts => {
  let result = await somethingAsync(opts.input);
  expect(result).toEqual(opts.result);
}, {
  'test 1': { ... },
  'test 2': { ... },
});

cases('done callback', (opts, done) => {
  somethingAsync(opts.input, result => {
    expect(result).toEqual(result);
    done();
  });
}, {
  'test 1': { ... },
  'test 2': { ... },
});
```
