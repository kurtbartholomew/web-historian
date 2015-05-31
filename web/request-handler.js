var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var queryParser = require('querystring');

exports.handleRequest = function (req, res) {

  if(req.method === 'GET'){
    // logs all get requests
    console.log("Attempting to " + req.method + " to " + req.url);
    // serves assets for get requests and sends back to user
    helpers.serveAssets(res,req.url,function(res,contents){
      res.end(contents);
    });
  } else if (req.method === 'POST'){
    // Collect info sent via collecting data from packets and sending it back
    helpers.collectData(req, function(data){
      // call the archive to check if the url being posted has been archived already
      archive.isURLArchived(queryParser.parse(data).url, function(archiveData){
        if (archiveData) {
          // if it exists, serve the stored page to the user
          helpers.serveAssets(res,req.url,function(res,contents){
            res.end(contents);
          });
        } else {
          // if it hasn't been stored, put the url in the list of sites to be archived
          archive.addUrlToList(queryParser.parse(data).url, function(message,status){
            // if the url was successfully added, send the user to a loading screen
            res.writeHead(status);
            helpers.serveAssets(res,"/loading.html",function(res,contents){
              res.writeHead(302);
              res.end(contents);
            });
          });
        }
      });
    });
  }
};
