import { STATUS_CODE, REDIS_CACHE_KEY } from '../constant';
import { skip } from 'graphql-resolvers';
import { redis } from '../config';

const cookieMiddleware = async (root, input, context) => {
  try {
    const userSessionId = await redis.get(
      `${REDIS_CACHE_KEY.WALLET_ACTIVITY_LOG_USER_SESSION_ID}${context?.sessionId}`
    );
    if (!userSessionId) {
      return {
        code: STATUS_CODE.MISSING_HEADER,
      };
    }
    return skip;
  } catch (error) {
    return error;
  }
};

export default cookieMiddleware;
