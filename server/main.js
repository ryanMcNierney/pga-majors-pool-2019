const { db } = require('./database/')
const app = require('./index.js')
const PORT = process.env.PORT || 3000
require('dotenv').config()

const init = async () => {
  await db.sync() //INSERT { force: true } INTO SYNC CALL IF TESTING
  app.listen(`${PORT}`, () => {
    console.log(`----listening on port ${PORT}----\n`)
  })
}

init()
