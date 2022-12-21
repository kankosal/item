import dotEnv from 'dotenv';

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'ci_test') {
  dotEnv.config({ path: './src/test/.test.env' });
}

const {
  NODE_ENV,
  DB_CONNECTION_URI,
  DB_PASSWORD,
  DB_USERNAME,
  JAEGER_HOST,
  JAEGER_SPAN_LOGGING,
  RABBITMQ_HOST,
  RABBITMQ_USER,
  RABBITMQ_PASSWORD,
  RABBITMQ_VHOST,
  ROW_LIMIT,
  REDIS_HOST,
} = process.env;

const ENV = {
  APP_PORT: 7000,
  NODE_ENV,
  DB_CONNECTION_URI,
  DB_PASSWORD,
  DB_USERNAME,
  JAEGER_HOST,
  JAEGER_SPAN_LOGGING,
  RABBITMQ_HOST,
  RABBITMQ_USER,
  RABBITMQ_PASSWORD,
  RABBITMQ_VHOST,
  ROW_LIMIT: parseInt(ROW_LIMIT, 10) || 20,
  REDIS_HOST,
};

export default ENV;
