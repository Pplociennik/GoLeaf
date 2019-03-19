import React, { Component } from 'react'
import styles from './Navbar.module.scss'
import { Link } from 'react-router-dom'
import NavNotLogged from './NavNotLogged/NavNotLogged';
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
    return (
      <nav className={styles.Navbar}>
        <Link to="/" className={styles.LogoWeb} onClick={ this.handleNavElementClicked }>goaleaf</Link>
        <Link to="/" className={styles.LogoMobile} onClick={ this.handleNavElementClicked }><img src={Logo} alt="logo"></img></Link>
        { hamburger }
        <NavNotLogged show={ this.state.showNav } handleNavElementClicked = { this.handleNavElementClicked } />
      </nav>
    )
  }
}

export default Navbar;
