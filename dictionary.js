//import {glassAnimals} from './lyrics'
//const binaryInsertion = require('./binaryInsertion')
//const binaryFindOrInsert = require('./binaryFindOrInsert')
const fs = require("fs");

const binaryFind = require("./binaryFind");
const beachHouseLyrics = require("./everyBeachHouselyric");

function Letter(letter) {
  this.letter = letter;
  this.children = [];
}

const dict = [];

function load(giantString) {
  let current;
  let next;
  let word;
  let insertion;
  let firstLetter;
  let leafLetter;

  const allWords = giantString.trim().split(/\s+|,\s+|\.\s+|!\s+|\?\s+/);
  for (let jj = 0; jj < allWords.length; jj++) {
    word = allWords[jj];
    console.log("Insert word ", word);

    firstLetter = word[0].toLowerCase();

    insertion = binaryFind(dict, firstLetter);

    if (!dict[insertion] || dict[insertion].letter !== firstLetter) {
      current = new Letter(firstLetter);
      dict.splice(insertion, 0, current);
    } else current = dict[insertion];

    for (let letter = 1; letter < word.length; letter++) {
      leafLetter = word[letter].toLowerCase();

      insertion = binaryFind(current.children, leafLetter);
      if (
        !current.children[insertion] ||
        current.children[insertion].letter !== leafLetter
      ) {
        next = new Letter(leafLetter);
        current.children.splice(insertion, 0, next);
        current = next;
      } else current = current.children[insertion];
    }

    if(current.frequency) current.frequency++
    else current.frequency = 1


    console.log("FINAL LETTER: ", current.letter, " Freq ", current.frequency);
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

//load('With the birds I\'ll share this lonely view')
//load(require('./lyrics').glassAnimals)

// beachHouseLyrics.forEach(eachSong => {
//   load(eachSong);
// });

// const lyrics = printer(dict);

// lyrics.sort((first, next) => {
//   if (next.frequency !== first.frequency)
//     return next.frequency - first.frequency;
//   else return next.word[0] - first.word[0];
// });

// lyrics.forEach(each => {
//   console.log(each.word + " FREQUENCY: " + each.frequency);
// });

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
      console.log(each.word + " FREQUENCY: " + each.frequency);
    });