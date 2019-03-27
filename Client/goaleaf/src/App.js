import React, { Component } from 'react';
import './App.scss';
import Navbar from './components/containers/Navbar/Navbar';
import Main from './components/containers/Main/Main';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}


export default App;
