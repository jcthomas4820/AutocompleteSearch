import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import AutoCompleteText from './AutoCompleteText'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>ACCC KB Search</h1>
        <div className="App-Component">
            <div className = "App-Component">
                <AutoCompleteText />                
            </div>
        </div>
      </div>
    );
  }
}

export default App;
