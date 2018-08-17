import test from 'ava'
import webdict from '.'

test('searching `limerance` in urbandictionary', async (t) => {
  const data = await webdict('urbandictionary', 'limerance')
  t.is(data.definition.length > 0, true)
})

test('searching `kafkaesque` in dictionary', async (t) => {
  const data = await webdict('dictionary', 'kafkaesque')
  t.is(data.statusCode, '200')
})
