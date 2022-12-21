import { combineResolvers } from 'graphql-resolvers';
import { controllerCallback, apiAuthMiddleware } from '../../middleware';
import {
  listHeroAction,
  AddHeroAction,
  UpdateHeroAction,
} from '../../controllers/hero';
import {
  createInvoice,
  showInvoice,
  listInvoiceAction,
} from '../../controllers/invoice';

import { checkDateFormatAndThrowError } from '../../utils/commonUtil';

const InvoiceResolver = {
  // Mutation: {
  //   createHero: async (_, { input }) => {
  //     return await controllerCallback(AddHeroAction, input);
  //   },
  //   updateHero(_, { input }){
  //     return controllerCallback(UpdateHeroAction, input);
  //   },
  //   createTeam(_, {input}) {
  //     return controllerCallback(createTeam, input);
  //   }
  // },
  Query: {
    listInvoice: async (_, { pager, filter }, { userContext }) => {
      // check format date
      if (filter?.startDate || filter?.endDate) {
        checkDateFormatAndThrowError(filter.startDate);
        checkDateFormatAndThrowError(filter.endDate);
      }

      return await controllerCallback(listInvoiceAction, {
        filter,
        pager,
      });
    },
    showInvoice(_, { id }) {
      return controllerCallback(showInvoice, id);
    },
  },
};

export default InvoiceResolver;
