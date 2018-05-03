const binaryFind = require("./binaryFind");


function Letter(letter) {
    this.letter = letter;
    this.children = [];
  }

function load(giantString, dict=[]) {

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
    
    console.log("Success Load")
    return dict
  }

  module.exports = load