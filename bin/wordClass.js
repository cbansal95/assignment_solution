var requestFunctions = require('./request');

class Word {
    constructor(word) {
        this.word = word;
        this.definitions = [];
        this.examples = [];
        this.synonyms = [];
        this.antonyms = [];
    }
    printDefinitions() {
        requestFunctions.getDefinitions(this.word).then(
            response => {
                console.log(`Here are some definitions for "${this.word}":`)
                response.data.forEach((element, index) => {
                    console.log((index + 1) + ". " + element.text)
                });
            },
            rejection => { console.log("word definitions not found") }
        );
    }
    printExamples() {
        requestFunctions.getExamples(this.word).then(
            response => {
                console.log(`Here are some examples for "${this.word}":`)
                response.data.examples.forEach((element, index) => {
                    console.log((index + 1) + ". " + element.text)
                });
            },
            rejection => { console.log("word examples not found") }
        );
    }
    printRelatedWords(val) {
        let temp = [];
        requestFunctions.getRelatedWords(this.word).then(
            response => {
                let found = false;
                response.data.forEach((element) => {
                    if (element.relationshipType == val) {
                        found = true;
                        console.log(`Here are some ${val}s for "${this.word}"`)
                        element.words.forEach((element, index) => console.log((index + 1) + ". " + element))
                    }
                })
                if (!found) { console.log(`word ${val}s not found`) }
            },
            rejection => { console.log(`word ${val}s not found`) }
        )
    }
}

module.exports = { Word }