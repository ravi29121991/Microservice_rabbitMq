const connectRabbitMQ = require('./rabbitmq');
const Wallet = require('./models/Wallet');

async function startConsumer() {
  const { channel } = await connectRabbitMQ();

  channel.consume('user_created', async (msg) => {
    if (msg) {
      const user = JSON.parse(msg.content.toString());
      console.log('[Wallet Service] Creating wallet for:', user.email);

      try {
        await Wallet.create({ userId: user._id, balance: 0 });
        console.log('[Wallet Service] Wallet created');
      } catch (err) {
        console.error('[Wallet Service] Error creating wallet:', err.message);
      }

      channel.ack(msg);
    }
  });
}

startConsumer();
