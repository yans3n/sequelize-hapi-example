var Hapi = require('hapi');
var models = require('./models');

var routes = require('./routes');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});

server.views({
    engines: {
        html: require('swig')
    },
    relativeTo: __dirname,
    path: './views'
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public'
        }
    }
});

for (var route in routes) {
    server.route(routes[route]);
}

// Start the server
models.sequelize.sync().then(function() {
    server.start(function () {
        console.log("Hapi server started @", server.info.uri);
    });
});

