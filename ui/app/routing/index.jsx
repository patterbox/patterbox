import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';
import rootReducer from '../reducers/index.js';
import App from '../components/app/App.jsx';
import ChatRoom from '../components/chatroom/ChatRoom.jsx';
import RestfulSocket from 'restfulsocket';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const history = syncHistoryWithStore(browserHistory, store);

// const onopen = (event) =>{
//   console.log('WebSocket Client Connected');

//   const sendNumber = () =>{
//     if(event.readyState === event.OPEN) {
//       var number = Math.round(Math.random() * 0xFFFFFF);
//       restfulSocket.socket.send(number.toString());
//     }
//   }

//   sendNumber();
// };

// const onclose = (event) =>{
//   console.log('Client Closed', event);
// };

// const onerror = (error) =>{
//   console.log('Connection Error', error);
// };

// const restfulSocket = new RestfulSocket('ws://localhost:5000/', onopen, onclose, onerror);

// restfulSocket.findSocketMessage((data) =>{
//   return JSON.parse(event.data).message;
// });

// const getobj = { 
//   method: 'GET',
//   mode: 'cors',
//   cache: 'default' 
// };

// restfulSocket.get('http://localhost:5000/api/test3', getobj)
//   .get('http://localhost:5000/api/test3', getobj)
//   .on('init')
//   .then((fetch) =>{
//     console.log("RESPONSES",fetch)
//   }).catch(console.log);

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' activeClassName="active" component={App}>
        <Route path='chatroom' activeClassName="active" component={ChatRoom} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
