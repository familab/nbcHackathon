var http = require('http');

var app = http.createServer(function(req, res) {
  if(req.method === "POST") {
    var body = "";
    req.on('data', function (chunk) {
      body += chunk;
    });
    req.on('end', function () {
      io.emit('pixmob', body);
      console.log(body);
      res.writeHead(204);
      res.end();
    });
  }
});

var io = require('socket.io')(app);

app.listen(8000);
