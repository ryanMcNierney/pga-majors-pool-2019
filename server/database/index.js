const db = require('./database')
//import models here
const Player = require('./models/player')
const Major = require('./models/major')

//define associations here

//export everything below
module.exports = {
  db, Player, Major
}
