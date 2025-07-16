const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  userId: String,
  balance: Number
}, { timestamps: true });

module.exports = mongoose.model('Wallet', walletSchema);
