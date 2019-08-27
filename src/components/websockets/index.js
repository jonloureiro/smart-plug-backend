const websockets = require('./websockets.server');

module.exports = server => {
  websockets(server);
};
