import React, { Component } from 'react';
import Emoji from '../EmojiImport';

// Style
import './styles.scss';

class Footer extends Component {
  render() {
    return (
      <div className='footer-style'>
        <p className='footer-text text-center'>
          Copyright 2020 <br /> Made with <Emoji symbol='❤️' /> by{' '}
          <a href='https://designsundays.in/' className='highlighted-text'>
            Design Sundays
          </a>
        </p>
      </div>
    );
  }
}

export default Footer;
