var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.sendResponse = function(response, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

exports.collectData = function(request, callback){
    var data = "";
    request.on('data',function(chunk){
      data += chunk;
    });

    request.on('end',function(){
      callback(data);
    });
};

// list of static files to be loaded from public folder
var publicFiles = {
  '/': 'index.html',
  '/styles.css': 'styles.css',
  '/loading.html': 'loading.html'
}

exports.serveAssets = function(res, asset, callback) {

  var filePath = asset;

  if(publicFiles[asset]) {
    // if the asset called for is in our public folder, serve it
    filePath = archive.paths.siteAssets +"/"+ publicFiles[asset];
  } else {
    // otherwise try to serve the archived site asked for
    filePath = archive.paths.archivedSites + asset;
  }

  // check if the file exists
  fs.exists(filePath, function(existence){
    if(existence){
      // if it does, read it and send back the contents to the request handler
      fs.readFile(filePath, function(err, contents){
        if( err ) {
          res.writeHead(500, headers);
          callback(res,err);
        } else {
          res.writeHead(200, headers);
          callback(res,contents);
        }
      });
    } else {
      // otherwise send back a 404 not found
      res.writeHead(404, headers);
      callback(res, "Not Found");
    }
  });
};
