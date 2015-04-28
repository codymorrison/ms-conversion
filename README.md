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

Outputs in short or long format (i.e. **d** or **days**).

### pluralize

Type: ```Boolean```<br>
Default: ```true```

Setting to false does not pluralize the time, useful for custom formats.

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

### seconds

Type: ```Boolean```<br>
Default: ```true```

If set to false and time is less than 1 minute, this will output a time of 1 minute.

### milliseconds

Type: ```Boolean```<br>
Default: ```true```

If set to false and time is less than 1 second, this will output a time of 1 second.

### yearFormat

Type: ```Array```<br>
Default: ```['y', 'year']```

Customize the output of years, first value is the short value, the second is the long. Neither should be plural.

### monthFormat

Type: ```Array```<br>
Default: ```['mo', 'month']```

Customize the output of months, first value is the short value, the second is the long. Neither should be plural.

### weekFormat

Type: ```Array```<br>
Default: ```['w', 'week']```

Customize the output of weeks, first value is the short value, the second is the long. Neither should be plural.

### dayFormat

Type: ```Array```<br>
Default: ```['d', 'day']```

Customize the output of days, first value is the short value, the second is the long. Neither should be plural.

### hourFormat

Type: ```Array```<br>
Default: ```['h', 'hour']```

Customize the output of hours, first value is the short value, the second is the long. Neither should be plural.

### minuteFormat

Type: ```Array```<br>
Default: ```['m', 'minute']```

Customize the output of minutes, first value is the short value, the second is the long. Neither should be plural.

### secondFormat

Type: ```Array```<br>
Default: ```['s', 'second']```

Customize the output of seconds, first value is the short value, the second is the long. Neither should be plural.

### millisecondFormat

Type: ```Array```<br>
Default: ```['ms', 'millisecond']```

Customize the output of milliseconds, first value is the short value, the second is the long. Neither should be plural.

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
