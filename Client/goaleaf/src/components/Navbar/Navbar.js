import React, { Component } from 'react'
import styles from './Navbar.module.scss'
import { Link } from 'react-router-dom'
import NavNotLogged from './NavNotLogged/NavNotLogged';
import NavLogged from './NavLogged/NavLogged';
import Logo from './../../assets/mobile-logo.png';
import Hamburger from './../../assets/hamburger.png';
import Close from './../../assets/close.png';

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
    let hamburger = <img src={ Hamburger } alt="hamburger" className={styles.Hamburger} onClick={ this.handleHamburger }></img>
    if(this.state.showNav) {
      hamburger = <img src={ Close } alt="hamburger" className={styles.Hamburger} onClick={ this.handleHamburger }></img>
    }

    let navigation = <NavNotLogged show={ this.state.showNav } handleNavElementClicked = { this.handleNavElementClicked } />
    if(localStorage.getItem('token')){
        navigation = <NavLogged show={ this.state.showNav } handleNavElementClicked = { this.handleNavElementClicked } />
    }
    return (
      <nav className={styles.Navbar}>
        <Link to="/" className={styles.LogoWeb} onClick={ this.handleNavElementClicked }>goaleaf</Link>
        <Link to="/" className={styles.LogoMobile} onClick={ this.handleNavElementClicked }><img src={Logo} alt="logo"></img></Link>
        { hamburger }
        { navigation }
      </nav>
    )
  }
}

export default Navbar;
