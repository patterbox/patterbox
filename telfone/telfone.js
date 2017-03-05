/**
 * The Telfone RESTful socket
 * 
 * const Telfone = new Telfone('ws://localhost:3000/);
 * 
 * Telfone.get('localhost:300/api/initialData')
 *  .on('connect')
 *  .then((data) =>{
 *    // DO SOMETHING WITH THE RETURNED DATA
 *  })
 *  .catch(e => console.log(e))
 */

class Telfone {
  constructor(socketUrl) {
    this._url = socketUrl;
    this._socket = new WebSocket(this._url, 'echo-protocol');

    this._init();
  }

  _init() {
    this._openSocket();
  }

  _openSocket() {
    this._socket.onerror = () =>{
      console.log('Connection Error');
    };

    this._socket.onopen = (event) =>{
      console.log('WebSocket Client Connected', event);

      const sendNumber = () =>{
        if(this._socket.readyState === this._socket.OPEN) {
          var number = Math.round(Math.random() * 0xFFFFFF);
          this._socket.send(number.toString());
        }
      }

      sendNumber();
    };

    this._socket.onclose = () =>{
      console.log('echo-protocol Client Closed');
    };

    
    return this;
  }

  on(cb) {
    this._socket.onMessage = (event) =>{
      console.log('MESSAGE:',event);
      cb(this._fetch());
    };
  }

  get(url) {
    this._fetch = fetch.bind(this, url);

    return this;
  }

  post(url, requestData) {
    this._fetch = fetch.bind(this, url, { 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      data: JSON.stringify(requestData) 
    });

    return this;
  }
  
}

const constants = {
  HEADERS: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
  },
  ERROR_MSGS: {
    INVALID_URL: 'INVALID URL, USE ABSOLUTE URL'
  },
  REGEX: {
    absUrls : /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i,
    relUrls: /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i
  }
};

module.exports = Telfone;
