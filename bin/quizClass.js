const Word = require('./wordClass').Word;
var requestFunctions = require('./request');

class QuizClass extends Word {
    constructor(word) {
        super(word)
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