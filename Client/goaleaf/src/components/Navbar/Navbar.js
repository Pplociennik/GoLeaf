import React, { Component } from 'react'
import styles from './Navbar.module.scss'
import NavNotLogged from './NavNotLogged/NavNotLogged';

class Navbar extends Component {
  render() {
    return (
      <div className={styles.Navbar}>
        <NavNotLogged />
      </div>
    )
  }
}

export default Navbar;
