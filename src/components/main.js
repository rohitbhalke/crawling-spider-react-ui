import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from './../layouts/index';
import PageNotFound from './../layouts/404';

function Main() {
  return (
      <Router>
          <Switch>
              <Route path="/" component={Layout} />
              <Route parh="*" component={PageNotFound} />
          </Switch>
      </Router>
  )
}

export default Main;

