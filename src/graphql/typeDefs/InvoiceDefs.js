import { gql } from 'apollo-server-express';

const InvoiceDefs = gql`
  input InvoiceFilterInput {
    startDate: String
    endDate: String
  }

  type Invoice {
    id: ID!
    total: Float
    subTotal: Float
    discountAmount: Float
    userId: String
    createdAt: Float
    updatedAt: Float
    deletedAt: Float
  }

  type InvoiceListResponse {
    invoices: [Invoice]!
    pagination: Pagination
  }

  extend type Query {
    listInvoice(
      filter: InvoiceFilterInput
      pager: PagerInput!
    ): InvoiceListResponse

    showInvoice(id: ID!): Invoice
  }
`;

export default InvoiceDefs;
