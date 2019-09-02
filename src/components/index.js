const tokens = require('./tokens');
const users = require('./users');
const websockets = require('./websockets');

module.exports = server => {
  tokens(server);
  users(server);
  websockets(server);
};
