import React, { Component } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import styles from './NavLogged.module.scss'

class NavLogged extends Component {

    handleLogOut = () => {
        localStorage.removeItem('token');
        this.props.handleNavElementClicked();
        window.location.reload();
    }
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
            <li onClick = { this.handleLogOut } ><Link to='/'>log out</Link></li>
        </ul>
    )
  }
}

export default withRouter(NavLogged);
