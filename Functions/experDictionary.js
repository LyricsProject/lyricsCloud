const fs = require("fs");
const statistical = require('statistical-js')

const binaryFind = require("./binaryFind");
const beachHouseLyrics = require("./everyBeachHouselyric");

function Letter(letter) {
  this.letter = letter;
  this.children = [];
}

const dict = [];

function load(giantString) {

  let current;
  let lastLetter;
  let word;
  let insertion;
  let leafLetter;
  
  const allWords = giantString.trim().split(/\s+|,\s+|\.\s+|!\s+|\?\s+/);
  for (let jj = 0; jj < allWords.length; jj++) {

    word = allWords[jj];
    current = dict

    for (let letter = 0; letter < word.length; letter++) {
      leafLetter = word[letter].toLowerCase();

      insertion = binaryFind(current, leafLetter);

      if (
        !current[insertion] ||
        current[insertion].letter !== leafLetter //what is this condition??
      ) {
        lastLetter = new Letter(leafLetter);
        current.splice(insertion, 0, lastLetter);
        current = lastLetter.children;

      } else {
          lastLetter = current[insertion]
          current = lastLetter.children;
        }
    }

    if(lastLetter.frequency) lastLetter.frequency++
    else lastLetter.frequency = 1

  }
  console.log("Success Load");
}

function printer(dictionary, save = "", lyrics = []) {
  dictionary.forEach(eachLetter => {
    const copy = save + eachLetter.letter;
    if (eachLetter.frequency) {
      lyrics.push({ word: copy, frequency: eachLetter.frequency });
    }
    if (eachLetter.children.length > 0)
      printer(eachLetter.children, copy, lyrics);
  });
  return lyrics;
}


function giveMeLyrics(cb){

    for(let file = 2; file<process.argv.length; file++){
        let data = fs.readFileSync("./" + process.argv[file] + ".txt", "utf8")
        load(data);
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

function log (lyric) {
    console.log(lyric.word + " FREQUENCY: " + lyric.frequency)
}


//giveMeLyrics(log)


for(let file = 2; file<process.argv.length; file++){
    let data = fs.readFileSync("./" + process.argv[file] + ".txt", "utf8")
    load(data);
}
const lyrics = printer(dict);





const numbersGame = lyrics.map(each=>each.frequency).sort((a,b)=>a-b)


const percentile = statistical.methods.percentile(numbersGame, 85)
const stdDev = statistical.methods.stdDeviation(numbersGame)

const filtered = lyrics.filter(each=>each.frequency>percentile)

filtered.sort((first, next) => {
    if (next.frequency !== first.frequency)
      return next.frequency - first.frequency;
    else return next.word[0] - first.word[0];
  });

  filtered.forEach(each => {
      log(each)
  });

