'use strict';

const express = require('express');
const app = express();

const routes = require('./routing/routes.js');

app.set('port', 3000);

routes(app);

app.listen(app.get('port'), () =>{
  console.log('patterbox chattin away on :3000');
});
