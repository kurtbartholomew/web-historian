var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  console.log("Attempting to " + req.method + " to " + req.url);
  helpers.serveAssets(res,path.basename(req.url),function(res,contents){
    res.end(contents);
  });

  //res.end(archive.paths.list);
};
