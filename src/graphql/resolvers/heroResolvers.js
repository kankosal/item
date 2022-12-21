import { combineResolvers } from 'graphql-resolvers';
import { controllerCallback, apiAuthMiddleware } from '../../middleware';
import {
  listHeroAction,
  AddHeroAction,
  UpdateHeroAction,
} from '../../controllers/hero';
import { findTeam, createTeam } from '../../controllers/team';

import { checkDateFormatAndThrowError } from '../../utils/commonUtil';

const heroResolver = {
  Mutation: {
    createHero: async (_, { input }) => {
      return await controllerCallback(AddHeroAction, input);
    },
    updateHero(_, { input }) {
      return controllerCallback(UpdateHeroAction, input);
    },
    createTeam(_, { input }) {
      return controllerCallback(createTeam, input);
    },
  },
  Query: {
    listHero: async (_, { pager, filter }, { userContext }) => {
      // check format date
      if (filter?.startDate || filter?.endDate) {
        checkDateFormatAndThrowError(filter.startDate);
        checkDateFormatAndThrowError(filter.endDate);
      }

      return await controllerCallback(listHeroAction, {
        filter,
        pager,
      });
    },
    team(_, { id }) {
      return controllerCallback(findTeam, id);
    },
  },
};

export default heroResolver;
