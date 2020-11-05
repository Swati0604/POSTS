import React, { Component } from 'react';
import locationIcon from '../../assets/images/location.svg';
import jobTypeIcon from '../../assets/images/job-type.svg';
// Style
import './styles.scss';
import ReadButton from '../ReadButton';

class JobGuideCard extends Component {
  render() {
    const {
      title,
      articleType,
      readingTime,
      cardImg,
      selectedArticleId,
    } = this.props;
    return (
      <div className='job-guide-cards-style'>
        <div className='image-container'>
          <img
            alt='rectangle4'
            className='company-img img-fluid'
            src={cardImg}
          />
        </div>
        <div className='card-content'>
          <p className='heading'>{title}</p>
          <div className='icons-text'>
            <img alt='icons' className='icons' src={jobTypeIcon} />
            <p className='requirement'>{articleType}</p>
          </div>
          <div className='icons-text'>
            <img alt='icons' className='icons' src={locationIcon} />
            <p className='requirement'>{readingTime}</p>
          </div>

          <ReadButton selectedArticleId={selectedArticleId} />
        </div>
      </div>
    );
  }
}

export default JobGuideCard;
