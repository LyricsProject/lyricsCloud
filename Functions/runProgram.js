const giveMeLyrics = require('./program')


giveMeLyrics(log)

function log (lyric) {
    console.log(lyric.word + " FREQUENCY: " + lyric.frequency)
}