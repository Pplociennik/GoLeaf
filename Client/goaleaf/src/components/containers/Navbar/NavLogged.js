import React, { Component } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import './Nav.scss'

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
        <ul className="NavLogged" style={ navStyle }>
            <li><NavLink to='/new-habit' activeStyle={{color: '#57d131' }}>new habit</NavLink></li>
            <li onClick = { this.handleLogOut } ><Link to='/'>log out</Link></li>
        </ul>
    )
  }
}

export default withRouter(NavLogged);
