const fs = require('fs');
const jsonfile = require('jsonfile');
const file = './bookData/';
const bookArray = [];

fs.readdir(file, (err, files) => {
    files.forEach(json => {
      addBookDataToArray(jsonfile.readFileSync(file + json));
    });
    createJson();
})

function addBookDataToArray(obj) {
    let spot = obj.coreyData.month - 1;
    if(bookArray[spot]) {
        bookArray[spot].push(obj);
    }
    else {
        bookArray[spot] = [];
        bookArray[spot].push(obj);
    }
} 

function createJson() {
    let obj = {};
    obj.books = bookArray;
    jsonfile.writeFileSync('../book-visualizer/src/data/books.json', obj);
}