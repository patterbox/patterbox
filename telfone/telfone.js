/**
 * The Telfone RESTful socket
 * 
 * const Telfone = new Telfone('ws://localhost:5000/', onopen, onclose, onerror);
 * 
 * Telfone.findSocketMessage((data) =>{
 *  //RETURN THE MESSAGE FROM YOUR SOCKET DATA STRUCTURE
 *  return JSON.parse(event.data).message
 * })
 * 
 * Telfone.get('localhost:5000/api/initialData')
 *  .get('localhost:5000/api/extraData', requestObject)
 *  .post(url, requestObject)
 *  .on('connect')
 *  .then((data) =>{
 *    // DO SOMETHING WITH THE RETURNED DATA
 *  })
 *  .catch(e => console.log(e))
 */

class Telfone {
  constructor(...params) {
    this._init(...params)
      ._openSocket();
  }

  __reset__() {
    delete this._requestURL;
    delete this._requestObject;
    return null;
  }

  _init(socketURL, onopen, onclose, onerror) {
    this._setSocketURL = socketURL;
    this._setOnopen = onopen;
    this._setOnclose = onclose;
    this._setOnerror = onerror;
    this._setSocket = new WebSocket(this._getSocketURL, 'echo-protocol');
    this._setRequests = {};

    return this;
  }

  set _setRequests(storage) {
    this.__requests__ = storage;
    return null;
  }

  set _setSocketURL(socketURL) {
    this._socketURL = socketURL;
    return null;
  }

  set _setOnopen(onopen) {
    this._onopen = onopen;
    return null;
  }

  set _setOnclose(onclose) {
    this._onclose = onclose;
    return null;
  }

  set _setOnerror(onerror) {
    this._onerror = onerror;
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
    this._requestObject = requestObject;
    return null;
  }

  set _setFindSocketMessage(cb) {
    this._findSocketMessage = cb;
    return null;
  }

  get _getRequests() {
    return this.__requests__;
  }

  get _getSocketURL() {
    return this._socketURL;
  }

  get _getOnopen() {
    return this._onopen;
  }

  get _getOnclose() {
    return this._onclose;
  }

  get _getOnerror() {
    return this._onerror;
  }

  get _getRequestURLs() {
    return this._requestURL;
  }

  get _getRequestObjects() {
    return this._requestObject;
  }

  get _getFindSocketMessage() {
    return this._findSocketMessage;
  }

  _getFetch(message) {
    const request = this._getRequests[message];
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
      this._socket.onerror = this._getOnerror.bind(null, this._socket);

      this._socket.onopen = this._getOnopen.bind(null, this._socket);

      this._socket.onclose = this._getOnclose.bind(null, this._socket);
    } catch(e) {
      console.log(e);
    }
    
    return this;
  }

  findSocketMessage(cb) {
    this._setFindSocketMessage = cb;
    return null;
  }

  get(url, requestData) {
    this._setRequestURL = url;
    this._setRequestObject = requestData ? requestData : null;

    return this;
  }

  post(url, requestData) {
    this._setRequestURL = url;
    this._setRequestObject = requestData;
    
    return this;
  }

  on(message) {
    this._getRequests[message] = {
      url: this._getRequestURLs,
      requestObject: this._getRequestObjects
    }

    this.__reset__();

    return new Promise ((resolve, reject) =>{
      this._socket.onmessage = (event) =>{
        const serverMessage = this._getFindSocketMessage(event);
        resolve(this._getFetch(serverMessage));
      };
    });
  }
  
}

module.exports = Telfone;
