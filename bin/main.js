#!/usr/bin/env node

const requestFunctions = require('./request');
const Word = require('./wordClass').Word;
const input_console = process.argv;

switch (input_console.length) {
    //for getting word of the day
    case 2: {
        requestFunctions.getRandomWord().then(response => {
            console.log("Your Word of the day is " + response.data.word);
            let newWord = new Word(response.data.word);
            newWord.printDictionary()
        })
    }
        break;
    //for starting quiz or getting full dictionary entry for a word
    case 3: {
        if (input_console[2] == "play") {

        }
        else {
            let newWord = new Word(input_console[2]);
            newWord.printDictionary();
        }
    }
        break;
    //for keywords defn, syn, ant and ex
    case 4: {
        let newWord = new Word(input_console[3])
        if (input_console[2] == "defn") { newWord.printDefinitions() }
        if (input_console[2] == "syn") { newWord.printRelatedWords('synonym') }
        if (input_console[2] == "ant") { newWord.printRelatedWords('antonym') }
        if (input_console[2] == "ex") { newWord.printExamples() }
        else badInput();
    }
        break;
    default: badInput();
}

function badInput() {
    console.log('Invalid input!');
}