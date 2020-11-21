import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Header from '../../components/header';
import Footer from '../../components/footer';
import JobGuideCard from '../../components/JobGuideCard';
import Cards from '../../components/Cards';
import Tabs from '../../components/Tabs';
import { withGoogleSheets } from 'react-db-google-sheets';

//Images
import backIcon from '../../assets/images/back-icon.svg';
import notFound from '../../assets/images/not-found.svg';

// Style
import './styles.scss';

const tabsData = ['All', 'Full Time', 'Internship', 'Freelance'];

const options = {
  margin: 30,
  nav: true,
  loop: true,
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

class CitiesJobs extends Component {
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
  }

  changeTab = (val) => {
    this.setState({
      tabIndex: val,
    });
  };

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

  render() {
    const { tabIndex, isMobile } = this.state;
    const city = this.props.match.params.id;

    console.log(city);
    return (
      <div className='city-jobs-page-style' ref={this.myRef}>
        <Helmet>
          <meta
            charSet='utf-8'
            name='description'
            content='Match By Design Sundays'
          />
          <title>Jobs in {city} | Match By Design Sundays</title>
        </Helmet>
        <div class='all-page-style'>
          <div class='header-banner-style'>
            <Header />

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
          </div>

          <div className='background-container'>
            <div className='job-post-section'>
              <div className='cards-container'>
                <div className='cards-top-section'>
                  <div className='text-box'>
                    <h5 className='post-heading'>
                      Jobs in <span className='city-text'>{city}</span>
                    </h5>
                    <p className='post-info-para'>
                      See all the exciting jobs in{' '}
                      <span className='city-text'>{city}</span> 👇🏻
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
                    this.props.db.Sheet1.filter(
                      (data) =>
                        data.Location.toUpperCase() === city.toUpperCase()
                    )
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
                                experience={data.Experience}
                                href={data.Link}
                              />
                            </div>
                          </div>
                        );
                      })}
                </div>

                {tabIndex === 1 &&
                  this.props.db.Sheet1.filter(
                    (data) => data.Location.toUpperCase() === city.toUpperCase()
                  ).length > 9 &&
                  this.state.visibleAll <
                    this.props.db.Sheet1.filter(
                      (data) =>
                        data.Location.toUpperCase() === city.toUpperCase()
                    ).length && (
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
                    this.props.db.Sheet1.filter(
                      (data) =>
                        data.Location.toUpperCase() === city.toUpperCase()
                    ).length === 0 &&
                    this.state.visibleAll < this.props.db.Sheet1.length && (
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
                    this.props.db.Sheet1.filter(
                      (data) =>
                        (data.JobType === 'Full Time' ||
                          data.JobType ===
                            'Full Time, Work from Home (Remote)') &&
                        data.Location.toUpperCase() === city.toUpperCase()
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
                                experience={data.Experience}
                                href={data.Link}
                              />
                            </div>
                          </div>
                        );
                      })}
                </div>

                <div className='null-container'>
                  {tabIndex === 2 &&
                    this.props.db.Sheet1.filter(
                      (data) =>
                        data.Location.toUpperCase() === city.toUpperCase() &&
                        (data.JobType === 'Full Time' ||
                          data.JobType === 'Full Time, Work from Home (Remote)')
                    ).length === 0 &&
                    this.state.visibleFullTime <
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

                {tabIndex === 2 &&
                  this.props.db.Sheet1.filter(
                    (data) =>
                      (data.JobType === 'Full Time' ||
                        data.JobType ===
                          'Full Time, Work from Home (Remote)') &&
                      data.Location.toUpperCase() === city.toUpperCase()
                  ).length > 9 &&
                  this.state.visibleFullTime <
                    this.props.db.Sheet1.filter(
                      (data) =>
                        (data.JobType === 'Full Time' ||
                          data.JobType ===
                            'Full Time, Work from Home (Remote)') &&
                        data.Location.toUpperCase() === city.toUpperCase()
                    ).length && (
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

                {/* Internship Flow Start from Here */}

                <div className='row'>
                  {tabIndex === 3 &&
                    this.props.db &&
                    this.props.db.Sheet1 &&
                    this.props.db.Sheet1.filter(
                      (data) =>
                        data.JobType === 'Internship' &&
                        data.Location.toUpperCase() === city.toUpperCase()
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
                    (data) =>
                      data.JobType === 'Internship' &&
                      data.Location.toUpperCase() === city.toUpperCase()
                  ).length > 9 &&
                  this.state.visibleInternship <
                    this.props.db.Sheet1.filter(
                      (data) =>
                        data.JobType === 'Internship' &&
                        data.Location.toUpperCase() === city.toUpperCase()
                    ).length && (
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
                      (data) =>
                        data.JobType === 'Internship' &&
                        data.Location.toUpperCase() === city.toUpperCase()
                    ).length === 0 &&
                    this.state.visibleFreelance <
                      this.props.db.Sheet1.filter(
                        (data) =>
                          data.JobType === 'Internship' &&
                          data.Location.toUpperCase() === city.toUpperCase()
                      ).length && (
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

                {/* Freelance Flow Start from Here */}

                <div className='row'>
                  {tabIndex === 4 &&
                    this.props.db &&
                    this.props.db.Sheet1 &&
                    this.props.db.Sheet1.filter(
                      (data) =>
                        data.JobType === 'Freelance' &&
                        data.Location.toUpperCase() === city.toUpperCase()
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
                    (data) =>
                      data.JobType === 'Freelance' &&
                      data.Location.toUpperCase() === city.toUpperCase()
                  ).length > 9 &&
                  this.state.visibleFreelance <
                    this.props.db.Sheet1.filter(
                      (data) =>
                        data.JobType === 'Freelance' &&
                        data.Location.toUpperCase() === city.toUpperCase()
                    ).length && (
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
        </div>

        <div className='job-guide-section'>
          <div className='job-guide-container'>
            <div className='text-box'>
              <h5 className='post-heading'>Other helpful guides</h5>
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
                              selectedArticleId={data.ID}
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
              Building an extensive knowledge base to help to make the most out
              of opportunities.{' '}
              <span className='coming-soon'>Coming Soon 😉</span>
            </p>

            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default withGoogleSheets(['Sheet1', 'Guide'])(CitiesJobs);
