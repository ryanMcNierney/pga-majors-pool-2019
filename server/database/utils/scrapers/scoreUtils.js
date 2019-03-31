// helper functions for scoreScraper.js
const Player = require('../../../database')

const parCheck = (position, par) => {
  let newPar
  if (position === 'WD') {
    newPar = 32
  } else if (position === 'CUT') {
    newPar = par + 16
  } else {
    newPar = par
  }
  return newPar
}

const bonusCheck = (position) => {
  let bonus
  if (position === '1' || position === 'T1') {
    bonus = -10
  } else {
    bonus = 0
  }
  return bonus
}

const totalCheck = (position, totalNum) => {
  let total
  if (position === 'WD') {
    total = 320
  } else if (position === 'CUT') {
    total = totalNum + 160
  } else {
    total = totalNum
  }
  return total
}

const getPlayerId = async (short_name) => {
  try {
    await Player.findOne({ where: { short_name } })
      .then(player => {
        const playerId = player.id
        return playerId
      })
  } catch (e) {
    console.log('Error finding Player', e)
  }

}

module.exports = { parCheck, bonusCheck, totalCheck, getPlayerId }
