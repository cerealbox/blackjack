var simple_pusher = require('./simple_pusher');

var sys = require('sys')

function debug(y) {
   for (x in y) {
      sys.print(x + ", ")
   }
}

//debug(simple_pusher)

var config = {
  appId:  '2694',
  key:    'e353af7c93d473330c25',
  secret: '27a3fae1764b0e8f0617'
};

var channel = "MY_CHANNEL";
var eventName = "purhcase";
var data = { is_this_working: "holly crap!?"};


//simple_pusher.trigger(config, channel, eventName, data);

// You can also pass in a callback as the 5th argument to get the request
simple_pusher.trigger(config, channel, eventName, data, function(request) {
  request.addListener('response', function(response) {
      sys.print("really done.")
  })
});


sys.print("done")

//http://api.pusherapp.com/apps/2694/channels/MY_CHANNEL/events
//POST\n/apps/2694/channels/MY_CHANNEL/events\nauth_key=278d425bdf160c739803&auth_timestamp=1272044395&auth_version=1.0&body_md5=7b3d404f5cde4a0b9b8fb4789a0098cb&name=foo"