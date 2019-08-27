const { createServer } = require('restify');

const server = createServer({ name: 'SmartPlug' });

exports.server = server;
