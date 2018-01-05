import React, { Component } from 'react';
import BigTextData from '../big-text-data/big-text-data.component';
import BookPreview from '../book-preview/book-preview.component';
import './home.style.css';

import BooksData from '../../data/books';
import overallData from '../../data/overall';
import Months from '../../data/months';

class Home extends Component {
    renderBooks(arr) {
        return arr[arr.length-1].map((book) => {
            return <BookPreview book={book}/>;
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
            <div className="main-container">
                <div className="full-width sample-data">
                    <BigTextData data={overallData.totalWords} description="Total Words Read"/>
                    <BigTextData data={overallData.averageWords} description="Words Read per Week"/>
                    <BigTextData data={overallData.totalHours} description="Hours of Reading"/>
                </div>
                <h2>Read in { Months[BooksData.books.length-1] }:</h2>
                { this.renderBooks(BooksData.books) }
            </div>
        );
    }
}

export default Home;