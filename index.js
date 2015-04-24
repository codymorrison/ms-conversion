/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

var days = true;
var hours = true;
var minutes = true;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, opts) {
  opts = opts || {};

  console.log('this: ', this);

  // Handle parsing a time
  if (typeof val === 'string') return parse(val);

  // Set options
  typeof opts.days === 'boolean' ? days = opts.days : days = true;
  typeof opts.hours === 'boolean' ? hours = opts.hours : hours = true;
  typeof opts.minutes === 'boolean' ? minutes = opts.minutes : minutes = true;

  return opts.long ? long(val) : short(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = '' + str;
  if (str.length > 10000) return;

  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);

  if (!match) return;

  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();

  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function short(ms) {
  if (ms >= d && days) return Math.round(ms / d) + 'd';
  if (ms >= h && hours) return Math.round(ms / h) + 'h';
  if (ms >= m && minutes) return Math.round(ms / m) + 'm';
  if (ms >= s) return Math.round(ms / s) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function long(ms) {
  if (days && plural(ms, d, 'day')) {
    return plural(ms, d, 'day');
  }

  if (hours && plural(ms, h, 'hour')) {
    return plural(ms, h, 'hour');
  }

  if (minutes && plural(ms, m, 'minute')) {
    return plural(ms, m, 'minute');
  }

  if (plural(ms, s, 'second')) {
    return plural(ms, s, 'second');
  }

  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) return;

  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}
