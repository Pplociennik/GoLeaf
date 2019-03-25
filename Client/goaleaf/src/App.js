import React, { Component } from 'react';
import styles from './App.module.scss';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  state = {
    logged: false
  }

  render() {
    return (
      <BrowserRouter>
        <div className={styles.App}>
          <Navbar />
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
