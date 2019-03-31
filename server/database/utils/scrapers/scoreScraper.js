// get the live scores
const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const { parCheck, bonusCheck, totalCheck, getPlayerId } = require('./scoreUtils') // helper functions
const fb = require('../../../main')

const url = 'https://www.flashscore.com/golf/pga-tour/valspar-championship/'

const createScoreTable = async () => {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)
    await page.waitForSelector('.fs-table')
    const html = await page.content()
    const $ = cheerio.load(html)

    const scoreTable = {}

    $('.table-main > table > tbody').children('tr').each((i, elem) => {
      // stats
      const position = $(elem).find('.cell_ra').text()
      const player = $(elem).find('.cell_ab').text()
      const par = parCheck(position, Number($(elem).find('.cell_sc').text()))
      const thru = $(elem).find('.cell_su').text()
      const today = Number($(elem).find('.cell_sw').text())
      const rnd_1 = (position === 'WD') ? 80 : Number($(elem).find('.cell_sd').text())
      const rnd_2 = (position === 'WD') ? 80 : Number($(elem).find('.cell_se').text())
      const rnd_3 = (position === 'CUT' || position === 'WD') ? 80 : Number($(elem).find('.cell_sf').text())
      const rnd_4 = (position === 'CUT' || position === 'WD') ? 80 : Number($(elem).find('.cell_sg').text())
      const totalNum = Number($(elem).find('.cell_sh').text()) // total helper
      const total = totalCheck(position, totalNum)

      // bonus check
      const bonus = bonusCheck(position)

      // lookup the player_id from Player postGres


      scoreTable[player] = { position, bonus, par, thru, today, rnd_1, rnd_2, rnd_3, rnd_4, total }

    })

    await browser.close()
    return scoreTable

  } catch (e) {
    console.log('Error', e)
  }
}

// add the table to firebase

const updateLiveData = async (scoreTable) => {
  try {
    await fb.ref('masters').set(scoreTable, () => {
      console.log('Data updated to firebase live-data')
    })

  } catch (e) {
    console.log('Error updated firebase live-data', e)
  }
}

(async () => {
  const scoreTable = await createScoreTable()
  await updateLiveData(scoreTable)
})()
