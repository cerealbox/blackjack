var Db = require('mongodb').Db
Connection = require('mongodb').Connection
Server = require('mongodb').Server
// BSON = require('../lib/mongodb').BSONPure;
BSON = require('mongodb').BSONNative

var sys = require('sys')

//sys.print(Db)
//for (x in Db) {
//   sys.print(x)
//}



var client = new Db('blackjack', new Server("flame.mongohq.com", 27029, {auto_reconnect: true}));
//sys.print(client)
function debug(y) {
   for (x in y) {
      sys.print(x + ", ")
   }
}

//sys.print(client.authenticate)
sys.print("\n\n")

function nothing(err, result) {}

client.open(function(err, db) {              
   db.collection('testicles', function(err, collection) {
      db.authenticate("jhusain", "Z123eno123N", function(err, db) {
   //     debug(collection)
        try {

           //sys.print(collection.find)           
           collection.find({'a':{$exists: true}}, function(err, cursor) {
               cursor.each(function(err, doc) {
                  sys.print(doc.a + ", ")
               })
           })

           for(var i = 0; i < 3; i++) {
             collection.insert({'a':i}, nothing)
           }


           sys.print("really done.")
         } catch (e) {
            sys.print("EXPCIONT!")
            sys.print(e)
            //err(e)
         }
      })
   })
})


sys.print("done")





//---------------------------------------------------------
//require.paths.unshift(__dirname); 

//var http = require('http'); // http server if you like

//var mongo = require('deps/node-mongodb-native/lib/mongodb'); 
//var mongo = require('mongodb/db')

//probably you might need the ObjectID later:
//var ObjectID= require('deps/node-mongodb-native/lib/mongodb/bson/bson').ObjectID; 

//var s = new mongo.Server('flame.mongohq.com', 27029, {}, {})

//db = new mongo.Dbconnect('blackjack', '', {});

/*
db.addListener("error", function(error) {
   sys.puts("Error connecting to mongo -- perhaps it isn't running?"); });

db.open(function(p_db)
{

  yourapp.init(db,
  function (){

   http.createServer(function (req,res){
      res.send("hi")
   }).listen(8080);

 });

})
;

*/