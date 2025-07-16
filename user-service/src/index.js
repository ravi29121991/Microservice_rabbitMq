const express = require('express');
const connectRabbitMQ = require('./rabbitmq');
const connectMongo = require('./db');
const User = require('./models/User');
const { healthRouter } = require('./health');
const axios = require('axios');
const axiosRetry = require('axios-retry');

const app = express();
app.use(express.json());
app.use('/health', healthRouter);

// Axios with retry
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

connectMongo();

app.post('/users', async (req, res) => {
  const { channel } = await connectRabbitMQ();
  const user = await User.create(req.body);
  await channel.sendToQueue('user_created', Buffer.from(JSON.stringify(user)));

  try {
    await axios.post('http://wallet-service:3002/wallets', { userId: user._id });
  } catch (err) {
    console.error('[User Service] Wallet creation failed:', err.message);
  }

  res.status(201).send({ message: 'User created', user });
});

app.listen(3001, () => console.log('[User Service] Running on port 3001'));
