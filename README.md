[![Build Status](https://travis-ci.org/codymorrison/ms-conversion.svg?branch=master)](https://travis-ci.org/codymorrison/ms-conversion) [![Coverage Status](https://coveralls.io/repos/codymorrison/ms-conversion/badge.svg)](https://coveralls.io/r/codymorrison/ms-conversion)


# ms-time

Takes any millisecond output and allows you to output in a number of formats based on the length of time. Supports years, months, weeks, days, minutes, seconds and milliseconds.

## Installation

**NPM:**

```npm i ms-time --save```

## Usage

```js
var msTime = require('ms-time');

msTime(1337000000);
//=> '2w'

msTime(1337000000, { long: true );
//=> '2 weeks'

msTime(1337000000, { weeks: false );
//=> '15.5d'

msTime(1337000000, { long: true, weeks: false );
//=> '15.5 days'
```

## Options

### long

Type: ```Boolean```<br>
Default: ```false```

Outputs in short or long format (i.e. **d** or **days**)

### years

Type: ```Boolean```<br>
Default: ```true```

If the time is greater than 1 year, output in years. If false, fall back to months or next available option.

### months

Type: ```Boolean```<br>
Default: ```true```

If the time is greater than 1 month, output in months. If false, fall back to weeks or next available option.

### weeks

Type: ```Boolean```<br>
Default: ```true```

If the time is greater than 1 week, output in weeks. If false, fall back to days or next available option.

### days

Type: ```Boolean```<br>
Default: ```true```

If the time is greater than 1 day, output in days. If false, fall back to hours.

### milliseconds

Type: ```Boolean```<br>
Default: ```true```

If set to false and time is less than 1 second, this will output a time of 1 second.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Credits

Originally based on the exellent library [ms.js](https://github.com/rauchg/ms.js). Also relies on [ms-parse](https://github.com/sindresorhus/pretty-ms).

## License

MIT