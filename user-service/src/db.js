const mongoose = require('mongoose');

module.exports = function connectMongo() {
  mongoose.connect('mongodb://mongodb-user/user', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('connected', () => {
    console.log('[User Service] MongoDB connected');
  });

  
  mongoose.connection.on('error', (err) => {
    console.error('[User Service] MongoDB error:', err);
  });
};
