const { UnauthorizedError } = require('restify-errors');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config');

const userService = {
  index: async function (cookie) {
    try {
      const token = cookie.split('=')[1].split(';')[0];
      const decoded = jwt.verify(token, secret);
      return decoded;
    } catch (err) {
      return new UnauthorizedError('Acesso negado');
    }
  },
};

module.exports = userService;
