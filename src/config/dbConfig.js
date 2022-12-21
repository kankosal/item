/* eslint-disable valid-typeof */
import mongoose from 'mongoose';
import { ENV, ENVIRONMENT } from '../constant';

const DB_URI = `mongodb://${ENV.DB_USERNAME}:${encodeURIComponent(
  ENV.DB_PASSWORD
)}@${ENV.DB_CONNECTION_URI}`;
let isMongooseEventRegistered = false;

export const connectDB = async () => {
  try {
    console.log('Establishing connection to DB: ', ENV.DB_CONNECTION_URI);

    if (!isMongooseEventRegistered) {
      mongoose.connection.on('error', () => {
        if (
          ENV.NODE_ENV !== ENVIRONMENT.TEST &&
          ENV.NODE_ENV !== ENVIRONMENT.CI_TEST
        ) {
          console.log('mongodb connection error event');
          mongoose.disconnect();
        }
      });

      mongoose.connection.on('connected', () => {
        if (
          ENV.NODE_ENV !== ENVIRONMENT.TEST &&
          ENV.NODE_ENV !== ENVIRONMENT.CI_TEST
        ) {
          console.log('mongodb connected event');
        }
      });

      mongoose.connection.on('disconnected', () => {
        console.log('mongodb disconnected event');
        if (
          ENV.NODE_ENV !== ENVIRONMENT.TEST &&
          ENV.NODE_ENV !== ENVIRONMENT.CI_TEST
        ) {
          setTimeout(() => {
            connectDB();
          }, ENV.RETRY_INTERVAL);
        }
      });
      isMongooseEventRegistered = true;
    }

    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('mongodb connected');
  } catch (error) {
    console.log('error make connection to mongodb');
  }
};
