import test from 'ava'
import webdict from '.'

test('searching `limerance` in urbandictionary', async (t) => {
  const data = await webdict('urbandictionary', 'limerance')
  const ans = ['A completly life altering [state of mind], more than a "[crush]", very intense feelings of affection towards somebody else. When the feelings are [unrequited], it can destroy ones life.']
  t.is(data.definition[0], ans[0])
})

test('searching `kafkaesque` in dictionary', async (t) => {
  const data = await webdict('dictionary', 'kafkaesque')
  t.is(data.statusCode, '200')
})
