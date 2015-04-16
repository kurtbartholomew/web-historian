var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  // if(req.method === 'POST') {

  //   helpers.serveAssets(res,path.basename(req.url),function(res,contents){
  //     res.end(contents);
  //   });
  // }
  if(req.method === 'GET'){
    console.log("Attempting to " + req.method + " to " + req.url);
    helpers.serveAssets(res,req.url,function(res,contents){
      res.end(contents);
    });
  } else if (req.method === 'POST'){
    helpers.collectData(req, function(data){
      //console.log(data);
      archive.addUrlToList(data.url.toString());
    })
  }


  //res.end(archive.paths.list);
};
