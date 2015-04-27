var parseMs = require('parse-ms');

/**
 * MS Time Helpers.
 */
var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Config
 */
var config = {
  long: false,
  days: true,
  hours: true,
  minutes: true
};

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

  // Set options
  config.days = typeof opts.days === 'boolean' ? opts.days : true;
  config.hours = typeof opts.hours === 'boolean' ? opts.hours : true;
  config.minutes = typeof opts.minutes === 'boolean' ? opts.minutes : true;

  config.long = opts.long ? true : false;

  return config.long ? long(val) : short(val);
};

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function short(ms) {
  if (ms >= d && config.days) return Math.round(ms / d) + 'd';
  if (ms >= h && config.hours) return Math.round(ms / h) + 'h';
  if (ms >= m && config.minutes) return Math.round(ms / m) + 'm';
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
  if (config.days && plural(ms, d, 'day')) {
    return plural(ms, d, 'day');
  }

  if (config.hours && plural(ms, h, 'hour')) {
    return plural(ms, h, 'hour');
  }

  if (config.minutes && plural(ms, m, 'minute')) {
    return plural(ms, m, 'minute');
  }

  if (plural(ms, s, 'second')) {
    return plural(ms, s, 'second');
  }

  return ms + ' ms';
}

/**
 * Pluralization helper.
 *
 * @param {Number} ms The time to convert in ms
 * @param {Number} n The time to check against in ms (year, day, hour, etc)
 * @param {String} name The name to use for the type in singular form (day, minute)
 * @return {String}
 * @api private
 */
function plural(ms, n, name) {
  // If the time doesn't add up to the specific time variant return
  if (ms < n) return;

  // If there is less than 1.5 of the time type keep the singular form and
  // round down
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;

  // Provide high estimate and return plural version
  return round(ms, n) + ' ' + name + 's';
}

/**
 * Rounding helper.
 *
 * @param {Number} ms The time to convert in ms
 * @param {String} n The time to check against in ms (year, day, hour, etc)
 * @return {String}
 * @api private
 */
function round(ms, n) {
  var msParsed;

  msParsed = parseMs(ms);

  // TODO: Expand this to other types beyond hours
  if (n === h) {
    // Add any days to hours
    if (msParsed.days > 0) {
      msParsed.hours = msParsed.hours + (msParsed.days * 24);
    }

    // Round up to nearest hour after 45 minutes
    if (msParsed.minutes > 45) {
      return msParsed.hours + 1;
    }

    // Round to .5 between 15 and 45 minutes
    if (msParsed.minutes <= 45 && msParsed.minutes >= 15) {
      return msParsed.hours+'.5';
    }

    // Round down otherwise
    if (msParsed.minutes < 15) {
      return msParsed.hours;
    }
  }

  return Math.ceil(ms / n);
}
