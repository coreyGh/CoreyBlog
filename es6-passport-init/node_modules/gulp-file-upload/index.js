var through = require('through2');
var gutil = require('gulp-util');
var request = require('request');
var path = require('path');
var fs = require('fs');

var PluginError = gutil.PluginError;
var green = gutil.colors.green;

const PLUGIN_NAME = "gulp-file-upload";

function fileUpload(options) {

    var options = options;
    if (!options.destDir)
        options.destDir = 'dest';

    return through.obj(function (file, env, cb) {
        var file_path = file.path;
        var proj_name = options.proj_name;
        var domain = options.domain;

        var regexp = new RegExp("[\\s\\S]*" + options.destDir + "[\\/]?");
        var rel_path = path.dirname(file_path.replace(/\\+/g, '\/')).replace(regexp, '') + '/';

        var destPath = options.to + proj_name + '/' + rel_path;

        gutil.log(green(domain + options.to.replace('/data/wapstatic/', '') + proj_name + '/' + rel_path + path.basename(file_path)));

        request.post({
            url: options.url,
            formData: {
                to: destPath,
                file: fs.createReadStream(file_path)
            }
        }, function (err, resp, body) {
            if (err) {
                throw new PluginError(PLUGIN_NAME, "upload file fail: ", err);
            }
            gutil.log(green("from => ", file.path, ", to => ", destPath, ", SUCCESS!"));
            cb(null);
        });
    });
}

module.exports = fileUpload;