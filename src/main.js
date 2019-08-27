const { server } = require('./server');
const { port } = require('./config');

try {
  server.listen(port, () => console.log(`${server.name} on ${server.url}`));
} catch (error) {
  console.error(error);
}
