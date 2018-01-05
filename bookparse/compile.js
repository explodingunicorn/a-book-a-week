const fs = require('fs');
const jsonfile = require('jsonfile');
const file = './bookData/';
const monthBookArray = [];
const bookArray = [];

fs.readdir(file, (err, files) => {
    files.forEach(json => {
      addBookDataToArray(jsonfile.readFileSync(file + json));
    });
    createJson();
})

function addBookDataToArray(obj) {
    let spot = obj.coreyData.month - 1;
    if(monthBookArray[spot]) {
        monthBookArray[spot].push(obj);
    }
    else {
        monthBookArray[spot] = [];
        monthBookArray[spot].push(obj);
    }

    bookArray.push(obj);
} 

function compileOverallData() {
    const data = {
        totalWords: 0,
        totalHours: 0,
        averageWords: 0
    }

    for (var i = 0; i < bookArray.length; i++) {
        data.totalWords += bookArray[i].analytics.totalWords;
        data.totalHours += bookArray[i].coreyData.timeToRead;
    }

    data.averageWords = Math.floor(data.totalWords/bookArray.length);
    jsonfile.writeFileSync('../book-visualizer/src/data/overall.json', data);
}

function createJson() {
    let obj = {};
    obj.books = monthBookArray;
    compileOverallData();
    jsonfile.writeFileSync('../book-visualizer/src/data/books.json', obj);
}