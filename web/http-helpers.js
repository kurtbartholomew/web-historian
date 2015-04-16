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

var publicFiles = {
  '/': 'index.html',
  '/styles.css': 'styles.css',
  '/loading.html': 'loading.html'
}

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)

  var filePath = asset;

  if(publicFiles[asset]) {
    filePath = archive.paths.siteAssets +"/"+ publicFiles[asset];
  } else {
      filePath = archive.paths.archivedSites + asset;
      //console.log("stranger danger ", filePath);
  }

  fs.exists(filePath, function(existence){
    if(existence){
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
      res.writeHead(404, headers);
      callback(res, "Not Found");
    }
  });
};
