import React, { Component } from 'react';
import BooksData from '../../data/books';

class Home extends Component {
    renderBooks(arr) {
        console.log(arr);
        return arr.map((book) => {
            return <h2>{book.bookInfo.title}</h2>;
        });
    }

    renderBookArray() {
        return BooksData.books.map((bookArray) => {
            console.log(bookArray);
            return (
                <div>
                    <h1>Month here pls</h1>
                    { this.renderBooks(bookArray) }
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <h1>This is the Home Page</h1>
                { this.renderBookArray() }
            </div>
        );
    }
}

export default Home;