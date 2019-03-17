import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './NavNotLogged.module.scss'

class NavNotLogged extends Component {

  render() {
    let navState = this.props.show;

    let navStyle = {
      left: '-100vw'
    }
    if (navState === true) {
       navStyle = {
        left: '0vw'
      };
    }

    return (
        <ul className={styles.NavNotLogged} style={ navStyle }>
            <li onClick = { this.props.handleNavElementClicked } ><Link to='/login'>log in</Link></li>
            <li onClick = { this.props.handleNavElementClicked } ><Link to='/signin'>sign in</Link></li>
        </ul>
    )
  }
}

export default NavNotLogged;
