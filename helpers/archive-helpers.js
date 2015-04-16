var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpReq = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, function(err,contents){
    if( err ) {
      callback(err, 404);
    } else {
      callback(contents.toString().split("\n"), 302);
    }
  });
};

exports.isUrlInList = function(url, callback){
  fs.readFile(exports.paths.list, function(err,contents){
    if( err ) {
      callback(err);
    } else {
      callback(contents.toString().indexOf() > -1);
    }
  });
};

exports.addUrlToList = function(url, callback){
  fs.appendFile(exports.paths.list, url + '\n', function(err){
    if(err) {
      callback(err, 404);
    } else {
      callback("Success", 302)
    }
  });
};

exports.isURLArchived = function(url, callback){
  fs.exists(exports.paths.archivedSites + "/" + url, function(existence) {
    callback(existence);
  });
};

exports.downloadUrls = function(){
  exports.readListOfUrls(function(data) {
    for (var i = 0; i < data.length-1; i++) {
      console.log("power rangers go " + data[i]);
      var filePath = exports.paths.archivedSites + "/" + data[i];
      console.log("outer FILE PATH FOR WRITING: ",filePath);
      httpReq.get(data[i], function(err, res) {
        if (err) {
          console.log("Bad news bears: " + err);
        } else {
          console.log("Inner FILE PATH FOR WRITING: ",filePath);
          fs.writeFile(filePath, res.buffer.toString(), function(err){
            if (err) {
              console.log("call ghost busters: " + err);
            }
          })
        }
      });
    }
  });
};
