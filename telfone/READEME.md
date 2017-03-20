# Welcome to Telfone

Telfone is a RESTful Socket that combines the naitve Fetch, Websocket and Promise API to create a 
restufl response to a websocket event listener.


# Getting Started

1. Install Telfone:

`
npm install -save telfone
`

2. Import Telfone: 

`import Telfone from 'telfone'`

3. Use Telfone:

`
const restSocket = new Telfone('ws://localhost/', onopen, onclose, onerror);

restSocket.get('localhost/api/initialData')
  .on('sampleMessage')
  .then((data) => {
    //DATA is an array of objects returned from fetch promises
  })
  .catch(console.log);
`

4. Complex usecase:

`
const restSocket = new Telfone('ws://localhost/', onopen, onclose, onerror);

restSocket.get('localhost/api/initialData')
  .post('localhost/api/initialPost', requestObject)
  .on('init')
  .then((data) => {
    //DATA is an array of objects returned from fetch promises
  })
  .catch(console.log);

restSocket.get('localhost/api/updateData')
  .get('localhost/api/secondaryData', requestObject)
  .on('update')
  .then((data) => {
    //DATA is an array of objects returned from fetch promises
  })
  .catch(console.log);
`

