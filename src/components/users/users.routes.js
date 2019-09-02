const userService = require('./users.service');

module.exports = server => {
  server.get('/users/me', async (req, res, next) => {
    const user = await userService.index(req.header('cookie'));
    res.send(user);
    next();
  });
};
