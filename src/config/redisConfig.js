import Redis from 'ioredis';
import { ENV } from '../constant';

const REDIS_URI = `redis://${ENV.REDIS_HOST}`;

const redis = new Redis(REDIS_URI);

export default redis;
