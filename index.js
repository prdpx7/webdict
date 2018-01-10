'use strict'
const cheerio = require('cheerio')
const got = require('got')
const dictionaryURL = 'http://dictionary.com/browse/'
const urbanDictionaryURL = 'http://api.urbandictionary.com/v0/define?term='
function getURL (site, word) {
  if (site === 'dictionary') {
    return dictionaryURL + word
  } else if (site === 'urbandictionary') {
    return urbanDictionaryURL + word
  } else {
    return 'invalid url'
  }
}
function isWord (val) {
  if (val === '') return false
  return true
}
function stripping (val) {
  return val.trim()
}
function urbanDictionaryScrapper (jsonBody) {
  var json = JSON.parse(jsonBody)
  var ans
  if (json.result_type === 'exact') {
    ans = {'statusCode': '200', 'message': 'success', 'type': 'Unknown', 'definition': []}
    ans.definition = json.list.map((val) => { return val.definition }).slice(0, 3)
    ans.source = 'http://urbandictionary.com'
  } else {
    ans = {'statusCode': 404, 'message': 'check the spelling again', 'source': 'http://urbandictionary.com'}
  }
  return ans
}
function dictionaryScrapper (htmlBody) {
  var json = {'statusCode': '200', 'message': 'success', 'type': '', 'definition': []}
  var $ = cheerio.load(htmlBody)
  json.type = $('div section div div section header span').html()
  var defList = $('div section div div section div .def-content').text()
                            .split('\r\n').map(stripping).filter(isWord)
  defList = defList.map((val) => {
    return val.replace('(', '').replace(')', '')
                                        .split(':')
                                        .map(stripping).filter(isWord).join(':')
  })
  json.source = 'http://dictionary.com'
  json.definition = defList.slice(0, 3)
  return json
}
var webdict = (site, word) => {
  const url = getURL(site, word.toLowerCase())
  return got(url)
            .then(resp => {
              // console.log(resp.body)
              if (site === 'dictionary') {
                return dictionaryScrapper(resp.body)
              } else {
                return urbanDictionaryScrapper(resp.body)
              }
            })
            .catch(err => {
              // console.log('err', err)
              return {'statusCode': err.statusCode, 'message': 'Unable to fetch or check the source_url/spelling again', 'source': 'http://' + err.host}
            })
}
module.exports = webdict
