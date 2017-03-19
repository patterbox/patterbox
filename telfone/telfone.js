/**
 * The Telfone RESTful socket
 * 
 * const Telfone = new Telfone('ws://localhost:5000/);
 * 
 * Telfone.get('localhost:5000/api/initialData')
 *  .on('connect')
 *  .then((data) =>{
 *    // DO SOMETHING WITH THE RETURNED DATA
 *  })
 *  .catch(e => console.log(e))
 */

class Telfone {
  constructor(socketURL) {
    this._init(socketURL)
      ._openSocket();
  }

  _init(socketURL) {
    this._setSocketURL = socketURL;
    this._setSocket = new WebSocket(this._socketURL, 'echo-protocol');
    this._setRequestURL = null;
    this._setRequestObject = null;
    

    return this;
  }

  set _setSocketURL(socketURL) {
    this._socketURL = socketURL;

    return null;
  }

  set _setSocket(socket) {
    this._socket = socket;

    return null;
  }

  set _setRequestURL(url) {
    this._requestURL = url;
    
    return null;
  }

  set _setRequestObject(requestObject) {
    try {
      this._requestObject = { 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        data: JSON.stringify(requestObject) 
      };
    } catch(e) {
      console.log(e);
    }

    return null;
  }

  get _getRequestURL() {
    return this._requestURL;
  }

  get _getRequestObject() {
    return this._requestObject;
  }

  get _getFetch() {
    try {
      return !this._requestObject ? fetch(this._requestURL) : fetch(this._getRequestURL, this._getRequestObject);
    } catch(e) {
      console.log(e);
    }
  }

  _openSocket() {
    try {
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
    } catch(e) {
      console.log(e);
    }
    
    return this;
  }

  get(url) {
    this._setRequestURL = url;
    return this;
  }

  post(url, requestData) {
    this._setRequestURL = url;
    this._setRequestObject = requestData;
    return this;
  }

  on() {
    return new Promise ((resolve, reject) =>{
      this._socket.onmessage = (event) =>{
        console.log('MESSAGE:',event);
        resolve(this._getFetch);
      };
    });
  }
  
}

module.exports = Telfone;
