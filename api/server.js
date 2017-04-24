'use strict';

const express = require('express'),
      app = express();

const routes = require('./routing/routes.js');

app.set('port', 5000);

routes(app);

const server = app.listen(app.get('port'), () =>{
  console.log('patterbox chattin away on :5000');
});

module.exports = server;

require('./socket/index');

