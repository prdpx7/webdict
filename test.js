import test from 'ava'
import webdict from '.'
test('searching `limerance` in urbandictionary', async t => {
  const data = await webdict('urbandictionary', 'limerance')
  var ans = [ 'A floaty, manic, excited, feeling that often arises after meeting or spending time with someone who you are recently attracted to. Also, a fluttering heart, or butterflys in the stomach are symtoms of the feeling. It is similar to infatuation except that it lingers, is usually less lusty and does not have the same negative connotation. Also is usually a temporary state, unlike love. Often thoughts of the person are deep and engaging, resulting in day dreaming. The word was originally founded by a Psychologist in the 1970s ' ]
  // console.log(data.definition)
  t.is(data.definition[0], ans[0])
})
test('searching `aWordwhichdoesnotexistindictionary` in dictionary', async t => {
  const data = await webdict('dictionary', 'aWordwhichdoesnotexistindictionary')
  t.is(data.statusCode, 404)
})
