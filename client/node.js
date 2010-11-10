var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Dave\n');
}).listen(666, "200.200.200.5");

console.log('Server running at http://127.0.0.1:666/');

