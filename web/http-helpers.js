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
      callback(JSON.parse(data));
    });
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  //console.log("Attempting to serve " + asset);
  //console.log("Does asset exist?", asset === '');
  if( asset === '' ) { asset = '/index.html'; }

  var filePath = archive.paths.siteAssets + asset;
  //console.log("Filepath ",filePath);
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



// As you progress, keep thinking about what helper functions you can put here!
