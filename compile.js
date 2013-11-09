// Generated by CoffeeScript 1.6.3
(function() {
  var compile, current_path, fs, next, path, spawn;

  spawn = require('child_process').spawn;

  fs = require("fs");

  path = require("path");

  next = function(err, files, current_path) {
    var file, file_path, _i, _len, _results;
    if (!err) {
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        if (file !== "node_modules") {
          file_path = current_path + file;
          _results.push(compile(file_path));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

  current_path = '.';

  fs.readdir(current_path, function(err, files) {
    return next(err, files, '');
  });

  compile = function(file) {
    return fs.lstat(file, function(err, stat) {
      var coffee, exec, ext;
      if (stat.isDirectory()) {
        return fs.readdir(file, function(err, files) {
          return next(err, files, file + '/');
        });
      } else if (stat.isFile()) {
        ext = file.slice(-7);
        if (ext === ".coffee") {
          exec = 'coffee';
          if (process.platform === "win32") {
            exec = "coffee.cmd";
          }
          coffee = spawn(exec, ["-c", file]);
          coffee.stderr.on('data', function(data) {
            return process.stderr.write(data.toString());
          });
          coffee.stdout.on('data', function(data) {
            return console.log(data.toString());
          });
          return coffee.on('error', function(data) {
            return console.trace(data.toString());
          });
        }
      }
    });
  };

}).call(this);