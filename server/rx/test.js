    var sys = require("sys");
    var http = require('http')
    require('./rx_util');
//    var util = require('./rx_util')
    var a = function() {};
    sys.print(a.toObservable);
    sys.print(http.createServer)

    var serverData = http.createServer.bind(http).toObservable('request','response');
    serverData.Delay(2000).Subscribe(function(details)
    {
        details.response.writeHead(200, { 'Content-Type': 'text/html' });
        details.response.write("Hello World");
        details.response.end();
    });
    
//    var serverData = http.createServer();serverData.Delay(2000).Subscribe(function(details)
//    {
//        details.response.writeHead(200, { 'Content-Type': 'text/html' });
//        details.response.write("Hello World");
//        details.response.end();
//    });
    serverData.server.listen(8000);
    sys.puts('Server running at http://127.0.0.1:8000/');