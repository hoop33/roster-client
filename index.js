var messages = require('./players_pb')
var services = require('./players_grpc_pb')

var grpc = require('grpc')

function main() {
  var client = new services.PlayersClient('localhost:9091', grpc.credentials.createInsecure())
  var request = new messages.ListPlayersRequest()
  request.setPosition('QB')
  client.listPlayers(request, function(err, response) {
    if (response.getErr() !== "") {
      console.log(response.getErr())
    } else {
      response.getPlayersList().forEach(function(player) {
        console.log('[' + player.getId() + '] ' + player.getName() + ' (' + player.getPosition() + ') -- #' + player.getNumber() + ', ' + player.getHeight() + ', ' + player.getWeight() + 'lb, ' + player.getAge() + 'yo, ' + player.getExperience() + 'exp -- ' + player.getCollege())
      })
    }
  })
}

function toString(player) {
}

main()
