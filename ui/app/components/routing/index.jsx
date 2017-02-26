import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';
import App from '../app/App.jsx';
import ChatRoom from '../chatroom/chatroom.jsx';

render((
  <Router history={browserHistory}>
    <Route path='/' activeClassName="active" component={App}>
      <Route path='chatroom' activeClassName="active" component={ChatRoom} />
    </Route>
  </Router>
), document.getElementById('app'));
