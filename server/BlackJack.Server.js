var Db = require('mongodb').Db
Connection = require('mongodb').Connection
Server = require('mongodb').Server
var sys = require('sys')
var app = require('express').createServer();
require("./rx/rx_util")
function debug(y) {
   for (x in y) {
      sys.print(x + ", ")
   }
   sys.print("\n")
}




/*
data: {
                        turn: 0,
                        players:
                           [
                              { 
                                id: 123232,
                                index: 0, 
                                points: 12,
                                active: true, 
                                playerName: "moe", 
                                hand: [{value: '10', suit: 'c'}, {value: 'a', suit: 'h'}] 
                              },
                              { 
                                index: 1, 
                                points: 21,
                                active: true, 
                                playerName: "jimbo jones", 
                                hand: [{value: 'k', suit: 'h'}] 
                              }
                           ]
                     }
*/

var BlackJack = (function() {
   var Game = function(data) {
      if (data) {
         this.data = data
      } else {
         this.data = {lastUpdated: new Date(), players: [], numPlayers: 0}
      }
      /*
      this.getPlayerGameState = function(playerIndex) {
         this.data.players.map(function(player) {
            var nplayer = player
            if (player.index == playerIndex)
               return player    ...
         })
      }
      */
      this.join = function(playerName) {
         var gameData = this.data
         gameData.players.push(
            new Player(playerName, gameData.players.length).data
//            {index: gameData.numPlayers, hand: [], name: playerName}
         )
         gameData.numPlayers++
      }
   }

   var Player = function(data, index) {
      sys.print("wha?:\n")
      sys.print("klsdf".constructor == String)
      sys.print(typeof "dlkfj")
      if (data.constructor == String) {
         this.data = {playerName: data, id: Math.random(), index: index, hand: [], active: false, connected: false}
      } else {
         this.data = data
      }
      
   }

   return {Game: Game, Player: Player}
})()

function connect(user, password, cont) {
   db.open(function(err, db) {              
      if (err) {
         cont(err);
      }
      else {
         db.authenticate("jhusain", "Z123eno123N", function(err) {
            cont(err, db);
         });
      }
   })
}

//==========================================================================
app.get('/join/:name', function(req, res) {

   var db = new Db('blackjack', new Server("flame.mongohq.com", 27029, {auto_reconnect: true}));
   function nothing(err, result) {}

   db.open.bind(db).toObservable().Subscribe(function(db) {
   //db.open(function(err, db) {              
      db.collection('games', function(err, games) {
         db.authenticate("jhusain", "Z123eno123N", function(err) {

            games.find({}, function(err, cursor) {
               cursor.sort([['numPlayers', 'ascending']], function(err, cursor) {
                  cursor.limit(1, function(err, cursor) {
                     cursor.fetchAllRecords(function(err, records) {

                        var cont = null
                        

                        if (records.length) {
                           sys.print("not-full game found\n")
                           

                           var game = new BlackJack.Game(records[0])
                           game.join(req.params.name)
                           var lastUpdated = game.data.lastUpdated
                           game.data.lastUpdated = new Date()
                           cont = 
                              games.update.bind(
                                 games, 
                                 {_id: game.data._id, lastUpdated: lastUpdated}, 
                                 game.data, 
                                 false)

                        } else {
                           sys.print("no not-full games\n")

                           var game = new BlackJack.Game()
                           game.join(req.params.name)
                           sys.print(games.insert + "\n")
                           cont = games.insert.bind(games, game.data)
                        }
//                        games.update(game.

                        cont(function(err) {
                           sys.print("done.\n")
                           //res.send('hello ' + req.params.name + ", " + guid);
                           sys.print(res.send)
                           res.send({channel: game.data.players[game.data.players.length - 1].id})

                        })
                     })
                  })
               })
/*
               if (cursor.count() > 0) {
                  var game = cursor.next()
                  sys.print(game)
                  cont(game)
               } else {
                  sys.print("no empty games")
               }
*/
            })

//              for(var i = 0; i < 3; i++) {
//                collection.insert({'a':i}, nothing)
//              }


              sys.print("really done.\n")

         })
      })
   })



});

app.listen(666);



//===========================================================
/*
var Player = function (data) {
            data = deepCopy(data);

            this.id = function () { return data.id; };
            this.isTurn = function (value) { 
                if (value != undefined) 
                    data.isTurn = value;
                else 
                    return data.isTurn;    
                };

            this.index = function() { return data.index; };
            this.stay = function () {
                this.data.isTurn = false;
            };

            this.hit = function (card) {
                this.data.hand.push(card);
            };

            this.data = function () { return deepCopy(data); };

            // TODO: Push to the client
            this.eventOccurred = function (event) { // sendToChannel(this.data.channel, JSON.stringify(event)); };

            var getCardValue = function(card) {
                if (card.face == Face.Ace)
                       return [1,11];
                else if (card.face >= Face.Jack) 
                    return [10];
                else
                    return [card.face];
            };

            Enumerable.prototype.GetPermutations = function(enumerable) {
                var first = enumerable.FirstOrDefault();
                if (first != null) {
                    first.SelectMany(
                        enumerable.Skip(1).GetPermutations(),

                }
                else {
                    return enumerable;
                }
            };
            this.handValue = function() {
                
            };
        };
*/