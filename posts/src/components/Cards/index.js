import React, { Component } from 'react';
import experienceIcon from '../../assets/images/experience-icon.svg';
import locationIcon from '../../assets/images/location.svg';
import jobTypeIcon from '../../assets/images/job-type.svg';

// Style
import './styles.scss';

class Cards extends Component {
  render() {
    const {
      position,
      company,
      jobType,
      experience,
      location,
      href,
      companyImg,
    } = this.props;
    return (
      <div className='job-cards-style'>
        <div className='image-container'>
          <img
            alt='rectangle4'
            className='company-img img-fluid'
            src={companyImg}
          />
        </div>
        <div className='card-content'>
          <p className='heading'>{position}</p>
          <p className='company-name'>{company}</p>
          <div className='icons-text'>
            <img alt='icons' className='icons' src={jobTypeIcon} />
            <p className='requirement'>{jobType}</p>
          </div>
          <div className='icons-text'>
            <img alt='icons' className='icons' src={locationIcon} />
            <p className='requirement'>{location}</p>
          </div>
          <div className='icons-text'>
            <img alt='icons' className='icons' src={experienceIcon} />
            <p className='requirement'>{experience}</p>
          </div>
          <a className='apply-btn' href={href} target='_blank' rel='noreferrer'>
            Apply Now
          </a>
        </div>
      </div>
    );
  }
}

export default Cards;
