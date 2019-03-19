import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
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
            <li onClick = { this.props.handleNavElementClicked } ><NavLink to='/login' activeStyle={{color: '#5DAD1D' }}>log in</NavLink></li>
            <li onClick = { this.props.handleNavElementClicked } ><NavLink to='/signin' activeStyle={{color: '#5DAD1D' }}>sign in</NavLink></li>
        </ul>
    )
  }
}

export default NavNotLogged;
