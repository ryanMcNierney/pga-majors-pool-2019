const { Player } = require('../../../database')
const playerData = require('../scrapers/json-files/masters.json')

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
        const { short_name } = foundPlayer.dataValues
        await Player.update({ wgr: player.wgr, masters: true }, {
          where: { short_name }
        })
          .spread((numberOfAffectedRows) => { // because we return a promise for an array, .spread is recommended
            console.log('affectedRows =', numberOfAffectedRows) // say we had 3 pugs with the age of 7. This will then be 3
          })

      }
    })
})
