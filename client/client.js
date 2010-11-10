function Card(a) {
   return a
}
//player joins game in progress, recieves a deal message in which they are not in the players list.
var othermessages = [
                  {
                     message: "GameState",
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
                  }
]
var messages = [
            {
                message: "PlayerJoin",
                data: { index: 0, playerName: "jimbo jones", points: 12 }
            },
            {
                message: "Deal",
                data:
                {
                    players:
                        [
                            { index: 0, hand: [{value: '10', suit: 'c'}, {value: 'a', suit: 'h'}] },
                            { index: 1, hand: [{value: 'k', suit: 'h'}] }
//                            { index: 1, card: {value: '5', suit: 'd'} }
                        ]
                }
            },
            {
                message: "TurnChanged",
                data: 1
//                data: { index: 1 }
            },
            {
                message: "Hit",
                data: { index: 1, card: {value: 'j', suit: 'h'} }
            },
            {
                message: "EndRound",
                data: {
                    players: [
                        { index: 0, points: 12, hand: [{value: '10', suit: 'c'}, {value: '10', suit: 'd'}] },
                        { index: 1, points: 23, hand: [{value: '4', suit: 'c'}, {value: '2', suit: 'c'}] },
                    ]
                }
            }
        ];


function recieve(message) {
   //alert(message.message)
   eval(message.message)(message.data)
}


//b1fv.png
//======================================================================================================================
function PlayerJoin(data) {
   $("#player-tmpl").tmpl(data).appendTo("#player" + data.index)
   $("#points-tmpl").tmpl({points: 0}).appendTo("#points" + data.index)
}

function Deal(data) {
   //remove all cards:
   E.From($("#game > td > img"))
      .ForEach(function(img) { $(img).remove() })

   //add newly drawn cards:
   data.playerSummaries.forEach(function(summary) {
      $("#player" + summary.index).append($("#card-tmpl").tmpl(summary.card))
   })
}

function TurnChanged(data) {
   //colour everyone who's turn it is not: white:
   E.From($("#game > td"))
      .Where(function(node) { return node.id.substr(6, 1) != data.index })
      .ForEach(function(node) { $(node).attr("bgcolor", "white") })

   //colour player who's turn it is: red:
   $("#player" + data.index).attr("bgcolor", "red")
}

function Hit(data) {
   $("#player" + data.index).append($("#card-tmpl").tmpl(data.card))
}

function EndRound(data) {
   data.playerSummaries.forEach(function (summary) {
      $("#points" + summary.index).html($("#points-tmpl").tmpl(summary))
   })

}
//======================================================================================================================


$(document).ready(function() {
// recieve(message[0])
/*
//alert($.tmpl( $("#player"), {name: "joe", id: "1"} )) //.appendTo( "#moviesList" )
//   alert($("#player" ))  //.appendTo( "#moviesList" );
//alert($("#player"))
//alert(typeof($( "#player" ).tmpl( {name: "joe", id: "1"} )))  //.appendTo( "#table" )

//alert(c)

d = document.getElementById("game")
c = $("#game")
alert(d + ", " + c)
c.append(b)

$("#game").html("<b>So Bold!</b>")
$("#game").append(b)
//alert($("game"))
*/
//$("#player").tmpl( [{name: "joe", id: "1"}] ).appendTo("#player2")
//$("#player").tmpl( { name: "toe" }).appendTo( "#game" )
//$( "#summaryTemplate" ).tmpl( { Name: "joe" }).appendTo( "#game" );
   recieve(messages[0])
   recieve({
      message: "PlayerJoin",
      data: { index: 1, playerName: "carl carlson" }
   })
   recieve(messages[1])
   recieve(messages[2])
   recieve(messages[3])
   recieve(messages[4])

})

function test() {
   recieve(messages[1])
}