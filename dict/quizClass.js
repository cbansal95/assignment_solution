const Word = require('./wordClass').Word;
var requestFunctions = require('./request');

class QuizClass extends Word {
    constructor(word) {
        super(word)
        this.invalidAnswer = new Set();
    }
    getRandomClue(val) {
        let temp = Math.floor(Math.random() * (val));
        switch (temp) {
            case 0: return "Definition: " + this.definitions[Math.floor(Math.random() * (this.definitions.length))]
            case 1:
                if (this.antonyms.length != 0) {
                    return "Antonym: " + this.antonyms[Math.floor(Math.random() * (this.antonyms.length))]
                }
                else {

                }
            case 2: {
                let syn = this.synonyms[Math.floor(Math.random() * this.synonyms.length)]
                this.invalidAnswer.add(syn);
                return "Synonym: " + syn;

            }
            case 3: return "Anagram: " +this.getAnagram();
        }
    }
    getAnagram() {
        return this.word.split('').sort(function(){return 0.5-Math.random()}).join('');

    }
    checkRightAnswer(word) {
        console
        if (word == this.word || this.synonyms.includes(word)) {
            if (!this.invalidAnswer.has(word))
                return true
            else
                return false
        } else { return false }
    }

    getAllWordData() {
        let funcComp = new Promise((resolve, reject) => {
            try {
                var defnPromise = requestFunctions.getDefinitions(this.word);
                var relatedWordsPromise = requestFunctions.getRelatedWords(this.word);
                var examplesPromise = requestFunctions.getExamples(this.word);
                Promise.all([defnPromise, relatedWordsPromise, examplesPromise]).then(values => {
                    values[0].data.forEach(element => {
                        this.definitions.push(element.text)
                    });
                    values[2].data.examples.forEach(element => { this.examples.push(element.text) })
                    values[1].data.forEach(element => {
                        if (element.relationshipType = 'synonym') { this.synonyms = element.words }
                        if (element.relationshipType = 'antonym') { this.antonyms = element.words }
                    })
                    resolve();
                }

                )
            }
            catch{
            }
        })
        return funcComp
    }

}

module.exports = { QuizClass }