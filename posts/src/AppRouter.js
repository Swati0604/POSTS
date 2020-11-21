import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Changelogs from './containers/Changelogs';
import Home from './containers/Home';
import JobGuide from './containers/JobGuide';
import ScrollToTop from './components/ScrollToTop.js';
import CitiesJobs from './containers/CitiesJobs';
import PrivacyPolicy from './containers/PrivacyPolicy';

function AppRouter() {
  useEffect(() => {
    ReactGA.initialize('G-77RRHE6EF1');
    // To Report Page View
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    console.log(window.location.pathname);
  });

  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/job-guide/:id' component={JobGuide} />
        <Route exact path='/changelogs' component={Changelogs} />
        <Route exact path='/city/:id' component={CitiesJobs} />
        <Route exact path='/privacy-policy' component={PrivacyPolicy} />

        {/* Personal Information */}
      </Switch>
    </Router>
  );
}

export default AppRouter;
