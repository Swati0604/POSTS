import React from 'react';
import './styles.scss';

const ReadButton = (props) => {
  return (
    <div className='button'>
      <a href={`/job-guide/${props.selectedArticleId}`} className='apply-btn'>
        Read More
      </a>
    </div>
  );
};

export default ReadButton;
