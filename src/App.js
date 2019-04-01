import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Pianta from './Pianta.js';
import Header from './Header.js';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Header></Header>
		<br />
		<Pianta></Pianta>
		<br />
		<footer></footer>
      </div>
    );
  }
}

export default App;
