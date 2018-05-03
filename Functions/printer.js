//THIS FUNCTION REBUILDS TREE OF WORDS AS AN ARRAY OF OBJECTS WITH WORDS AND FREQUENCIES


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


  module.exports = printer