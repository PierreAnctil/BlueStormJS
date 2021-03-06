var clc = require('cli-color'),
    moment = require('moment');

var gutil = require('gulp-util');


module.exports = {
    error: function(error, from, params) {
        console.error(clc.red.bold.underline.inverse('From '+from));
        if(params!==undefined&&!params.stack) {
            console.error(clc.red(error));
        } else {
            console.error(clc.red(error.stack));
        }


    },
    warn: function() {
        console.warn(clc.yellow("[WARNING] ")+this.getMessage(arguments));
    },
    getStyledMessage: function(message, styles) {
        var style = clc;
        for(var i in styles) {
            if(gutil.colors[styles[i]])
                style = style[styles[i]];
        }

        return style(message);
    },
    getMessage: function(arguments) {
        var res = "",
            unstyled = "";

        for(var i=0; i<arguments.length; i++) {
            var arg = arguments[i];

            if(typeof arg=='string' || typeof arg=='number') {
                var styles=[];
                //if next argument indicates style
                var nextArg = arguments[i+1];
                if(typeof nextArg=='object') {
                    styles= nextArg;
                    i++;
                }
                res+= this.getStyledMessage(arg, styles);
                unstyled += arg;
            }
        }
        return res;

    },
    log: function() {//message, params
        console.log(this.getMessage(arguments));

        var message = this.getMessage(arguments);
        //this.addLog(message);
        
    }
}