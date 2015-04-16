// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var archive = require('../helpers/archive-helpers');
var CronJob = require('cron').CronJob;

module.exports = function() {
    var job = new CronJob({
    cronTime: '5 * * * * *',
    onTick: function() {
      archive.downloadUrls();
      console.log("CRON TIMEEEEEEE!");
    },
    start: true,
    timeZone: 'America/Los_Angeles'
  });
  job.start();
};

