import { amqpProducerConnect } from '../config/rabbitmqConfig';

export const sendToQueue = async (messageKey, messagePayload) => {
  const connection = await amqpProducerConnect();
  const channel = await connection.createChannel();
  // make sure that the queue will survive a RabbitMQ node restart
  await channel.assertQueue(messageKey, {
    durable: true,
  });

  await channel.sendToQueue(messageKey, Buffer.from(messagePayload), {
    persistent: true, // make sure queue won't be lost even if RabbitMQ restarts
  });

  await channel.close();
  await connection.close();

  return true;
};
