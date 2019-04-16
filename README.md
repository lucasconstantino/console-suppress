# Console Suppress

[![Greenkeeper badge](https://badges.greenkeeper.io/lucasconstantino/console-suppress.svg)](https://greenkeeper.io/)

Augments console methods with message suppressing capabilities. Very useful during testing.

![Build status](https://travis-ci.org/lucasconstantino/console-suppress.svg?branch=master)

## Installation

This package is available on [npm](https://www.npmjs.com/package/console-suppress) as: *console-suppress*

```
npm install --dev console-suppress
```

## Basic usage

```js
import console from 'console-suppress'

console.log.suppress(/undesired/)
console.log('some undesired log') // not logged to the console.
```

## API

At the context of this documentation, *suppressor* means either a RegExp instance, a string (which will eventually be converted to a regex for comparison) or an array of the previous two.

**Adding suppressors:**

| Method | Arguments | Description |
| ------ | --------- | ----------- |
| console.suppress | *suppressor* | Registers a suppressor for all method calls.
| console.log.suppress | *suppressor* | Registers a suppressor for `console.log` calls.
| console.info.suppress | *suppressor* | Registers a suppressor for `console.info` calls.
| console.warn.suppress | *suppressor* | Registers a suppressor for `console.warn` calls.
| console.error.suppress | *suppressor* | Registers a suppressor for `console.error` calls.

**Removing suppressors:**

| Method | Arguments | Description |
| ------ | --------- | ----------- |
| console.cleanSuppressor | *suppressor* | Removes the given suppressor for any logging method calls.
| console.log.cleanSuppressor | *suppressor* | Removes the given suppressor for `console.log` calls.
| console.info.cleanSuppressor | *suppressor* | Removes the given suppressor for `console.info` calls.
| console.warn.cleanSuppressor | *suppressor* | Removes the given suppressor for `console.warn` calls.
| console.error.cleanSuppressor | *suppressor* | Removes the given suppressor for `console.error` calls.
| console.cleanSuppressors | [*suppressor*] | Removes given suppressors (or all, if none provided) any logging method calls.
| console.log.cleanSuppressors | [*suppressor*] | Removes given suppressors (or all, if none provided) for `console.log` calls.
| console.info.cleanSuppressors | [*suppressor*] | Removes given suppressors (or all, if none provided) for `console.info` calls.
| console.warn.cleanSuppressors | [*suppressor*] | Removes given suppressors (or all, if none provided) for `console.warn` calls.
| console.error.cleanSuppressors | [*suppressor*] | Removes given suppressors (or all, if none provided) for `console.error` calls.
