import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';
import rootReducer from '../reducers/index.js';
import App from '../components/app/App.jsx';
import ChatRoom from '../components/chatroom/chatroom.jsx';
import Telfone from 'telfone';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const history = syncHistoryWithStore(browserHistory, store);

const telfone = new Telfone('ws://localhost:5000/');

const telfone2 = new Telfone('ws://localhost:5000/');

telfone.get('http://localhost:5000/api/test')
  .on('message')
  .then((fetch) =>{
    console.log("GET",fetch)
  }).catch(console.log);

telfone2.post('http://localhost:5000/api/test2')
  .on('message')
  .then((fetch) =>{
    console.log("POST",fetch)
  }).catch(console.log);

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' activeClassName="active" component={App}>
        <Route path='chatroom' activeClassName="active" component={ChatRoom} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
