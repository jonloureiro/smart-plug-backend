const tokenService = require('./tokens.service');

module.exports = server => {
  server.post('/tokens', async (req, res, next) => {
    const { username, password } = req.body || { username: '', password: '' };
    const token = await tokenService.create(username, password);
    if (typeof token === 'string') {
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/`);
      res.send();
    } else {
      res.send(token);
    }
    next();
  });

  server.del('/tokens', async (req, res, next) => {
    res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/');
    res.send();
    next();
  });
};
