import React, { Component } from 'react';

// Style
import './styles.scss';

class CitiesCard extends Component {
  render() {
    const { background, city, href, availableJobs } = this.props;
    return (
      <a className='cities-specific-card-style' href={href}>
        <div
          className='city-card'
          style={{ backgroundImage: `url(${background})` }}
        >
          <p className='city'>{city}</p>
          <p className='available-jobs'>{availableJobs} available jobs</p>
          {/* <p className='available-jobs'>{availableJobs} Jobs available</p> */}
        </div>
      </a>
    );
  }
}

export default CitiesCard;
