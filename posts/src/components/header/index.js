import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/Match-Logo.svg';

// Style
import './styles.scss';

class Header extends Component {
  render() {
    return (
      <div className='header-style'>
        <nav class='navbar navbar-expand-lg top-bar'>
          <Link class='navbar-brand' to='/'>
            <img src={logo} className='logo' alt='logo' />
          </Link>
          <button
            class='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span class='navbar-toggler-icon'></span>
          </button>
          <div class='collapse navbar-collapse my-2 my-lg-0'>
            <ul class='navbar-nav ml-auto' id='navbarNav'>
              <li class='nav-item'>
                <Link to='/' class='nav-link'>
                  Changelog
                </Link>
              </li>
              <li class='nav-item'>
                <Link to='/' class='nav-link'>
                  Post a Job
                </Link>
              </li>
              <li class='nav-item'>
                <Link to='/' class='nav-link'>
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
