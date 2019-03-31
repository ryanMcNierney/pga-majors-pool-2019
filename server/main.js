const { db } = require('./database/')
const app = require('./index.js')
const PORT = process.env.PORT || 3000
const firebase = require('firebase')

const init = async () => {
  await db.sync({ force: true }) //INSERT { force: true } INTO SYNC CALL IF TESTING
  app.listen(`${PORT}`, () => {
    console.log(`listening on port ${PORT}`);
  });
};

init()

// firebase init
const config = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DB_URL,
  storageBucket: process.env.FB_STORAGE_BUCKET
}

firebase.initializeApp(config)
const fb = firebase.database()
if (fb) console.log('\n----Firebase Connected----\n')

module.exports = fb
