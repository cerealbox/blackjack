var app = require('express').createServer();

app.get('/', function(req, res){
    res.send('hello dave');
});

app.listen(666);