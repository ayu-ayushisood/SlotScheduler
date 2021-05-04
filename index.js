const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const cron = require('node-cron');



const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
});