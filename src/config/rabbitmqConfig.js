/* eslint-disable import/no-cycle */
import amqp from 'amqplib';
import { ENV, ENVIRONMENT } from '../constant';
import consumersLoader from '../consumers/consumersLoader';

const amqpConnectionURI =
  ENV.NODE_ENV === 'development'
    ? `amqp://${ENV.RABBITMQ_HOST}`
    : `amqp://${ENV.RABBITMQ_USER}:${ENV.RABBITMQ_PASSWORD}@${ENV.RABBITMQ_HOST}/${ENV.RABBITMQ_VHOST}`;

let connection = null;
let channel = null;
let isConnected = true;

export const amqpConsumerConnect = async () => {
  try {
    if (connection && channel && isConnected) {
      return channel;
    }
    connection = await amqp.connect(amqpConnectionURI);

    connection.on('close', () => {
      if (
        ENV.NODE_ENV !== ENVIRONMENT.TEST &&
        ENV.NODE_ENV !== ENVIRONMENT.CI_TEST
      ) {
        console.error(`${ENV.RABBITMQ_HOST} RABBITMQ reconnecting`);
        isConnected = false;
        setTimeout(amqpConsumerConnect, ENV.RETRY_INTERVAL);
      }
    });

    connection.on('error', () => {
      if (
        ENV.NODE_ENV !== ENVIRONMENT.TEST &&
        ENV.NODE_ENV !== ENVIRONMENT.CI_TEST
      ) {
        console.error(`${ENV.RABBITMQ_HOST} RABBITMQ reconnecting`);
        isConnected = false;
        setTimeout(amqpConsumerConnect, ENV.RETRY_INTERVAL);
      }
    });

    channel = await connection.createChannel();
    console.log(`${ENV.RABBITMQ_HOST} RABBITMQ connected`);

    if (global.execConsumerLoader) {
      await consumersLoader(channel);
    }

    return channel;
  } catch (error) {
    if (
      ENV.NODE_ENV !== ENVIRONMENT.TEST &&
      ENV.NODE_ENV !== ENVIRONMENT.CI_TEST
    ) {
      console.error(`${ENV.RABBITMQ_HOST} RABBITMQ reconnecting`);
      isConnected = false;
      setTimeout(amqpConsumerConnect, ENV.RETRY_INTERVAL);
    }
    return null;
  }
};

export const amqpProducerConnect = async () => {
  try {
    return await amqp.connect(amqpConnectionURI);
  } catch (error) {
    console.log('rabbitmq producer connection error: ', error);
    return error;
  }
};
