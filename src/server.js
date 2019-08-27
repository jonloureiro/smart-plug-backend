const { createServer, plugins } = require('restify');
const components = require('./components');

const server = createServer({ name: 'SmartPlug' });
server.use(plugins.bodyParser());
components(server);

exports.server = server;
