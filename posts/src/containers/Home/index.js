import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Cards from '../../components/Cards';
import Tabs from '../../components/Tabs';
import Header from '../../components/header';
import Footer from '../../components/footer';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import CitiesCard from '../../components/CitiesCard';
import JobGuideCard from '../../components/JobGuideCard';
import { withGoogleSheets } from 'react-db-google-sheets';
import PropTypes from 'prop-types';

//Images
import notFound from '../../assets/images/not-found.svg';
import bangalore from '../../assets/images/Bangalore.svg';
import delhi from '../../assets/images/Delhi.svg';
import mumbai from '../../assets/images/Mumbai.svg';
import hyderabad from '../../assets/images/Hyderabad.svg';

// Style
import './styles.scss';

const tabsData = ['All', 'Full Time', 'Internship', 'Freelance'];
const cities = [
  {
    background: delhi,
    city: 'Delhi',
  },

  {
    background: hyderabad,
    city: 'Hyderabad',
  },

  {
    background: mumbai,
    city: 'Mumbai',
  },

  {
    background: bangalore,
    city: 'Bangalore',
  },
];

const options = {
  margin: 30,
  nav: true,
  dots: false,
  autoplay: false,
  navText: [
    "<div class='nav-btn prev-slide'></div>",
    "<div class='nav-btn next-slide'></div>",
  ],
  smartSpeed: 1000,
  responsive: {
    0: {
      items: 1,
    },
    400: {
      items: 1,
    },
    600: {
      items: 2,
    },
    700: {
      items: 3,
    },
    1000: {
      items: 3,
    },
  },
};

