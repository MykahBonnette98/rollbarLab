const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

app.use(express.json())

var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: '8b94afbc3fca4a87a9dab954caf82b62',
  captureUncaught: true,
  captureUnhandledRejections: true
});

rollbar.log("Hello world!");
rollbar.info('Requested info');
rollbar.error('Error');
rollbar.critical('Critial');
rollbar.warning('Warning');
