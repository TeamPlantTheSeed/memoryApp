require('./env');

module.exports = {
  //depending on where deployed, these could change.
  "interval": process.env.POLLING_INTERVAL || 10,
  "reminders": {
      'first': process.env.REMINDER_FIRST || 10,
      'second': process.env.REMINDER_SECOND || 30,
      'recurrent': process.env.REMINDER_RECURRENT || 60,
  }
}
