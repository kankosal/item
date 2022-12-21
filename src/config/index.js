/* eslint-disable import/no-cycle */
import { connectDB } from './dbConfig';
import {
  initConnectionOne,
  mongooseOne,
  initConnectionTwo,
  mongooseTwo,
} from './dbMultiConfig';
import redis from './redisConfig';
import { amqpConsumerConnect, amqpProducerConnect } from './rabbitmqConfig';

export {
  connectDB,
  amqpConsumerConnect,
  amqpProducerConnect,
  redis,
  initConnectionOne,
  mongooseOne,
  initConnectionTwo,
  mongooseTwo,
};
