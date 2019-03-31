// firebase init
const firebase = require('firebase')
require('dotenv').config()

const config = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DB_URL,
  storageBucket: process.env.FB_STORAGE_BUCKET
}

const fbApp = firebase.initializeApp(config)
console.log('----Firebase Initialized----')

module.exports = fbApp
