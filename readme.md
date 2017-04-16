# webdict 

> Fetch definition/meaning of words from `dictionary.com` and `urbandictionary.com`

[![Build Status](https://travis-ci.org/zuck007/webdict.svg?branch=master)](https://travis-ci.org/zuck007/webdict) 
[![MITlicensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/zuck007/webdict/master/LICENSE)

## Install
```
$ npm install --save webdict
```
## Usage
```js
const webdict = require('webdict');
webdict('dictionary', 'broken')
    .then(resp => {
        console.log(resp);
        /*
        { 
            statusCode: '200',
            message: 'success',
            type: 'verb',
            definition: [ 'past participle of break.', 
                          'reduced to fragments; fragmented.',
                          'ruptured; torn; fractured.'
                        ],
            source: 'http://dictionary.com'
        }
        */
    });
webdict('urbandictionary', 'hello')
    .then(resp => {
        console.log(resp);
        /*
            { 
                statusCode: '200',
                message: 'success',
                type: 'Unknown',
                definition: [ 'what you say when your talking casually with friends and your mom walks in the room',
                              'The only word on this site that has nothing to do with [sex] or [drugs]!',
                              '1.  A greeting\r\n2.  A for of incredulity'
                            ],
                source: 'http://urbandictionary.com' 
            }
        */
    });
webdict('urbandictionary', 'thisworddoesnotexistinanydictionary')
    .then(resp => {
        console.log(resp);
        /*
            { 
                statusCode: 403, 
                message: 'check the spelling again' 
            }
        */
    });
```