import React, { Component } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import './Nav.scss'
import Notifications from './../../routes/Notifications/Notifications'

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
        <ul className="nav-logged" style={ navStyle }>
            <li className="nav-item" onClick = { this.props.handleNavElementClicked }><NavLink exact to='/' activeStyle={{color: '#1D976C' }}>my challenges</NavLink></li>
            <li className="nav-item" onClick = { this.props.handleNavElementClicked }><NavLink to='/new-challenge' activeStyle={{color: '#1D976C' }}>new challenge</NavLink></li>
            <li className="nav-item" onClick = { this.props.handleNavElementClicked }><NavLink to='/browse' activeStyle={{color: '#1D976C' }}>browse</NavLink></li>
            <li className="nav-item nav-item-profile" onClick = { this.props.handleNavElementClicked }><NavLink to='/profile' activeStyle={{color: '#1D976C' }}>profile</NavLink><Notifications/></li>
            <li className="nav-item" onClick = { this.props.handleNavElementClicked }><NavLink to='/help' activeStyle={{color: '#1D976C' }}>help</NavLink></li>
            <li className="nav-item" onClick = { this.handleLogOut } ><Link to='/'>log out</Link></li>
        </ul>
    )
  }
}

export default withRouter(NavLogged);
