[![Build Status](https://travis-ci.org/codymorrison/ms.js.svg?branch=master)](https://travis-ci.org/codymorrison/ms.js) [![Coverage Status](https://coveralls.io/repos/codymorrison/ms-conversion/badge.svg)](https://coveralls.io/r/codymorrison/ms-conversion)

# ms-conversion

Based on the exellent library [ms.js](https://github.com/rauchg/ms.js). This library handles parsing and converting times to and from milliseconds. This library includes a few updates to customize your output.

## Options

```
{
  long: true, // Changes time format to full words
  days: false, // If the time is in days it will fallback to hours (1 day becomes 24 hours)
  hours: false, // If the time is in hours, it will fallback to minutes (1 hour becomes 1440 minutes)
  minutes: false // If the time is in minutes, it will fallback to seconds (1 minute becomes 60 seconds)
}
```

## Examples


```js
ms('2 days')  // 172800000
ms('1d')      // 86400000
ms('10h')     // 36000000
ms('2.5 hrs') // 9000000
ms('2h')      // 7200000
ms('1m')      // 60000
ms('5s')      // 5000
ms('100')     // 100
```

```js
ms(60000)             // "1m"
ms(2 * 60000)         // "2m"
ms(ms('10 hours'))    // "10h"
```

```js
ms(60000, { long: true })					// "1 minute"
ms(60000, { long: true, minutes: false })	// "60 seconds"
ms(2 * 60000, { long: true })				// "2 minutes"
ms(ms('10 hours'), { long: true })			// "10 hours"
```

- Node/Browser compatible. Published as [`ms-conversion`](https://www.npmjs.org/package/ms-conversion) in [NPM](http://nodejs.org/download).
- If a number is supplied to `ms`, a string with a unit is returned.
- If a string that contains the number is supplied, it returns it as
a number (e.g: it returns `100` for `'100'`).
- If you pass a string with a number and a valid unit, the number of
equivalent ms is returned.

## License

MIT
