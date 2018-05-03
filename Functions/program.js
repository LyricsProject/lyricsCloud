const fs = require('fs')
const load = require('./loadDictionary')
const printer = require('./printer')


function giveMeLyrics(cb){

    const dict = []

    for(let file = 2; file<process.argv.length; file++){
        
        let data = fs.readFileSync(__dirname + "../ArtistLyrics/" + process.argv[file] + ".txt", "utf8")
        load(data, dict);
    }

    const lyrics = printer(dict);

    lyrics.sort((first, next) => {
      if (next.frequency !== first.frequency)
        return next.frequency - first.frequency;
      else return next.word[0] - first.word[0];
    });

    lyrics.forEach(each => {
        cb(each)
    });
}

module.exports = giveMeLyrics