const express = require('express');
require('./consumer');
require('./db')();
const { healthRouter } = require('./health');

const app = express();
app.use(express.json());
app.use('/health', healthRouter);

app.post('/wallets', async (req, res) => {
  const Wallet = require('./models/Wallet');
  const { userId } = req.body;
  const wallet = await Wallet.create({ userId, balance: 0 });
  res.status(201).send({ wallet });
});

app.listen(3002, () => console.log('[Wallet Service] Running on port 3002'));
