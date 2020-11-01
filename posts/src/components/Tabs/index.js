import React, { Component } from 'react';
import classnames from 'classnames';

import './styles.scss';

class Tabs extends Component {
  render() {
    const { tabsData, tabIndex, changeTab } = this.props;

    return (
      <div className='tabs'>
        {tabsData &&
          tabsData.map((item, index) => (
            <button
              className={classnames(
                'tab-button',
                tabIndex === index + 1 && 'tab-button-active'
              )}
              onClick={() => changeTab(index + 1)}
              key={index}
            >
              <p className='tab-text'>{item}</p>
            </button>
          ))}
      </div>
    );
  }
}

export default Tabs;
