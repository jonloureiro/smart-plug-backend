const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config');

const verifyClient = ({ req: { headers } }) => {
  if (headers['sec-websocket-protocol'] !== 'jonloureiro.dev') return false;
  try {
    if (headers.authorization !== undefined) {
      const data = headers.authorization.split(' ')[1];
      const buff = Buffer.from(data, 'base64');
      const [user, password] = buff.toString('ascii').split(':');
      if (!(user === 'esp32_123' && password === 'demo123')) return false;
    } else {
      const token = headers.cookie.split('=')[1];
      jwt.verify(token, secret);
    }
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = server => {
  const ws = new WebSocket.Server({
    server: server.server,
    verifyClient,
    path: '/socket',
    clientTracking: true,
    maxPayload: 16,
  });

  ws.on('connection', socket => {
    socket.isAlive = true;

    socket.on('message', message => {
      console.log(message);
      ws.clients.forEach(function each (client) {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    socket.on('error', err => {
      console.log(err);
    });

    socket.on('close', () => {
      console.log('disconnected');
    });

    socket.on('pong', () => {
      socket.isAlive = true;
    });

    setInterval(() => {
      if (!socket.isAlive) return socket.terminate();
      socket.isAlive = false;
      return socket.ping();
    }, 5000);
  });
};
