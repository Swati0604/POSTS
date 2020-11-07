import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Tabs from '../../components/Tabs';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { withGoogleSheets } from 'react-db-google-sheets';

//Images
import backIcon from '../../assets/images/back-icon.svg';
import notFound from '../../assets/images/not-found.svg';

// Style
import './styles.scss';
import ChangelogCards from '../../components/ChangelogCard';

const tabsData = ['All', 'New Feature', 'Improvement', 'Fix'];

class Changelogs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      visibleAll: 2,
      visibleNewFeature: 2,
      visibleImprovement: 2,
      visibleFix: 2,
      error: false,
      tabIndex: 1,
    };

    this.loadMoreAll = this.loadMoreAll.bind(this);
    this.loadMoreNewFeature = this.loadMoreNewFeature.bind(this);
    this.loadMoreImprovement = this.loadMoreImprovement.bind(this);
    this.loadMoreFix = this.loadMoreFix.bind(this);
  }

  changeTab = (val) => {
    this.setState({
      tabIndex: val,
    });
  };

  loadMoreAll() {
    this.setState((prev) => {
      return { visibleAll: prev.visibleAll + 9 };
    });
  }

  loadMoreNewFeature() {
    this.setState((prev) => {
      return { visibleNewFeature: prev.visibleNewFeature + 2 };
    });
  }

  loadMoreImprovement() {
    this.setState((prev) => {
      return { visibleImprovement: prev.visibleImprovement + 2 };
    });
  }

  loadMoreFix() {
    this.setState((prev) => {
      return { visibleFix: prev.visibleFix + 2 };
    });
  }

  render() {
    const { tabIndex } = this.state;
    return (
      <div className='changelogs-page-style'>
        <div className='all-page-style'>
          <div className='header-banner-style'>
            <Header currentPage={'changelogs'} />

            <div className='top-section'>
              <Link to='/' className='back-btn'>
                <img
                  src={backIcon}
                  className='back-btn-icon'
                  alt='back-btn-icon'
                />
                Back to Job Listings
              </Link>
            </div>

            <div className='text-tab-section'>
              <div className='text-box'>
                <h5 class='heading'>Changelog</h5>
                <p className='para'>
                  Match is constantly evolving. You can see the new updates here
                  👇🏻
                </p>
              </div>
              <Tabs
                tabsData={tabsData}
                tabIndex={tabIndex}
                changeTab={this.changeTab}
              />
            </div>
          </div>

          <div className='change-logs-section'>
            <div className='cards-container'>
              <div className='row'>
                {tabIndex === 1 &&
                  this.props.db &&
                  this.props.db.Changelogs &&
                  this.props.db.Changelogs.slice(0, this.state.visibleAll).map(
                    (data, index) => {
                      return (
                        <div className='col-md-7' key={index}>
                          <div className='cards'>
                            <ChangelogCards
                              title={data.Title}
                              description={data.Description}
                              name={data.Updater}
                              position={data.Position}
                              personImg={data.Image}
                              status={data.Type}
                              time={data.Date}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
              </div>

              {tabIndex === 1 &&
                this.state.visibleAll < this.props.db.Changelogs.length && (
                  <div className='load-more-btn-container'>
                    <button
                      onClick={this.loadMoreAll}
                      type='button'
                      className='load-more'
                    >
                      Load more
                    </button>
                  </div>
                )}

              <div className='null-container'>
                {tabIndex === 1 &&
                  this.props.db.Changelogs.length === 0 &&
                  this.state.visibleFix < this.props.db.Changelogs.length && (
                    <p className='null-text'>
                      We will soon update Jobs too, stay tuned.
                    </p>
                  )}
              </div>

              <div className='row'>
                {tabIndex === 2 &&
                  this.props.db &&
                  this.props.db.Changelogs &&
                  this.props.db.Changelogs.filter(
                    (data) => data.Type === 'New Feature'
                  )
                    .slice(0, this.state.visibleNewFeature)
                    .map((data, index) => {
                      return (
                        <div className='col-md-7' key={index}>
                          <div className='cards'>
                            <ChangelogCards
                              title={data.Title}
                              description={data.Description}
                              name={data.Updater}
                              position={data.Position}
                              personImg={data.Image}
                              status={data.Type}
                              time={data.Date}
                            />
                          </div>
                        </div>
                      );
                    })}
              </div>

              {tabIndex === 2 &&
                this.state.visibleNewFeature <
                  this.props.db.Changelogs.length && (
                  <div className='load-more-btn-container'>
                    <button
                      onClick={this.loadMoreNewFeature}
                      type='button'
                      className='load-more'
                    >
                      Load more
                    </button>
                  </div>
                )}

              <div className='null-container'>
                {tabIndex === 2 &&
                  this.props.db.Changelogs.filter(
                    (data) => data.Type === 'New Feature'
                  ).length === 0 &&
                  this.state.visibleFix < this.props.db.Changelogs.length && (
                    <p className='null-text'>
                      We will soon update New Features soon, stay tuned
                    </p>
                  )}
              </div>

              <div className='row'>
                {tabIndex === 3 &&
                  this.props.db &&
                  this.props.db.Changelogs &&
                  this.props.db.Changelogs.filter(
                    (data) => data.Type === 'Improvement'
                  )
                    .slice(0, this.state.visibleImprovement)
                    .map((data, index) => {
                      return (
                        <div className='col-md-7' key={index}>
                          <div className='cards'>
                            <ChangelogCards
                              title={data.Title}
                              description={data.Description}
                              name={data.Updater}
                              position={data.Position}
                              personImg={data.Image}
                              status={data.Type}
                              time={data.Date}
                            />
                          </div>
                        </div>
                      );
                    })}
              </div>

              {tabIndex === 3 &&
                this.props.db.Changelogs.filter(
                  (data) => data.Type === 'Improvement'
                ).length > 9 &&
                this.state.visibleImprovement <
                  this.props.db.Changelogs.length && (
                  <div className='load-more-btn-container'>
                    <button
                      onClick={this.loadMoreImprovement}
                      type='button'
                      className='load-more'
                    >
                      Load more
                    </button>
                  </div>
                )}

              <div className='null-container'>
                {tabIndex === 3 &&
                  this.props.db.Changelogs.filter(
                    (data) => data.Type === 'Improvement'
                  ).length === 0 && (
                    <div class='null-type-container'>
                      <img
                        src={notFound}
                        alt='not-found'
                        className='null-image'
                      />
                      <p className='null-heading'>
                        Sorry! We don't have Improvements right now.
                      </p>
                      <p className='null-text'>
                        Check back in some time. We will update version 2 soon{' '}
                        <br />
                        So, finger crossed 🤞.
                      </p>
                    </div>
                  )}
              </div>

              <div className='row'>
                {tabIndex === 4 &&
                  this.props.db &&
                  this.props.db.Changelogs &&
                  this.props.db.Changelogs.filter((data) => data.Type === 'Fix')
                    .slice(0, this.state.visibleFix)
                    .map((data, index) => {
                      return (
                        <div className='col-md-7' key={index}>
                          <div className='cards'>
                            <ChangelogCards
                              title={data.Title}
                              description={data.Description}
                              name={data.Updater}
                              position={data.Position}
                              personImg={data.Image}
                              status={data.Type}
                              time={data.Date}
                            />
                          </div>
                        </div>
                      );
                    })}
              </div>

              {tabIndex === 4 &&
                this.props.db.Changelogs.filter((data) => data.Type === 'Fix')
                  .length > 9 &&
                this.state.visibleFix < this.props.db.Changelogs.length && (
                  <div className='load-more-btn-container'>
                    <button
                      onClick={this.loadMoreFix}
                      type='button'
                      className='load-more'
                    >
                      Load more
                    </button>
                  </div>
                )}

              <div className='null-container'>
                {tabIndex === 4 &&
                  this.props.db.Changelogs.filter((data) => data.Type === 'Fix')
                    .length === 0 && (
                    <div class='null-type-container'>
                      <img
                        src={notFound}
                        alt='not-found'
                        className='null-image'
                      />
                      <p className='null-heading'>
                        Sorry! We don't have Fixes right now.
                      </p>
                      <p className='null-text'>
                        Check back in some time. We will update version 2 soon{' '}
                        <br />
                        So, finger crossed 🤞.
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>

          <div className='footer-section'>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default withGoogleSheets('Changelogs')(Changelogs);
