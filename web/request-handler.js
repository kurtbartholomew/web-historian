var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  if(req.method === 'POST') {

    helpers.serveAssets(res,path.basename(req.url),function(res,contents){
      res.end(contents);
    });
  }

  console.log("Attempting to " + req.method + " to " + req.url);
  helpers.serveAssets(res,path.basename(req.url),function(res,contents){
    res.end(contents);
  });

  //res.end(archive.paths.list);
};
