const axios = require('axios')
const $ = require('cheerio')

const fetch = async () => {
  const options = {
    method: 'GET',
    withCredentials: true,
    url: 'https://codequiz.azurewebsites.net/',
    headers: { Cookie: 'hasCookie=true' }
  }

  const response = await axios(options)
  const html = response.data

  const mapData = {}
  $('table > tbody > tr', html).each((idx, element) => {
    const name = $($(element).find('td')[0]).text()
    const nav = $($(element).find('td')[1]).text()

    if (name && name !== '') {
        mapData[name.toLowerCase()] = nav
    }
  })

  return mapData
}

const args = process.argv.slice(2)
if (args.length > 0) {
    fetch().then(data => {
        const arg = args[0].toLowerCase()
        console.log(data[arg])
    })
}