const ENVIRONMENT = {
  TEST: 'test',
  CI_TEST: 'ci_test',
};

const SORT_BY = {
  ASC: 'asc',
  DESC: 'desc',
};

const MESSAGE_KEY = {
  WALLET_ACTIVITY_LOG: 'wallet.activity.log',
};

const STATUS_CODE = {
  SUCCESS: '00',
  MISSING_HEADER: 'UI005',
  INVALID_INPUT: 'UI006',
  UNAUTHORIZED: 'AZ',
};

const REDIS_CACHE_KEY = {
  WALLET_ACTIVITY_LOG_USER_SESSION_ID: 'wallet:activity-log:user:',
};

export { ENVIRONMENT, SORT_BY, MESSAGE_KEY, STATUS_CODE, REDIS_CACHE_KEY };
