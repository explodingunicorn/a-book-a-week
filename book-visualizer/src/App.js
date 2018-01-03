import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Home from './components/home/home.component';
import Book from './components/book/book.component';
import Nav from './components/nav/nav.component';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="main-container">
          <Nav/>
          <Route exact path="/" component={Home}/>
          <Route path="/book/:bookId" component={Book}/>
        </div>
      </Router>
    );
  }
}

export default App;
