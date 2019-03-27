// update players for current Major
const puppeteer = require('puppeteer')
const $ = require('cheerio')

// const url = 'https://www.flashscore.com/golf/pga-tour/wgc-dell-technologies-match-play/'

// get the player profile page ID
const getPlayerProfiles = async (url) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitForSelector('.fs-table')
  const html = await page.content()

  const rows = $('.table-main > table > tbody', html)[0].children

  const profileArr = []
  for (let i = 0; i < rows.length; i++) {
    const profileID = rows[i].attribs.id.slice(5)
    profileArr.push(profileID)
  }

  await browser.close()

  return profileArr
}

// call each player page and get the data
const getPlayerData = async (profileArr) => {

  const playerData = []

  for (let i = 0; i < profileArr.length; i++) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`https://www.flashscore.com/match/${profileArr[i]}/p/#match-summary`)
    await page.waitForSelector('#content-all')
    const html = await page.content()

    const short_name = $('.player-name > a', html)[0].children[0].data
    const long_name = $('.tname > a', html)[0].children[0].data.slice(0, -6)
    const profile = $('.tname > a', html)[0].attribs.onclick.slice(20, -17)
    const img = $('.participant-imglink > img', html)[0].attribs.src
    const imgClean = 'https://www.flashscore.com' + img
    const country = $('.player-name > span', html)[0].attribs.title
    const country_code = $('.player-name > span', html)[0].attribs.class.slice(5)

    const player = { short_name, long_name, profile, imgClean, country, country_code }

    console.log('player\n', player)

    playerData.push(player)

    await browser.close()
  }

  return playerData

}

// const testData = [
//   'YX6KAN2F',
//   'GddP9sIL',
//   'fmeT81XR',
//   'Ctcf4Luq',
//   'jXeb3uek',
//   'Yeo32aAe',
//   'nak71JP1',
//   '02wkQ222',
//   'vgxgPMH8',
//   'dUWcOtXE',
//   'zLV1N0nL',
//   'UsV5MK1R',
//   '4zMXHvAr',
//   'naBxHbPl',
//   'QkAtGIve',
//   'fPEpFxf1',
//   'YFDlEd97',
//   'zLiXxtn8',
//   'lOeyx01E',
//   'tKJ4KXVt',
//   'KAI8Jiom',
//   '0MZ5IB0g',
//   'vDY9HVFa',
//   'YZXDGkV5',
//   'nwxIF9pC',
//   'U1RMETaI',
//   '8hQQDmFO',
//   'd8J8xXiP',
//   'bH5zYj0t',
//   'tteuXAFn',
//   'vRDrWUUh',
//   'YmDnVlpa',
//   'CvCjU8a5',
//   'UF6eTSEB',
//   '865aSnUH',
//   '2T43R6qO',
//   'GW87QQbU',
//   'tfzEoAUu',
//   'KpZHpUqn',
//   'SAYLqlah',
//   '61XPr8Eb',
//   'lQMUsST4',
//   '2TQYtnqB',
//   'djQxt6bH',
//   'zsPtuQDN',
//   'hIJovpTT',
//   'fR5DZ3yo',
//   '8UgebmEo',
//   'K4cac7Ti',
//   '2Tn4dRrb',
//   'tKo8eob4',
//   'AgjCf5DA',
//   'lpkGgPSG',
//   'W8vLhqrN',
//   'pCrPi3cT',
//   '2iVjmN5p',
//   'trUfnsLj',
//   'SpkVAQci',
//   '6ylZ9pDc',
//   '0bmw94S3',
//   'E1is8OsA',
//   'dQtn7rcG',
//   'Yk4FkGRr',
//   '2P8Jlzsk']

const init = async () => {
  console.log('Creating player profile array...')
  const profileArr = await getPlayerProfiles()
  console.log('Player profile array complete.')
  console.log('Creating player data array...')
  const playerData = await getPlayerData(profileArr)
}

init()
