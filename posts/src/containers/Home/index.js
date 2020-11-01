import React, { Component } from 'react';
import Cards from '../../components/Cards';
import Tabs from '../../components/Tabs';
import Header from '../../components/header';
import JobGuideCard from '../../components/JobGuideCard';
import { withGoogleSheets } from 'react-db-google-sheets';
import PropTypes from 'prop-types';

// Style
import './styles.scss';

const tabsData = ['All', 'Full Time', 'Internship', 'Freelance'];

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 1,
    };
  }

  changeTab = (val) => {
    this.setState({
      tabIndex: val,
    });
  };

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { tabIndex } = this.state;
    return (
      <div className='home-page-style'>
        <div class='header-banner-style'>
          <Header />

          <div class='text-box'>
            <p className='status-card'>Early Access</p>
            <h5 class='heading'>Your destination for handpicked Design Jobs</h5>

            <p class='para'>
              Register to get exclusive information and job letter
            </p>
          </div>
          <div className='register-box'>
            <input
              type='text'
              placeholder='Enter your Email address'
              className='register-input'
            />
            <button className='register-btn'>
              Register Now
              <br />
              <span className='btn-span-text'>and join 800+ Designers</span>
            </button>
          </div>
        </div>

        {/* <div className='update-info-container'>
          <p className='update-info'>🎉 Updating New Jobs in 4:00:00 Hrs</p>
        </div> */}

        <div className='cards-container'>
          <div className='cards-top-section'>
            <div className='text-box'>
              <h5 className='post-heading'>Job Posts</h5>
              <p className='post-info-para'>
                <span className='highlighted-text'>
                  {this.props.db.Sheet1.length}+ Design Jobs
                </span>{' '}
                are available to apply for right now.
              </p>
              <p className='post-info-para'>
                Last updated on{' '}
                {this.props.db.Sheet1.map(
                  (data, index) =>
                    index === this.props.db.Sheet1.length - 1 && (
                      <span className='highlighted-text' key={index}>
                        {data.Timestamp}
                      </span>
                    )
                )}
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
              this.props.db.Sheet1.map((data, index) => {
                return (
                  <div className='col-md-4'>
                    <div className='cards'>
                      <Cards
                        companyImg={data.Logo}
                        position={data.Position}
                        company={data.Company}
                        jobType={data.JobType}
                        location={data.Location}
                        experience={data.Experience}
                        href={data.LinkToApply}
                      />
                    </div>
                  </div>
                );
              })}

            {tabIndex === 2 &&
              this.props.db &&
              this.props.db.Sheet1 &&
              this.props.db.Sheet1.filter(
                (data) => data.JobType === 'Full Time'
              ).map((data) => {
                return (
                  <div className='col-md-4'>
                    <div className='cards'>
                      <Cards
                        companyImg={data.Logo}
                        position={data.Position}
                        company={data.Company}
                        jobType={data.JobType}
                        location={data.Location}
                        experience={data.Experience}
                        href={data.LinkToApply}
                      />
                    </div>
                  </div>
                );
              })}

            {tabIndex === 3 &&
              this.props.db &&
              this.props.db.Sheet1 &&
              this.props.db.Sheet1.filter(
                (data) => data.JobType === 'Internship'
              ).map((data) => {
                return (
                  <div className='col-md-4'>
                    <div className='cards'>
                      <Cards
                        companyImg={data.Logo}
                        position={data.Position}
                        company={data.Company}
                        jobType={data.JobType}
                        location={data.Location}
                        experience={data.Experience}
                        href={data.LinkToApply}
                      />
                    </div>
                  </div>
                );
              })}

            {tabIndex === 4 &&
              this.props.db &&
              this.props.db.Sheet1 &&
              this.props.db.Sheet1.filter(
                (data) => data.JobType === 'Freelance'
              ).map((data) => {
                return (
                  <div className='col-md-4'>
                    <div className='cards'>
                      <Cards
                        companyImg={data.Logo}
                        position={data.Position}
                        company={data.Company}
                        jobType={data.JobType}
                        location={data.Location}
                        experience={data.Experience}
                        href={data.LinkToApply}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className='job-guide-container'>
          <div className='text-box'>
            <h5 className='post-heading'>Job Guide</h5>
            <p className='post-info-para'>
              A few resources to help you ace your next opportunity
            </p>
          </div>

          <div className='row'>
            {this.props.db &&
              this.props.db.Guide &&
              this.props.db.Guide.map((data, index) => {
                return (
                  <div className='col-md-4'>
                    <div className='top-space'>
                      <JobGuideCard
                        title={data.Title}
                        articleType='Job Application'
                        readingTime={data.Time}
                        href=''
                        cardImg={data.Image}
                      />
                    </div>
                  </div>
                );
              })}
          </div>

          <p className='job-guide-para text-center top-space'>
            Building an extensive knowledge base to help to make the most out of
            opportunities. Coming Soon 😉
          </p>
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
