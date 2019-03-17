import React, { Component } from 'react'
import styles from './Navbar.module.scss'
import NavNotLogged from './NavNotLogged/NavNotLogged';

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
    
    return (
      <nav className={styles.Navbar}>
        <div>logo</div>
        <div className="Hamburger" onClick={ this.handleHamburger }>X</div>
        <NavNotLogged show={ this.state.showNav } handleNavElementClicked = { this.handleNavElementClicked } />
      </nav>
    )
  }
}

export default Navbar;
