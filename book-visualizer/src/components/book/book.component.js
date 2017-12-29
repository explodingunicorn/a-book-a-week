import React, { Component } from 'react';

class Book extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Book here pls: {this.props.match.params.bookId}</h1>
            </div>
        )
    }
}

export default Book;