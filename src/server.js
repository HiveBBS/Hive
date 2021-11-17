'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan')

const readRoutes = require ('./routes/api-routes.js')
const aclRoutes = require ('./routes/user-routes.js')
const authRoutes = require ('./auth/auth-routes.js')

const app = express();
const { Server } = require('socket.io');
const server = require('http').createServer(app);
const io = new Server(server);
const socketService = require('./socket.js');
const emitEvent = socketService(io);

const useEmitMiddleWare = (req, res, next) => {
  console.log('*************** THIS **********', emitEvent);
  req.emitEvent = emitEvent;
  next();
}

app.use(useEmitMiddleWare);
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
  server: server,
  start: port => {
    server.listen(port, () => console.log('Server is up at port', port));
  },
};
