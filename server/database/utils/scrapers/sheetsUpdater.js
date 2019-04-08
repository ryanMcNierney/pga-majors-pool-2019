const { google } = require('googleapis')

const googleMain = (batch) => {
  try {
    // configure a JWT auth client
    let jwtClient = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY,
      ['https://www.googleapis.com/auth/spreadsheets'])

    //authenticate request
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        console.log(err)
      } else {
        console.log('Successfully connected!')
      }
    })

    const data = [{ range: 'A4:L147', values: batch }]
    const resource = { data, valueInputOption: 'USER_ENTERED' }

    // write to google sheet
    const sheets = google.sheets('v4')
    sheets.spreadsheets.values.batchUpdate({
      auth: jwtClient,
      spreadsheetId: '19cr1xlYyDM2kbTxDobbHPBwHO__0FQUrsKwv-xqbow4',
      resource
    }, (err, result) => {
      if (err) {
        console.log('Error writing to google sheet', err)
      } else {
        console.log(`${result.data.totalUpdatedRows} Rows Updated`)
      }
    })
  } catch (e) {
    console.log('Error writing data to Google', e)
  }
}

module.exports = { googleMain }
