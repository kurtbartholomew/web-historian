var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var queryParser = require('querystring');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  if(req.method === 'GET'){
    console.log("Attempting to " + req.method + " to " + req.url);
    helpers.serveAssets(res,req.url,function(res,contents){
      res.end(contents);
    });
  } else if (req.method === 'POST'){
    helpers.collectData(req, function(data){
        archive.addUrlToList(queryParser.parse(data).url, function(message,status){
          res.writeHead(status);
          res.end(message);
        });
    });
  }
};
