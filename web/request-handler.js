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
    // NEED TO HANDLE FORM DATA INSTEAD OF URL
    helpers.collectData(req, function(data){
      //console.log("FOUND "+ queryParser.parse(data).url);
      archive.isURLArchived(queryParser.parse(data).url, function(archiveData){
        if (archiveData) {
          //console.log("ARCHIVED: RETRIEVING", req.url);
          helpers.serveAssets(res,req.url,function(res,contents){
            res.end(contents);
          });
        } else {
          //console.log("NOT ARCHIVED: ADDING "+ queryParser.parse(data).url +" TO ARCHIVE");
          archive.addUrlToList(queryParser.parse(data).url, function(message,status){
            res.writeHead(status);
            //downloadSite(function(){});
            //archive.downloadUrls(queryParser.parse(data).url);
            //console.log("ADDED TO LIST: NOW SERVING LOADING.HTML");
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
