import React, { Component } from 'react';

// Style
import './styles.scss';

class ChangelogCards extends Component {
  render() {
    const {
      title,
      description,
      time,
      status,
      personImg,
      name,
      position,
    } = this.props;
    return (
      <div className='changelog-cards-style'>
        <div className='card-content'>
          <p className='heading'>{title}</p>

          <div className='status-time'>
            {status === 'New Feature' && (
              <p className='status new-feature'>New Feature</p>
            )}
            {status === 'Improvement' && (
              <p className='status improvement'>Improvement</p>
            )}

            {status === 'Fix' && <p className='status fix'>Fix</p>}

            <p className='time'>{time}</p>
          </div>

          <pre className='description'>{description}</pre>

          <div className='updater-info'>
            <img src={personImg} className='person-img' alt='person-img' />

            <div className='name-position-info'>
              <p className='name-position name'>{name}</p>
              <p className='name-position position'>
                {position}, Design Sundays
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangelogCards;
