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

  __reset__() {
    delete this._requestURL;
    delete this._requestObject;

    return null;
  }

  _init(socketURL) {
    this._setSocketURL = socketURL;
    this._setSocket = new WebSocket(this._getSocketURL, 'echo-protocol');
    this.__requests__ = {};

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
    if (Array.isArray(this._requestURL)) {
      this._requestURL.push(url);
    } else {
      this._requestURL = [url];
    }

    return null;
  }

  set _setRequestObject(requestObject) {
    try {
      this._requestObject = [
        { 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          data: JSON.stringify(requestObject) 
        }
      ];
    } catch(e) {
      console.log(e);
    }

    return null;
  }

  get _getSocketURL() {
    return this._socketURL;
  }

  get _getRequestURLs() {
    return this._requestURL;
  }

  get _getRequestObjects() {
    return this._requestObject;
  }

  _getFetch(message) {
    const request = this.__requests__[message];
    const urls = request.url;
    const requestObjects = request.requestObject;

    try {
      const requests = urls.map((url, index) =>{
        return requestObjects[index] ? fetch(url, requestObjects[index]) : fetch(url);
      });
      
      return Promise.all(requests);
    } catch(e) {
      console.log(e);
    }

    return this;
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

  get(url, requestObject) {
    this._setRequestURL = url;
    this._setRequestObject = requestObject ? requestObject : null;

    return this;
  }

  post(url, requestData) {
    this._setRequestURL = url;
    this._setRequestObject = requestData;
    
    return this;
  }

  on(message) {
    this.__requests__[message] = {
      url: this._getRequestURLs,
      requestObject: this._getRequestObjects
    }

    this.__reset__();

    return new Promise ((resolve, reject) =>{
      this._socket.onmessage = (event) =>{
        const serverMessage = JSON.parse(event.data).message;
        resolve(this._getFetch(serverMessage));
      };
    });
  }
  
}

module.exports = Telfone;
