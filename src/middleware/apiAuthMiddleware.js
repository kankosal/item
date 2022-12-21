/* istanbul ignore file */
import { skip } from 'graphql-resolvers';
import { decodeAccessToken } from '../utils';
import { ENV } from '../constant';

const apiAuthMiddleware = async (root, args, context) => {
  try {
    if (!context.token) {
      throw new Error('authorization is required');
    }
    const accessToken = context.token;
    const getdecodeJwt = decodeAccessToken(
      accessToken,
      ENV.MICROSERVICE_JWT_SK
    );

    context.user = getdecodeJwt;

    return skip;
  } catch (error) {
    return error;
  }
};

export default apiAuthMiddleware;
