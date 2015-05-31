var archive = require('../helpers/archive-helpers');
var CronJob = require('cron').CronJob;

// sets a cron job to archive all files 
// in archive list every 5 minutes
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

