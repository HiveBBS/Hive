'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan')

const v1Routes = require ('./routes/api-routes.js')

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ 
  extended: true
}))

app.use('/api/v1', v1Routes);


app.get('/', (req, res) => {
  res.status(200).send('Welcome to HiveBBS');
});

module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => console.log('Server is up at port', port));
  },
};
