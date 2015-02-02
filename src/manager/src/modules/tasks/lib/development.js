var gulp = require('gulp'),
livereload = require('gulp-livereload'),
del = require('del');

var logger = require(__dirname+'/../../log/lib/logger'),
    frontendBuild = require(__dirname+'/frontend/build'),
    frontendCompile = require(__dirname+'/frontend/compile'),
    loadTasks = require(__dirname+'/loadTasks');


var config = require(__dirname+'/../../../../../config');


var async = require('async'),
slug = require('slug');

process.on('message',function(data){
    console.log(data);
    logger.log('Starting ', 'development', ['yellow'], ' mode.');
    loadTasks(data);
    var first = true;
    gulp.start('watch', function() {
        if(first) {

            process.send({
                type: 'start_server_request'
            });
            first = false;
        }
    });
});

process.on('uncaughtException',function(err){
    console.log("retriever.js: " + err.message + "\n" + err.stack + "\n Stopping background timer");
});