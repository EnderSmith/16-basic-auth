'use strict';

// app deps
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
// const errorHandler = require('./error-handler');

// app setup
const app = express();
const PORT = process.env.PORT;
const router = express.Router();
const MONGODB_URI = process.env.MONGODB_URI;

// middleware
app.use(cors());
app.use('/api/v1', router);
require('../route/route-auth')(router);
app.all('/{0,}', (req, res) => errorHandler(new Error('Path Error. Route not found.'), res));

// server controls
const server = {};
server.start = () => {
  return new Promise((resolve, reject) => {
    if (this.isOn) {
      return reject(new Error('Server Error. Cannot start server on the same port when already running.'));
    }
    server.http = app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
      server.isOn = true;
      mongoose.connect(MONGODB_URI);
      return resolve(server);
    });
  });
};

server.stop = () => {
  return new Promis((resolve, reject) => {
    if (!this.isOn) {
      return reject(new Error('Server Error. Cannot stop server: No server running.'));
    }
    server.http = app.listen(PORT, () => {
      server.isOn = false;
      mongoose.disconnect;
      return resolve();
    });
  });
};
