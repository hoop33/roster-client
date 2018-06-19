var messages = require('./players_pb')
var services = require('./players_grpc_pb')

var grpc = require('grpc')

messages.Player.prototype.toString = function() {
  return `[${this.getId()}] ${this.getName()} (${this.getPosition()}) -- #${this.getNumber()}, ${this.getHeight()}, ${this.getWeight()}lb, ${this.getAge()}yo, ${this.getExperience()}exp -- ${this.getCollege()}`
}

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
  client.listPlayers(request, (err, response) => {
    if (err) {
      console.log(err)
      return
    }
    if (response.getErr()) {
      console.log(`${position} : ${response.getErr()}`)
    } else {
      response.getPlayersList().forEach(player => {
        console.log(`${position} : ${player.toString()}`)
      })
    }
  })
}

function getPlayer(client, id) {
  var request = new messages.GetPlayerRequest()
  request.setId(id)
  client.getPlayer(request, (err, response) => {
    if (err) {
      console.log(err)
      return
    }
    if (response.getErr()) {
      console.log(`${id} : ${response.getErr()}`)
    } else {
      console.log(`${id} : ${response.getPlayer().toString()}`)
    }
  })
}

main()
