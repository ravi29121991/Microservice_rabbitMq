const express = require('express');
const router = express.Router();
router.get('/', (_, res) => res.send('Product Service is healthy'));
module.exports = { healthRouter: router };
