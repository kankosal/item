import { gql } from 'apollo-server-express';
import heroDefs from './HeroDefs';
import userDefs from './UserDefs';
import invoiceDefs from './InvoiceDefs';

// using _ or other var: String to make root Query & Mutation extendable
const typeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  input PagerInput {
    page: Int!
    limit: Int!
  }

  enum Sort {
    asc
    desc
  }

  type Pagination {
    currentPage: Int!
    lastPage: Int!
    from: Int!
    perPage: Int!
    to: Int!
    total: Int!
  }
`;

export default [typeDefs, heroDefs, userDefs, invoiceDefs];
