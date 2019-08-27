const { BadRequestError } = require('restify-errors');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../../config');

const tokenService = {
  create: async function (username, password) {
    console.log(username, password);

    if (!(username === 'jonathan' && password === 'demo123')) {
      return new BadRequestError('Usuário e senha inválidos');
    }
    return jwt.sign({ username }, secret, { expiresIn });
  },
};

module.exports = tokenService;
