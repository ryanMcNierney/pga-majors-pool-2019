const db = require('../database')
const Sequelize = require('sequelize')

const Major = db.define('majors', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  course: {
    type: Sequelize.STRING,
    allowNull: false
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dates: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Major
