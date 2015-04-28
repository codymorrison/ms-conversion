var parseMs = require('parse-ms');

/**
 * Config
 */
var config = {
  long: false,
  pluralize: true,
  days: true,
  weeks: true,
  months: true,
  years: true,
  seconds: true,
  milliseconds: true,
  yearFormat: ['yr', 'year'],
  monthFormat: ['mo', 'month'],
  weekFormat: ['w', 'week'],
  hourFormat: ['h', 'hour'],
  dayFormat: ['d', 'day'],
  minuteFormat: ['m', 'minute'],
  secondFormat: ['s', 'second'],
  millisecondFormat: ['ms', 'millisecond']
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

  config.long = opts.long ? true : false;
  config.pluralize = opts.pluralize === false ? false : true;
  config.years = opts.years === false ? false : true;
  config.months = opts.months === false ? false : true;
  config.weeks = opts.weeks === false ? false : true;
  config.days = opts.days === false ? false : true;
  config.seconds = opts.seconds === false ? false : true;
  config.milliseconds = opts.milliseconds === false ? false : true;
  config.minuteFormat = opts.minuteFormat ? opts.minuteFormat : ['m', 'minute'];

  return formatMs(val);
};

/**
 * Format helper.
 *
 * @param {Number} ms The time to convert in ms
 * @return {String}
 * @api private
 */
function formatMs(ms) {
  var msParsed = parseMs(ms);

  msParsed = addParseMsData(msParsed);

  // year format
  if (msParsed.years > 0 && config.years) return addFormat(msParsed.years, config.yearFormat);

  // month format
  if (msParsed.months > 0 && config.months) return addFormat(msParsed.months, config.monthFormat);

  // week format
  if (msParsed.weeks > 0 && config.weeks) return addFormat(msParsed.weeks, config.weekFormat);

  // day format
  if (msParsed.days > 0 && config.days) return addFormat(msParsed.days, config.dayFormat);

  // hour format
  if (msParsed.hours > 0) return addFormat(msParsed.hours, config.hourFormat);

  // minute format
  if (msParsed.minutes > 0) return addFormat(msParsed.minutes, config.minuteFormat);

  // second format
  if (msParsed.seconds > 0) {
    if (!config.seconds) return (addFormat(1, config.minuteFormat));

    return addFormat(msParsed.seconds, config.secondFormat);
  }

  // ms format
  if (msParsed.milliseconds > 0) {
    if (!config.milliseconds) return addFormat(1, config.secondFormat);

    return addFormat(msParsed.milliseconds, config.millisecondFormat);
  }

  return 0;
}


/**
 * Add Format
 *
 * @param {Float} time The finalized time
 * @param {Array} format The format to use for short/long
 * @return {String}
 * @api private
 */
function addFormat(time, format) {
  var usePlural = '';
  var formatType = config.long ? 1 : 0;
  var space = config.long ? ' ' : '';

  if (time > 1 && config.long && config.pluralize) usePlural = 's';

  return time + space + format[formatType] + usePlural;
}


/**
 * Round helper
 *
 * Takes a value and divides it by a number returning the
 * value in .5 increments.
 *
 * @param {Number} dividend The time to divide from
 * @param {Number} divisor The number to divide by
 * @param {Number} +/-
 * @return {Float} The rounded dividend (0, 0.5, 1) from current number
 * @api private
 */
function roundHelper(dividend, divisor, scale) {
  scale = scale || 0.1;

  // The Number of times the dividend goes into the divisor
  var integer = Math.floor(dividend / divisor);

  // This gets the decimal point and collects the first 2 numbers (0.0 - 1.0)
  var fraction = (dividend / divisor) % 1;

  // If fraction is greater than scale return ceiling of integer
  if (fraction >= (0.5 + scale)) {
    return integer++;
  }

  // If fraction is less than scale return floor of integer
  if (fraction <= (0.5 - scale)) {
    return integer;
  }

  // Otherwise we're within scale and can apply 0.5
  return integer + 0.5;
}


/**
 * Round Days
 *
 * Round days using hours and day data
 *
 * @param {Number} days The number of days
 * @param {Number} hours The number of hours
 * @param {Number} scale
 * @return {Float} The day amount in 0.5 increments based on scale
 * @api private
 */
function roundDays(days, hours, scale) {
  scale = scale || 6;
  var median = 12;

  if (hours >= (median + scale)) {
    return days++;
  }

  if (hours <= (median - scale)) {
    return days;
  }

  return days + 0.5;
}


/**
 * Round Hours
 *
 * Round hours using minutes and hour data
 *
 * @param {Number} hours The time of hours
 * @param {Number} minutes The number of minutes
 * @param {Number} scale
 * @return {Float} The hour amount in 0.5 increments based on scale
 * @api private
 */
function roundHours(hours, minutes, scale) {
  scale = scale || 15;
  var median = 30;

  if (minutes >= (median + scale)) {
    return hours++;
  }

  if (minutes <= (median - scale)) {
    return hours;
  }

  return hours + 0.5;
}


/**
 * Round Minutes
 *
 * Round minutes using minute and seconds data
 *
 * @param {Number} minutes The time of seconds
 * @param {Number} seconds The number of minutes
 * @param {Number} scale
 * @return {Float} The minute amount in 0.5 increments based on scale
 * @api private
 */
function roundMinutes(minutes, seconds, scale) {
  scale = scale || 15;
  var median = 30;

  if (seconds >= (median + scale)) {
    return minutes++;
  }

  if (seconds <= (median - scale)) {
    return minutes;
  }

  return minutes + 0.5;
}


/**
 * addParseMsData
 *
 * Adds additional values when days are greater than 7
 *
 * @param {Object} msData The parse-ms data
 * @return {Object} The data including years/months/days
 * @api private
 */
function addParseMsData(msData) {
  var actualHours = (msData.days * 24) + msData.hours;
  var actualMinutes = (actualHours * 60) + msData.minutes;

  msData.years = 0;
  msData.months = 0;
  msData.weeks = 0;

  // Calculate Years
  if (msData.days >= 365) msData.years = roundHelper(msData.days, 365, null);

  // Calculate Months
  if (msData.days >= 30) msData.months = roundHelper(msData.days, 30, null);

  // Calculate Weeks
  if (msData.days >= 7) msData.weeks = roundHelper(msData.days, 7, null);

  if (msData.days > 0) msData.days = roundDays(msData.days, msData.hours, 6);
  if (msData.hours > 0) msData.hours = roundHours(actualHours, msData.minutes, 15);
  if (msData.minutes > 0) msData.minutes = roundMinutes(actualMinutes, msData.seconds, 15);

  return msData;
}
