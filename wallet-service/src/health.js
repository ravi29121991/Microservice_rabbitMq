const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', (_, res) => {
  const mongoStatus = mongoose.connection.readyState === 1 ? 'up' : 'down';
  res.send({ status: 'ok', db: mongoStatus });
});

module.exports = { healthRouter: router };
