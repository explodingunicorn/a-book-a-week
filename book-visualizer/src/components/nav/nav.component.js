import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './nav.style.css';

class Nav extends Component {
    render() {
        return (
            <div className="nav-container">
                <div className="nav">
                    <Link className="logo-type" to={'/home'}>a book a week</Link>
                    <div></div>
                    <Link to={'/home'}>About</Link>
                    <Link to={'/home'}>Books</Link>
                    <Link to={'/home'}>Conclusions</Link>
                </div>
            </div>
        )
    }
}

export default Nav;