// update players for current Major
const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const fs = require('fs')

// get the player profile page ID
const getProfileId = async () => {
  try {
    const url = 'https://www.flashscore.com/golf/pga-tour/masters-tournament/' // url to scrape
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)
    await page.waitForSelector('.fs-table')
    const html = await page.content()
    const $ = cheerio.load(html)

    const profileIdArr = $('.table-main > table > tbody').children('tr').map((i, elem) => {
      const $id = $(elem).attr('id')
      return $id.slice(5)
    }).get()

    console.log('profileIdArr =', `${profileIdArr.length} players`)
    await browser.close()

    return profileIdArr

  } catch (e) {
    console.log('Error', e)
  }

}

// if an error on one player find a way to record & move on
const getPlayerData = async (profileArr) => {
  const playerData = []
  for (let i = 0; i < profileArr.length; i++) { // update to full profileArr.length
    try {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto(`https://www.flashscore.com/match/${profileArr[i]}/p/#match-summary`)
      await page.waitForSelector('.player-name')
      const html = await page.content()
      const $ = cheerio.load(html)

      // get player details
      const short_name = await $('.player-name').find('a').text()
      const long_name = await $('.tname').find('a').text().slice(0, -6)
      const profile = await $('.tname').find('a').attr('onclick').slice(20, -17)
      // handle wgr erros
      let wgr
      const wgrCheck = /(World Ranking:)+/
      if (wgrCheck.test($('.info').text())) {
        wgr = await Number($('.info').children()[0].next.data.replace(/\D/g, ''))
      } else {
        wgr = 0
      }
      const fix_wgr = (wgr === 0)
      const img = await 'https://www.flashscore.com' + $('.participant-imglink').find('img').attr('src')
      const country = await $('.player-name').find('span').attr('title')
      const country_code = await $('.player-name').find('span').attr('class').slice(5)
      const player = { short_name, long_name, profile, img, country, country_code, wgr, fix_wgr }
      playerData.push(player)

      await browser.close()
      setTimeout(function () {
        console.log(i + 1);
      }, 1000)
    } catch (e) {
      console.log(e)
      console.log(`Error grabbing #${i + 1}`)
    }
  }

  return playerData
}

// save the data as JSON string and JSON.parse(data) to read it
const savePlayerData = (playerData) => {
  fs.writeFile('./server/database/utils/scrapers/json-files/masters.json', JSON.stringify(playerData), 'utf-8', (err) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Output saved to /scrapers/json-files');
    }
  })
}

(async () => {
  const profileArr = await getProfileId()
  const playerData = await getPlayerData(profileArr)
  await savePlayerData(playerData)
})()
