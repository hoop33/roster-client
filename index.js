var messages = require('./players_pb')
var services = require('./players_grpc_pb')

var grpc = require('grpc')

function main() {
  var client = new services.PlayersClient('localhost:9091', grpc.credentials.createInsecure())
  listPlayers(client, 'QB')
  listPlayers(client, 'PF')
  getPlayer(client, 12)
  getPlayer(client, 500)
}

function listPlayers(client, position) {
  var request = new messages.ListPlayersRequest()
  request.setPosition(position)
  client.listPlayers(request, function(err, response) {
    if (response.getErr() !== "") {
      console.log(position + ' : ' + response.getErr())
    } else {
      response.getPlayersList().forEach(function(player) {
        console.log(position + ' : ' + toString(player))
      })
    }
  })
}

function getPlayer(client, id) {
  var request = new messages.GetPlayerRequest()
  request.setId(id)
  client.getPlayer(request, function(err, response) {
    if (response.getErr() !== "") {
      console.log(id + ' : ' + response.getErr())
    } else {
      console.log(id + ' : ' + toString(response.getPlayer()))
    }
  })
}

function toString(player) {
  return '[' + player.getId() + '] ' + player.getName() + ' (' + player.getPosition() + ') -- #' + player.getNumber() + ', ' + player.getHeight() + ', ' + player.getWeight() + 'lb, ' + player.getAge() + 'yo, ' + player.getExperience() + 'exp -- ' + player.getCollege()
}

main()
