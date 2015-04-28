
/**
 * Dependencies.
 */

if ('undefined' != typeof require) {
  expect = require('expect.js');
  ms = require('../');
}

// numbers

describe('ms(number, { long: true })', function() {
  it('should support milliseconds', function() {
    expect(ms(500, { long: true })).to.be('500 milliseconds');
  });

  it('should support seconds', function() {
    expect(ms(1000, { long: true })).to.be('1 second');
    expect(ms(1200, { long: true })).to.be('1 second');
    expect(ms(10000, { long: true })).to.be('10 seconds');
  });

  it('should support minutes', function() {
    expect(ms(60 * 1000, { long: true })).to.be('1 minute');
    expect(ms(60 * 1200, { long: true })).to.be('1 minute');
    expect(ms(60 * 10000, { long: true })).to.be('10 minutes');
  });

  it('should support hours', function() {
    expect(ms(60 * 60 * 1000, { long: true })).to.be('1 hour');
    expect(ms(60 * 60 * 1200, { long: true })).to.be('1 hour');
    expect(ms(60 * 60 * 10000, { long: true })).to.be('10 hours');
  });

  it('should support days', function() {
    expect(ms(24 * 60 * 60 * 1000, { long: true })).to.be('1 day');
    expect(ms(24 * 60 * 60 * 1200, { long: true })).to.be('1 day');
    expect(ms(24 * 60 * 60 * 10000, { long: true, weeks: false })).to.be('10 days');
  });

  it('should support weeks', function() {
    expect(ms((24 * 60 * 60 * 1000) * 7, { long: true })).to.be('1 week');
    expect(ms((24 * 60 * 60 * 1000) * 11, { long: true })).to.be('1.5 weeks');
    expect(ms((24 * 60 * 60 * 1000) * 35, { long: true, months: false})).to.be('5 weeks');
  });

  it('should support months', function() {
    expect(ms(24 * 60 * 60 * 1000 * 30, { long: true })).to.be('1 month');
    expect(ms(24 * 60 * 60 * 1000 * 45 , { long: true })).to.be('1.5 months');
    expect(ms(24 * 60 * 60 * 1000 * 30 * 14, { long: true, years: false })).to.be('14 months');
  });

  it('should support years', function() {
    expect(ms(24 * 60 * 60 * 1000 * 365, { long: true })).to.be('1 year');
    expect(ms(24 * 60 * 60 * 1000 * 520, { long: true })).to.be('1.5 years');
    expect(ms(24 * 60 * 60 * 1000 * 900, { long: true })).to.be('2.5 years');
  });

  it('should allow you to change the minuteFormat', function() {
    expect(ms(1000 * 60, { minuteFormat: ['min', 'max'] })).to.be('1min');
  });

  it('should default to 1 minute if < 1 minute and seconds are disabled', function() {
    expect(ms(30000, { seconds: false})).to.be('1m');
  });

  it('should default to 1 second if < 1 second and milliseconds are disabled', function() {
    expect(ms(500, { milliseconds: false})).to.be('1s');
  });

  it('should be able to set pluralization', function() {
    expect(ms(60 * 1000 * 47.5, { long: true, pluralize: false })).to.be('47.5 minute');
    expect(ms(60 * 1000 * 47.5, { long: true, pluralize: true })).to.be('47.5 minutes');
  });

  it('should round', function() {
    expect(ms(234234234, { long: true })).to.be('2.5 days');
  });
});

// numbers

describe('ms(number)', function() {
  it('should support milliseconds', function() {
    expect(ms(500)).to.be('500ms');
  });

  it('should support seconds', function() {
    expect(ms(1000)).to.be('1s');
    expect(ms(10000)).to.be('10s');
  });

  it('should support minutes', function() {
    expect(ms(60 * 1000)).to.be('1m');
    expect(ms(60 * 10000)).to.be('10m');
  });

  it('should support hours', function() {
    expect(ms(60 * 60 * 1000)).to.be('1h');
    expect(ms(60 * 60 * 10000)).to.be('10h');
  });

  it('should support days', function() {
    expect(ms(24 * 60 * 60 * 1000, { long: true })).to.be('1 day');
    expect(ms(24 * 60 * 60 * 1200, { long: true })).to.be('1 day');
    expect(ms(24 * 60 * 60 * 10000, { long: true, weeks: false })).to.be('10 days');
  });

  it('should support weeks', function() {
    expect(ms((24 * 60 * 60 * 1000) * 7, { long: true })).to.be('1 week');
    expect(ms((24 * 60 * 60 * 1000) * 11, { long: true })).to.be('1.5 weeks');
    expect(ms((24 * 60 * 60 * 1000) * 35, { long: true, months: false})).to.be('5 weeks');
  });

  it('should support months', function() {
    expect(ms(24 * 60 * 60 * 1000 * 30, { long: true })).to.be('1 month');
    expect(ms(24 * 60 * 60 * 1000 * 45 , { long: true })).to.be('1.5 months');
    expect(ms(24 * 60 * 60 * 1000 * 30 * 14, { long: true, years: false })).to.be('14 months');
  });

  it('should support years', function() {
    expect(ms(24 * 60 * 60 * 1000 * 365, { long: true })).to.be('1 year');
    expect(ms(24 * 60 * 60 * 1000 * 520, { long: true })).to.be('1.5 years');
    expect(ms(24 * 60 * 60 * 1000 * 900, { long: true })).to.be('2.5 years');
  });

  it('should allow you to change the minuteFormat', function() {
    expect(ms(1000 * 60, { long: true, minuteFormat: ['min', 'max'] })).to.be('1 max');
  });

  it('should default to 1 minute if < 1 minute and seconds are disabled', function() {
    expect(ms(30000, { long: true, seconds: false })).to.be('1 minute');
  });

  it('should default to 1 second if < 1 second and milliseconds are disabled', function() {
    expect(ms(500, { long: true, milliseconds: false })).to.be('1 second');
  });

  it('should round', function() {
    expect(ms(234234234)).to.be('2.5d');
  });
});
