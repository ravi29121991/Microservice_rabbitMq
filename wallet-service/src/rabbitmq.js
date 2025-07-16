const amqp = require('amqplib');

let channel;
async function connectRabbitMQ() {
  if (channel) return { channel };
  const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://rabbitmq');
  channel = await connection.createChannel();
  await channel.assertQueue('user_created');
  console.log('[Wallet Service] Connected to RabbitMQ');
  return { channel };
}

module.exports = connectRabbitMQ;
