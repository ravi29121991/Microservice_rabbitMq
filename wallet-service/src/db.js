const mongoose = require('mongoose');

module.exports = function connectMongo() {
  mongoose.connect('mongodb://mongodb-wallet/wallet', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('connected', () => {
    console.log('[Wallet Service] MongoDB connected');
  });

  mongoose.connection.on('error', (err) => {
    console.error('[Wallet Service] MongoDB error:', err);
  });
};
