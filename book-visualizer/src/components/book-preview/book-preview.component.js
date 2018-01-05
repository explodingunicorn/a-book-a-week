import React, { Component } from 'react';
import './book-preview.style.css';

class BookPreview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: props.book.bookInfo
        }
    }

    stripText(txt) {
        return txt.replace(/ /g, "").replace(/[^\w\s]/gi, '');
    }

    render() {
        return (
            <div className="book-preview-container">
                <div className="image-container">
                    <img src={'./img/' + this.stripText(this.state.info.title) + '.jpg'}/>
                </div>
                <div className="book-info">
                    <h4 className="highlight"><i>"{ this.state.info.title }"</i></h4>
                    <h4 className="small">by { this.state.info.author }</h4>
                </div>
                <div></div>
                <div>
                    <h2 className="highlight">&raquo;</h2>
                </div>
            </div>
        );
    }
}

export default BookPreview;