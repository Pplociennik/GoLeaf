import React, { Component } from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import NavNotLogged from './NavNotLogged';
import NavLogged from './NavLogged';
import Logo from './../../../assets/mobile-logo.png';
import Hamburger from './../../../assets/hamburger.png';
import Close from './../../../assets/close.png';
import { connect } from 'react-redux';

class Navbar extends Component {

  state = {
    showNav: false
  }
  handleHamburger = () => {
    this.state.showNav ? this.setState({showNav: false}) : this.setState({showNav: true});
  }
  handleNavElementClicked = () => {
    this.setState({
      showNav: false
    })
  }

  render() {
    let hamburger = <img src={ Hamburger } alt="hamburger" className="Hamburger" onClick={ this.handleHamburger }></img>
    if(this.state.showNav) {
      hamburger = <img src={ Close } alt="hamburger" className="Hamburger" onClick={ this.handleHamburger }></img>
    }

    let navigation = <NavNotLogged show={ this.state.showNav } handleNavElementClicked = { this.handleNavElementClicked } />
    if(this.props.authenticated){
        navigation = <NavLogged show={ this.state.showNav } handleNavElementClicked = { this.handleNavElementClicked } />
    }
    return (
      <nav className="Navbar">
        <Link to="/" className="LogoWeb" onClick={ this.handleNavElementClicked }>goaleaf</Link>
        <Link to="/" className="LogoMobile" onClick={ this.handleNavElementClicked }><img src={Logo} alt="logo"></img></Link>
        { hamburger }
        { navigation }
      </nav>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated
  }
}

export default connect(mapStateToProps)(Navbar);
