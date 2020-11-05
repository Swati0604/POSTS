import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import Footer from '../../components/footer';
import JobGuideCard from '../../components/JobGuideCard';
import { withGoogleSheets } from 'react-db-google-sheets';

//Images
import backIcon from '../../assets/images/back-icon.svg';

// Style
import './styles.scss';

class JobGuide extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef(); // Create a ref object
  }

  componentDidMount() {
    this.myRef.current.scrollTo(0, 0);
  }
  render() {
    const selectedJobId = this.props.match.params.id;
    return (
      <div className='job-guide-page-style' ref={this.myRef}>
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

            {this.props.db &&
              this.props.db.Guide &&
              this.props.db.Guide.map(
                (data, index) =>
                  index === parseInt(selectedJobId) - 1 && (
                    <div key={index}>
                      <div class='text-box'>
                        <h5 class='heading'>{data.Title}</h5>
                        <p class='para'>{data.Time}</p>
                      </div>

                      <div className='purpose-box-container'>
                        <h5 class='heading purpose-heading'>🎯 Purpose</h5>
                        <p class='para purpose-para'>{data.Purpose}</p>
                      </div>

                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='methods'>
                            <h5 class='heading purpose-heading'>Do’s</h5>
                            <pre className='para purpose-para do-para'>
                              {/* {data.Do.split('\n').map((para, index) => para)} */}
                              {data.Do}
                            </pre>
                          </div>
                        </div>

                        <div className='col-md-6'>
                          <div className='methods'>
                            <h5 class='heading purpose-heading'>Dont’s</h5>
                            <pre className='para purpose-para do-para'>
                              {data.DoNots}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              )}
          </div>
        </div>

        {/* <div className='update-info-container'>
          <p className='update-info'>🎉 Updating New Jobs in 4:00:00 Hrs</p>
        </div> */}

        <div className='job-guide-section'>
          <div className='job-guide-container'>
            <div className='text-box'>
              <h5 className='post-heading'>Other helpful guides</h5>
              <p className='post-info-para'>
                A few resources to help you ace your next opportunity
              </p>
            </div>

            <div className='row'>
              {this.props.db &&
                this.props.db.Guide &&
                this.props.db.Guide.map(
                  (data, index) =>
                    index !== parseInt(selectedJobId) && (
                      <div className='col-md-4'>
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
                    )
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

export default withGoogleSheets('Guide')(JobGuide);
