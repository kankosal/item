import { gql } from 'apollo-server-express';

const userDefs = gql`
  type User {
    id: ID!
    mysabayUserId: String
    productId: String
    amount: Float
    assetCode: String
    txnType: String
    txnDate: Float
    ssnTxnHash: String
    ssnFrom: String
    ssnTo: String
    description: String
    purchaseFor: String
    type: String
    createdAt: Float
    updatedAt: Float
    deletedAt: Float
    bookingAmount: Float
    bonusAmount: Float
  }

  type UserResponse {
    users: [User]!
    pagination: Pagination
  }

  input UserFilterInput {
    startDate: String
    endDate: String
    txnType: String
  }

  extend type Query {
    listUser(filter: UserFilterInput, pager: PagerInput!): UserResponse
  }
`;

export default userDefs;