const screenWidth = window.innerWidth;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      visibleAll: 9,
      visibleFullTime: 9,
      visibleInternship: 9,
      visibleFreelance: 9,
      error: false,
      tabIndex: 1,
      isMobile: false,
    };

    this.loadMoreAll = this.loadMoreAll.bind(this);
    this.loadMoreFullTime = this.loadMoreFullTime.bind(this);
    this.loadMoreInternship = this.loadMoreInternship.bind(this);
    this.loadMoreFreelance = this.loadMoreFreelance.bind(this);
    this.increaseCount = this.increaseCount.bind(this);
  }

  componentDidMount() {
    this.checkViewportType();

    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
  }

  resize = () => {
    this.setState({ isMobile: window.innerWidth < 768 });
  };

  checkViewportType = () => {
    this.setState({
      isMobile: screenWidth > 768 ? false : true,
    });
  };

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

  loadMoreFullTime() {
    this.setState((prev) => {
      return { visibleFullTime: prev.visibleFullTime + 9 };
    });
  }

  loadMoreInternship() {
    this.setState((prev) => {
      return { visibleInternship: prev.visibleInternship + 9 };
    });
  }

  loadMoreFreelance() {
    this.setState((prev) => {
      return { visibleFreelance: prev.visibleFreelance + 9 };
    });
  }

  increaseCount() {
    this.setState((prev) => {
      return { count: prev.count + 1 };
    });
  }

  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  render() {
    const { tabIndex, isMobile } = this.state;

    return (
      <div className='home-page-style' ref={this.myRef}>
        <Helmet>
          <meta
            charSet='utf-8'
            name='description'
            content='Match By Design Sundays'
          />
          <title>Match By Design Sundays</title>
        </Helmet>
        <div className='all-page-style'>
          <div className='header-banner-style'>
            <Header />

            <div className='text-box'>
              <p className='status-card'>Early Access</p>
              <h1 className='heading'>
                Your destination for handpicked Design Jobs
              </h1>

              <p className='para'>
                Subscribe to get weekly job updates and guides.
              </p>
            </div>

            <form
              action='https://gmail.us2.list-manage.com/subscribe/post?u=bf4ceef24090facb1db2bfd80&amp;id=d85073e06f'
              method='post'
              id='mc-embedded-subscribe-form'
              name='mc-embedded-subscribe-form'
              className='validate'
              target='_blank'
            >
              <div className='register-box' id='mc_embed_signup'>
                <input
                  type='email'
                  placeholder='Your email address please'
                  name='EMAIL'
                  className='register-input'
                  id='mce-EMAIL'
                />

                <button
                  className='register-btn'
                  type='submit'
                  value='Subscribe'
                  name='subscribe'
                  id='mc-embedded-subscribe'
                >
                  Subscribe Now
                  <br />
                  <span className='btn-span-text'>and join 800+ Designers</span>
                </button>
              </div>
            </form>
          </div>

          {/* <div className='update-info-container'>
          <p className='update-info'>🎉 Updating New Jobs in 4:00:00 Hrs</p>
        </div> */}

          <div className='job-specific-cities-section'>
            <div className='cards-container'>
              <div className='cards-top-section'>
                <div className='text-box'>
                  <h2 className='post-heading'>Jobs by Location</h2>
                  <p className='post-info-para'>
                    Find jobs by your favourite city
                  </p>
                </div>
              </div>

              <div className='row'>
                {cities.map((data, index) => {
                  return (
                    <div className='col-md-3' key={data}>
                      <div className='cities-cards'>
                        <CitiesCard
                          background={data.background}
                          city={data.city}
                          availableJobs={
                            this.props.db.Sheet1.filter(
                              (item) => item.Location === data.city
                            ).length
                          }
                          href={`/city/${data.city}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className='background-container'>
            <div className='job-post-section'>
              <div className='cards-container'>
                <div className='cards-top-section'>
                  <div className='text-box'>
                    <h2 className='post-heading'>Job Posts</h2>
                    <p className='post-info-para'>
                      <span className='highlighted-text'>
                        {this.props.db.Sheet1.length}+ Design Jobs
                      </span>{' '}
                      are available, apply now.
                    </p>

                    <p className='post-info-para'>
                      Last updated on{' '}
                      <span className='highlighted-text'>
                        {
                          this.props.db.Sheet1.map(
                            (data, index) => data.Timestamp
                          )
                            .sort()
                            .reverse()[1]
                        }
                      </span>
                    </p>
                  </div>

                  <Tabs
                    tabsData={tabsData}
                    tabIndex={tabIndex}
                    changeTab={this.changeTab}
                  />
                </div>

                <div className='row'>
                  {tabIndex === 1 &&
                    this.props.db &&
                    this.props.db.Sheet1 &&
                    this.shuffle(this.props.db.Sheet1) &&
                    this.props.db.Sheet1.filter((data) => data.Closed !== 'Yes')
                      .slice(0, this.state.visibleAll)
                      .map((data, index) => {
                        return (
                          <div className='col-md-4' key={index}>
                            <div className='cards'>
                              <Cards
                                companyImg={data.Logo}
                                position={data.Position}
                                company={data.Company}
                                jobType={data.JobType}
                                location={data.Location}
                                experience={data.Experience}
                                isRemote={data.Remote}
                                href={data.Link}
                              />
                            </div>
                          </div>
                        );
                      })}
                </div>

                {tabIndex === 1 &&
                  this.state.visibleAll < this.props.db.Sheet1.length && (
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
                    this.props.db.Sheet1.length === 0 &&
                    this.state.visibleFreelance <
                      this.props.db.Sheet1.length && (
                      <div class='null-type-container'>
                        <img
                          src={notFound}
                          alt='not-found'
                          className='null-image'
                        />
                        <p className='null-heading'>
                          Sorry! We couldn’t find anything here.
                        </p>
                        <p className='null-text'>
                          Check back in some time. It’s a good thing we update
                          the jobs twice a week. <br />
                          So, finger crossed 🤞.
                        </p>
                      </div>
                    )}
                </div>

                <div className='row'>
                  {tabIndex === 2 &&
                    this.props.db &&
                    this.props.db.Sheet1 &&
                    this.shuffle(this.props.db.Sheet1) &&
                    this.props.db.Sheet1.filter(
                      (data) =>
                        data.JobType === 'Full Time' ||
                        data.JobType === 'Full Time, Work from Home (Remote)'
                    )
                      .slice(0, this.state.visibleFullTime)
                      .map((data, index) => {
                        return (
                          <div className='col-md-4' key={index}>
                            <div className='cards'>
                              <Cards
                                companyImg={data.Logo}
                                position={data.Position}
                                company={data.Company}
                                jobType={data.JobType}
                                location={data.Location}
                                experience={data.Experience}
                                href={data.Link}
                              />
                            </div>
                          </div>
                        );
                      })}
                </div>

                {tabIndex === 2 &&
                  this.props.db.Sheet1.filter(
                    (data) =>
                      data.JobType === 'Full Time' ||
                      data.JobType === 'Full Time, Work from Home (Remote)'
                  ).length > 9 &&
                  this.state.visibleFullTime < this.props.db.Sheet1.length && (
                    <div className='load-more-btn-container'>
                      <button
                        onClick={this.loadMoreFullTime}
                        type='button'
                        className='load-more'
                      >
                        Load more
                      </button>
                    </div>
                  )}

                <div className='null-container'>
                  {tabIndex === 2 &&
                    this.props.db.Sheet1.filter(
                      (data) =>
                        data.JobType === 'Full Time' ||
                        data.JobType === 'Full Time, Work from Home (Remote)'
                    ).length === 0 &&
                    this.state.visibleFreelance <
                      this.props.db.Sheet1.length && (
                      <div class='null-type-container'>
                        <img
                          src={notFound}
                          alt='not-found'
                          className='null-image'
                        />
                        <p className='null-heading'>
                          Sorry! We couldn’t find anything here.
                        </p>
                        <p className='null-text'>
                          Check back in some time. It’s a good thing we update
                          the jobs twice a week. <br />
                          So, finger crossed 🤞.
                        </p>
                      </div>
                    )}
                </div>

                <div className='row'>
                  {tabIndex === 3 &&
                    this.props.db &&
                    this.props.db.Sheet1 &&
                    this.shuffle(this.props.db.Sheet1) &&
                    this.props.db.Sheet1.filter(
                      (data) => data.JobType === 'Internship'
                    )
                      .slice(0, this.state.visibleInternship)
                      .map((data, index) => {
                        return (
                          <div className='col-md-4' key={index}>
                            <div className='cards'>
                              <Cards
                                companyImg={data.Logo}
                                position={data.Position}
                                company={data.Company}
                                jobType={data.JobType}
                                location={data.Location}
                                experience={data.Experience}
                                href={data.Link}
                              />
                            </div>
                          </div>
                        );
                      })}
                </div>

                {tabIndex === 3 &&
                  this.props.db.Sheet1.filter(
                    (data) => data.JobType === 'Internship'
                  ).length > 9 &&
                  this.state.visibleInternship <
                    this.props.db.Sheet1.length && (
                    <div className='load-more-btn-container'>
                      <button
                        onClick={this.loadMoreInternship}
                        type='button'
                        className='load-more'
                      >
                        Load more
                      </button>
                    </div>
                  )}

                <div className='null-container'>
                  {tabIndex === 3 &&
                    this.props.db.Sheet1.filter(
                      (data) => data.JobType === 'Internship'
                    ).length === 0 &&
                    this.state.visibleFreelance <
                      this.props.db.Sheet1.length && (
                      <div class='null-type-container'>
                        <img
                          src={notFound}
                          alt='not-found'
                          className='null-image'
                        />
                        <p className='null-heading'>
                          Sorry! We couldn’t find anything here.
                        </p>
                        <p className='null-text'>
                          Check back in some time. It’s a good thing we update
                          the jobs twice a week. <br />
                          So, finger crossed 🤞.
                        </p>
                      </div>
                    )}
                </div>

                <div className='row'>
                  {tabIndex === 4 &&
                    this.props.db &&
                    this.props.db.Sheet1 &&
                    this.shuffle(this.props.db.Sheet1) &&
                    this.props.db.Sheet1.filter(
                      (data) => data.JobType === 'Freelance'
                    )
                      .slice(0, this.state.visibleFreelance)
                      .map((data, index) => {
                        return (
                          <div className='col-md-4' key={index}>
                            <div className='cards'>
                              <Cards
                                companyImg={data.Logo}
                                position={data.Position}
                                company={data.Company}
                                jobType={data.JobType}
                                location={data.Location}
                                experience={data.Experience}
                                href={data.Link}
                              />
                            </div>
                          </div>
                        );
                      })}
                </div>

                {tabIndex === 4 &&
                  this.props.db.Sheet1.filter(
                    (data) => data.JobType === 'Freelance'
                  ).length > 9 &&
                  this.state.visibleFreelance < this.props.db.Sheet1.length && (
                    <div className='load-more-btn-container'>
                      <button
                        onClick={this.loadMoreFreelance}
                        type='button'
                        className='load-more'
                      >
                        Load more
                      </button>
                    </div>
                  )}

                <div className='null-container'>
                  {tabIndex === 4 &&
                    this.props.db.Sheet1.filter(
                      (data) => data.JobType === 'Freelance'
                    ).length === 0 &&
                    this.state.visibleFreelance <
                      this.props.db.Sheet1.length && (
                      <div class='null-type-container'>
                        <img
                          src={notFound}
                          alt='not-found'
                          className='null-image'
                        />
                        <p className='null-heading'>
                          Sorry! We couldn’t find anything here.
                        </p>
                        <p className='null-text'>
                          Check back in some time. It’s a good thing we update
                          the jobs twice a week. <br />
                          So, finger crossed 🤞.
                        </p>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>

          <div className='job-guide-section'>
            <div className='job-guide-container'>
              <div className='text-box'>
                <h5 className='post-heading'>Job Guide</h5>
                <p className='post-info-para'>
                  A few resources to help you ace your next opportunity
                </p>
              </div>

              <div className='row'>
                {isMobile ? (
                  this.props.db &&
                  this.props.db.Guide &&
                  this.props.db.Guide.map((data, index) => {
                    return (
                      <div className='item' key={index}>
                        <div className='top-space'>
                          <JobGuideCard
                            title={data.Title}
                            articleType='Job Application'
                            readingTime={data.Time}
                            selectedArticleId={data.ID}
                            cardImg={data.Image}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <OwlCarousel className='owl-theme' {...options}>
                    {this.props.db &&
                      this.props.db.Guide &&
                      this.props.db.Guide.map((data, index) => {
                        return (
                          <div className='item' key={index}>
                            <div className='top-space'>
                              <JobGuideCard
                                title={data.Title}
                                articleType='Job Application'
                                readingTime={data.Time}
                                selectedArticleId={data.Slug}
                                cardImg={data.Image}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </OwlCarousel>
                )}
              </div>

              <p className='job-guide-para text-center top-space'>
                Building an extensive knowledge base to help you make the most
                out of opportunities.{' '}
                <span className='coming-soon'>Coming Soon 😉</span>
              </p>

              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  db: PropTypes.shape({
    Sheet1: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default withGoogleSheets(['Sheet1', 'Guide'])(Home);
