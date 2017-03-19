'use strict';

const {} = require('./middleware');

module.exports = (app) =>{

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  app.get('/api/test', (req, res) =>{
    console.log('my routes GET')
    res.send(JSON.stringify({json: 'good job'}));
  });

  app.post('/api/test2', (req, res) =>{
    console.log('my routes POST',req.body)
    res.send(JSON.stringify({json: 'good job'}));
  });
};
