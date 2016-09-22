const moment = require('moment')

moment.locale('en-short', {
  parentLocale: 'en',
  relativeTime: {
    future: 'in %s',
    past  : '%s ago',
    s     : 'just now',
    m     : '1 min',
    mm    : '%d mins',
    h     : '1 hr',
    hh    : '%d hrs',
    d     : '1 day',
    dd    : '%d days',
    M     : '1 mo',
    MM    : '%d mos',
    y     : '1 yr',
    yy    : '%d yrs',
  },
})

module.exports = moment
