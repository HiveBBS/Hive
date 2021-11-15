'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan')

const readRoutes = require ('./routes/api-routes.js')
const aclRoutes = require ('./routes/user-routes.js')
const authRoutes = require ('./auth/auth-routes.js')

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ 
  extended: true
}))

app.use('/api/readOnly', readRoutes);
app.use('/api/acl', aclRoutes);
app.use('/api', authRoutes)


app.get('/', (req, res) => {
  res.status(200).send('Welcome to HiveBBS');
});

module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => console.log('Server is up at port', port));
  },
};
