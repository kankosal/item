import { combineResolvers } from 'graphql-resolvers';
import { controllerCallback, apiAuthMiddleware } from '../../middleware';
import { listUserAction } from '../../controllers/user';
import { checkDateFormatAndThrowError } from '../../utils/commonUtil';

const userResolver = {
  Query: {
    listUser: async (_, { pager, filter }, { userContext }) => {
      // check format date
      if (filter?.startDate || filter?.endDate) {
        checkDateFormatAndThrowError(filter.startDate);
        checkDateFormatAndThrowError(filter.endDate);
      }
      const mysabayUserId = userContext?.user?.mysabayUserID;

      return await controllerCallback(listUserAction, {
        filter,
        pager,
        mysabayUserId,
      });
    },
  },
};

export default userResolver;
