const mongoose = require('mongoose');

module.exports = function connectMongo() {
  mongoose.connect('mongodb://mongodb-product/product', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('connected', () => {
    console.log('[Product Service] MongoDB connected');
  });

  mongoose.connection.on('error', (err) => {
    console.error('[Product Service] MongoDB error:', err);
  });
};
