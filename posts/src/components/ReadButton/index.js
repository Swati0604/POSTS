import React from 'react';
import { withRouter } from 'react-router-dom';
import './styles.scss';

const ReadButton = (props) => {
  return (
    <div className='button'>
      <button
        onClick={() =>
          props.history.push(`/job-guide/${props.selectedArticleId}`)
        }
        className='apply-btn'
      >
        Read More
      </button>
    </div>
  );
};

export default withRouter(ReadButton);
