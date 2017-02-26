import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';
import App from '../app/App.jsx';


render((
  <Router history={browserHistory}>
    <Route path='/' activeClassName="active" component={App}>
    </Route>
  </Router>
), document.getElementById('app'));
