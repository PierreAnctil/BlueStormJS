
var gulp = require('gulp'),
livereload = require('gulp-livereload'),
del = require('del'),
async = require('async'),
slug = require('slug');

var gulpLogger = require(__dirname+'/../gulp-logger'),
frontendBuild = require(__dirname+'/../frontend/build'),
frontendCompile = require(__dirname+'/../frontend/compile');


var config = require(__dirname+'/../../config');


var frontendApps = config().frontend.list();




module.exports = function(data) {

    gulpLogger.gulp(gulp, data.debug);
    var apps = frontendApps;

    var builds = [],
    compiles = [];

    apps.forEach(function(app) {
        frontendBuild(app);
        frontendCompile(app);
        builds.push('build@'+app);
        compiles.push('compile@'+app);
    });
    console.log(builds);

    gulp.task('watch', builds, function() {
        var options = {};
        if(!data.debug) options.silent = true;
        livereload.listen(options);
        var w = gulp.watch('dist/build/**/*', function(file) {
            livereload.changed(file.path);
        });

        process.on('SIGHUP', function(msg) {
            if(w) {
                w.end();
            }
        });
    });
};