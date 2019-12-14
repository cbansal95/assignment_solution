#!/usr/bin/env node

const requestFunctions = require('./request');
const Word = require('./wordClass').Word;
const QuizWord = require('./quizClass').QuizClass;
var readline = require('readline');

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
            startQuiz();
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
        else if (input_console[2] == "syn") { newWord.printRelatedWords('synonym') }
        else if (input_console[2] == "ant") { newWord.printRelatedWords('antonym') }
        else if (input_console[2] == "ex") { newWord.printExamples() }
        else badInput();
    }
        break

    default: badInput();
}

function badInput() {
    console.log('Invalid input!');
}

async function startQuiz() {
    console.log('Starting Quiz')
    let response = await requestFunctions.getRandomWord();
    let quizWord = new QuizWord(response.data.word);
    response = await quizWord.getAllWordData();
    console.log('Your first clue');
    console.log(quizWord.getRandomClue(3))
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    askQues();

    function askQues() {
        rl.question("Guess the word: ", function (answer) {
            if (quizWord.checkRightAnswer(answer)) { console.log("That is correct!"); rl.close() }
            else {
                console.log("Wrong answer!")
                wrongOption();
            }
        });
    }
    function wrongOption() {
        rl.question("Enter 1 to try again, 2 for a hint and 3 to quit: ", function (choice) {
            switch (choice) {
                case "1": askQues(); break;
                case "2": console.log(quizWord.getRandomClue(4)); askQues(); break;
                case "3": {
                    console.log("The Word is :" + quizWord.word)
                    quizWord.printDictionary();
                    rl.close();
                    break;
                }
                default: wrongOption()
            }
        });
    }
}