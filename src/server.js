const { createServer, plugins } = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const components = require('./components');

const cors = corsMiddleware({
  origins: ['*'],
});

const server = createServer({ name: 'SmartPlug' });
server.pre(cors.preflight);
server.use(cors.actual);
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
server.use(plugins.bodyParser());

components(server);

exports.server = server;
