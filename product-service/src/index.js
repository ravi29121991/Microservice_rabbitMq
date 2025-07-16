const express = require('express');
require('./db')();
const { healthRouter } = require('./health');

const app = express();
app.use('/health', healthRouter);
app.listen(3003, () => console.log('[Product Service] Running on port 3003'));
