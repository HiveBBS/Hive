'use strict';

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Welcome to HiveBBS');
});

module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => console.log('Server is up at port', port));
  },
};
