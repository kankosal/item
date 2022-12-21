/* eslint-disable valid-typeof */
import mongoose from 'mongoose';

let connOne = null;
export const initConnectionOne = () => {
  const dbUri = '127.0.0.1:27017/test_one?directConnection=true';
  const dbPwd = 'secret';
  const dbUser = 'root';
  const DB_URI = `mongodb://${dbUser}:${encodeURIComponent(dbPwd)}@${dbUri}`;
  try {
    const conn = mongoose.createConnection(DB_URI);
    console.log('DB One connected');
    connOne = conn;
    return conn;
  } catch (error) {
    console.log('mongodb connection error event');
    return error;
  }
};

export const mongooseOne = () => {
  try {
    if (!connOne) {
      return initConnectionOne();
    }
    return connOne;
  } catch (error) {
    console.log('mongodb connection error event');
    return error;
  }
};

let connTwo = null;
export const initConnectionTwo = () => {
  const dbUri = '127.0.0.1:27017/test_two?directConnection=true';
  const dbPwd = 'secret';
  const dbUser = 'root';
  const DB_URI = `mongodb://${dbUser}:${encodeURIComponent(dbPwd)}@${dbUri}`;
  try {
    const conn = mongoose.createConnection(DB_URI);
    console.log('DB One connected');
    connTwo = conn;
    return conn;
  } catch (error) {
    console.log('mongodb connection error event');
    return error;
  }
};

export const mongooseTwo = () => {
  try {
    if (!connTwo) {
      return initConnectionTwo();
    }
    return connTwo;
  } catch (error) {
    console.log('mongodb connection error event');
    return error;
  }
};
