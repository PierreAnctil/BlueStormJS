var argv = require('yargs')
    .usage('NodeFramework command tool.\n\nUsage: $0 [command] [options]')
    .example('$0 dev', 'Load development environment.')
    .example('$0 dev --help', 'Show help for development environment.')
    .example('$0 dev -d', 'Load debug mode for development environment.')
    .example('$0 prod', 'Load production environnement.')
    .check(function(command) {
        command = command._[0];
        if(commands.indexOf(command)==-1) throw new Error('Command '+command+' not available !');
    })
    .demand(1)
    .alias('d', 'debug')
    .describe('d', 'Set output logging.')
    .alias('h', 'help')
    .describe('h', 'See help for a particular command.');

var commands = ['dev', 'prod'];

var tasks = require(__dirname+'/tasks');

module.exports = {
    command: function(commands) {
        var command = commands._[0];
        switch(command) {
            case "dev":
                tasks.loadEnvironment({env: 'development'});
                break;
            case "prod":
                tasks.loadEnvironment({env: 'production'});
                break;
        }
    },
    argv: function() {
        return argv.argv;
    }
};