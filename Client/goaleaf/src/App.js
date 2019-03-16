import React, { Component } from 'react';
import styles from './App.module.scss';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Navbar />
        <Main />
      </div>
    );
  }
}

export default App;
