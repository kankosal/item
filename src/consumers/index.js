import { connectDB, amqpConsumerConnect } from '../config';

const startConsumers = async () => {
  try {
    global.execConsumerLoader = true;
    await connectDB();
    await amqpConsumerConnect();
  } catch (error) {
    console.log('consumers error: ', error);
  }
};

startConsumers();
