import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NavNotLogged.module.scss'

function NavNotLogged() {
  return (
    <nav className={styles.NavNotLogged}>
      <ul>
          <li><Link to='/'>logo</Link></li>
          <li><Link to='/login'>log in</Link></li>
          <li><Link to='/signin'>sign in</Link></li>
      </ul>
    </nav>
  )
}

export default NavNotLogged;
