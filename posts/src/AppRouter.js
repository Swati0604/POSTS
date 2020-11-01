import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './containers/Home';

class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />

          {/* Personal Information */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
