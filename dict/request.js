const axios = require('axios');
const apiKey = "b972c7ca44dda72a5b482052b1f5e13470e01477f3fb97c85d5313b3c112627073481104fec2fb1a0cc9d84c2212474c0cbe7d8e59d7b95c7cb32a1133f778abd1857bf934ba06647fda4f59e878d164";
const apihost = 'https://fourtytwowords.herokuapp.com';

const getDefinitions = (word) => {
    try {
        return axios.get(apihost + `/word/${word}/definitions?api_key=${apiKey}`)
    }
    catch{
        console.log('Network error');
    }
}
const getExamples = (word) => {
    try {
        return axios.get(apihost + `/word/${word}/examples?api_key=${apiKey}`)
    }
    catch{
        console.log('Network error');
    }
}
const getRelatedWords = (word) => {
    try {
        return axios.get(apihost + `/word/${word}/relatedWords?api_key=${apiKey}`)
    }
    catch{
        console.log('Network error');
    }
}
const getRandomWord = () => {
    try {
        return axios.get(apihost + `/words/randomWord?api_key=${apiKey}`)
    }
    catch{
        console.log('Network error');
    }
}
module.exports = { getDefinitions, getExamples, getRelatedWords, getRandomWord }