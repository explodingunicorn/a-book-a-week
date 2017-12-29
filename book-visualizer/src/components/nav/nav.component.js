import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './nav.style.css';

class Nav extends Component {
    render() {
        return (
            <div class="nav">
                <Link to={'/home'}>Home</Link>
                <div></div>
                <Link to={'/home'}>About</Link>
                <Link to={'/home'}>Books</Link>
                <Link to={'/home'}>Conclusions</Link>
            </div>
        )
    }
}

export default Nav;