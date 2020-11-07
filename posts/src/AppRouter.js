import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Changelogs from './containers/Changelogs';
import Home from './containers/Home';
import JobGuide from './containers/JobGuide';
import ScrollToTop from './components/ScrollToTop.js';

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/job-guide/:id' component={JobGuide} />
          <Route exact path='/changelogs' component={Changelogs} />

          {/* Personal Information */}
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
