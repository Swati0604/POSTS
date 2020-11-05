import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Changelogs from './containers/Changelogs';
import Home from './containers/Home';
import JobGuide from './containers/JobGuide';

class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/job-guide/:id' component={JobGuide} />
          <Route exact path='/changelogs' component={Changelogs} />

          {/* Personal Information */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
