import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Custom Component
import ContactModal from '../ContactModal';

//Images
import logo from '../../assets/images/Match-Logo.svg';

//Js
import 'bootstrap/js/src/collapse.js';

// Style
import './styles.scss';

class Header extends Component {
  state = {
    showContactModal: false,
    toggleMenuIcon: false,
    activeLink: false,
  };

  isContactModalVisible = () => {
    this.setState({
      showContactModal: !this.state.showContactModal,
    });
  };

  toggleIcon = () => {
    this.setState({
      toggleMenuIcon: !this.state.toggleMenuIcon,
    });
  };

  activeLinkState = () => {
    this.setState({
      activeLink: true,
    });
  };

  render() {
    const { showContactModal } = this.state;
    return (
      <div className='header-style'>
        <nav className='navbar navbar-expand-lg top-bar'>
          <Link className='navbar-brand' to='/'>
            <img src={logo} className='logo' alt='logo' />
          </Link>

          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='true'
            aria-label='Toggle navigation'
          >
            <div
              className={
                this.state.toggleMenuIcon ? 'nav-icon1 open' : 'nav-icon1'
              }
              onClick={() => this.toggleIcon()}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item  status-container'>
                <Link
                  to='/changelogs'
                  className={
                    this.props.currentPage === 'changelogs'
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                >
                  Changelog
                </Link>
              </li>
              <li className='nav-item status-container'>
                <Link to='/' className='nav-link'>
                  Post a Job
                </Link>
                <p className='status'>COMING SOON</p>
              </li>
              <li className='nav-item' onClick={this.isContactModalVisible}>
                <button className='nav-link contact-us-button'>
                  Contact us
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <ContactModal
          isModalVisible={showContactModal}
          handleClose={this.isContactModalVisible}
        />
      </div>
    );
  }
}

export default Header;
