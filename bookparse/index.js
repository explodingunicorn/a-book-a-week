const reader = require('pdfreader');
const _ = require('lodash');
const commonWords = require('./commonWords').commonWords;
const sentiment = require('sentiment');

let wordsArr;
const dict = {};
const data = {
    totalWords: 0
};

function analyzeSentiment(words) {
    let totalWords = 0;
    let totalSentiment = 0;
    let modeCounter = {};
    let medianArr = [];

    for (var i = 0; i < words.length; i++) {
        const sentimentVal = sentiment(words[i].word).score;

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
            totalWords++;
            medianArr.push(sentimentVal);
        }
    }

    data.averageSentiment = totalSentiment/totalWords;
    data.modeSentiment = _.toArray(modeCounter).sort((a, b) => {return b.total - a.total})[0].val;
    data.medianSentiment = medianArr.sort((a, b) => { return a - b })[Math.ceil(medianArr.length/2)];
}

function sortData() {
    wordsArr = _.toArray(dict);
    wordsArr.sort((a, b) => {
        return b.count - a.count;
    });
    let top20 = wordsArr.slice(0, 20);
    data.topWords = top20;
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
        if (word && !commonWords[word]) {
            updateDict(word);
        }
    }
}

new reader.PdfReader().parseFileItems(process.argv[2], function(err, item) {
    if (err) {
        console.log(err);
    }
    else if (!item) {
        console.log('done');
        sortData();
        console.log(data);
    }
    else if (item.text) {
        parseText(item.text);
    }
});

