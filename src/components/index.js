const tokens = require('./tokens');
const websockets = require('./websockets');

module.exports = server => {
  tokens(server);
  websockets(server);
};
