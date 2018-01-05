const reader = require('pdfreader');
const _ = require('lodash');
const commonWords = require('./commonWords').commonWords;
const sentiment = require('sentiment');
const jsonfile = require('jsonfile');
let userData;

let wordsArr;
const dict = {};
const data = {
    totalWords: 0
};

if (process.argv[2] && process.argv[3]) {
    userData = require('./myData/' + process.argv[3]);
    startParse();
}

function analyzeSentiment(words) {
    let totalWords = 0;
    let totalSentimentWords = 0;
    let totalLength = 0;
    let totalSentiment = 0;
    let modeCounter = {};
    let medianArr = [];

    //Loop through all of the words recorded in the dictionary, get their sentiment values.
    for (var i = 0; i < words.length; i++) {
        const sentimentVal = sentiment(words[i].word).score;
        totalLength += words[i].wordLength;
        totalWords++;

        if (sentimentVal !== 0) {
            if (!modeCounter[sentimentVal]) {
                modeCounter[sentimentVal] = {};
                modeCounter[sentimentVal].val = sentimentVal;
                modeCounter[sentimentVal].total = 0;
            }
            else {
                modeCounter[sentimentVal].total++;
            }
            totalSentiment += sentimentVal;
            totalSentimentWords++;
            medianArr.push(sentimentVal);
        }
    }

    data.averageWordLength = totalLength/totalWords;
    data.averageSentiment = totalSentiment/totalSentimentWords;
    data.modeSentiment = _.toArray(modeCounter).sort((a, b) => {return b.total - a.total})[0].val;
    data.medianSentiment = medianArr.sort((a, b) => { return a - b })[Math.ceil(medianArr.length/2)];
}

function sortData() {
    wordsArr = _.toArray(dict);
    wordsArr.sort((a, b) => {
        return b.count - a.count;
    });
    let top = wordsArr.slice(0, 30);
    data.topWords = top;
    data.differentWords = wordsArr.length;
    analyzeSentiment(wordsArr);
}

function updateDict(word) {
    data.totalWords++;

    if (dict[word]) {
        dict[word].count++;
    }
    else {
        dict[word] = {};
        dict[word].word = word;
        dict[word].wordLength = word.split('').length;
        dict[word].count = 1;
    }
}

function parseText(text) {
    //RegEx to strip special characters out of the text
    const strippedText = text.replace(/[^\w\s]/gi, '');
    //Split the text into an array
    const textArr = strippedText.split(' ');

    //Loop through the array and add to dictionary.
    for (var i = 0; i < textArr.length; i++) {
        let word = textArr[i].toLowerCase();
        if (word && !commonWords[word] && word.split('').length > 2) {
            updateDict(word);
        }
    }
}

function saveData() {
    let finalData = {};
    finalData.analytics = data;
    finalData.bookInfo = userData.bookInfo;
    finalData.coreyData = userData.coreyData;

    jsonfile.writeFile('./bookData/' + userData.bookInfo.title.replace(/ /g, "").replace(/[^\w\s]/gi, '') + '.json', finalData, {spaces: 2}, (err) => {
        if (err) {
            return console.log(err);
        }
        console.log('File has been created');
    });
}

function startParse() {
    new reader.PdfReader().parseFileItems(process.argv[2], function(err, item) {
        if (err) {
            console.log(err);
        }
        else if (!item) {
            sortData();
            saveData();
        }
        else if (item.text) {
            parseText(item.text);
        }
    });
}

