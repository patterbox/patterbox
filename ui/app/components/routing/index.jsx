import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';
import rootReducer from '../../reducers/index.js';
import App from '../app/App.jsx';
import ChatRoom from '../chatroom/chatroom.jsx';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const history = syncHistoryWithStore(browserHistory, store);

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' activeClassName="active" component={App}>
        <Route path='chatroom' activeClassName="active" component={ChatRoom} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
