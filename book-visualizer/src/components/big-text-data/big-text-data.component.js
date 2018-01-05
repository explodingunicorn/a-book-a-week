import React, { Component } from 'react';
import './big-text-data.style.css';

class BigTextData extends Component {
    insertCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        return (
            <div className="big-text-data">
                <h1>{this.insertCommas(this.props.data)}</h1>
                <h3>{this.insertCommas(this.props.description)}</h3>
            </div>
        )
    }
}

export default BigTextData;