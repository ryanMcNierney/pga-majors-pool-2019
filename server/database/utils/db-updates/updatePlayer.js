const { Player } = require('../../../database')
const playerData = require('../scrapers/json-files/valspar.json')

// update database with new players
playerData.forEach(async (player) => {
  await Player.findOne({
    where: { short_name: `${player.short_name}` }
  })
    .then(async (foundPlayer) => {
      if (!foundPlayer) {
        await Player.create({ ...player, masters: true })
          .then(() => {
            console.log('Player is added to the DB')
          })
      } else {
        console.log('The player is already in the DB')
        // this is where I can do Player.update()
      }
    })
})
