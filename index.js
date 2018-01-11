const cheerio = require('cheerio')
const got = require('got')

const dictionaryURL = 'http://dictionary.com/browse/'
const urbanDictionaryURL = 'http://api.urbandictionary.com/v0/define?term='

function getURL(site, word) {
  if (site === 'dictionary') {
    return dictionaryURL + word
  } else if (site === 'urbandictionary') {
    return urbanDictionaryURL + word
  }

  return 'invalid url'
}

function isWord(val) {
  return val !== ''
}

function stripping(val) {
  return val.trim()
}

function urbanDictionaryScrapper(jsonBody) {
  const json = JSON.parse(jsonBody)

  if (json.result_type === 'exact') {
    return {
      statusCode: '200',
      message: 'success',
      type: 'Unknown',
      definition: json.list.map(item => item.definition).slice(0, 3),
      source: 'http://urbandictionary.com'
    }
  }

  return {
    statusCode: 404,
    message: 'check the spelling again',
    source: 'http://urbandictionary.com'
  }
}

function dictionaryScrapper(htmlBody) {
  const $ = cheerio.load(htmlBody)
  const definitionList =
    $('div section div div section div .def-content')
      .text()
      .split('\r\n')
      .map(stripping)
      .filter(isWord)
      .map(val =>
        val
          .replace('(', '')
          .replace(')', '')
          .split(':')
          .map(stripping)
          .filter(isWord)
          .join(':')
      )
      .slice(0, 3)

  return {
    statusCode: '200',
    message: 'success',
    type: $('div section div div section header span').html(),
    definition: definitionList,
    source: 'http://dictionary.com'
  }
}

const webdict = (site, word) =>
  got(getURL(site, word.toLowerCase()))
    .then(response =>
      (site === 'dictionary' ? dictionaryScrapper : urbanDictionaryScrapper)(response.body)
    )
    .catch(err =>
      ({
        statusCode: err.statusCode,
        message: 'Unable to fetch or check the source_url/spelling again',
        source: `http://${err.host}`
      })
    )


module.exports = webdict
