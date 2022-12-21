/* eslint-disable import/no-cycle */
import mongoose from 'mongoose';
import extendBaseSchema from './baseModel';
import { mongooseTwo } from '../config/dbMultiConfig';

const invoiceSchema = extendBaseSchema(
  new mongoose.Schema({
    total: {
      type: Number,
      default: 0,
    },
    sub_total: {
      type: Number,
      default: 0,
      alias: 'subTotal',
    },
    discount_amount: {
      type: Number,
      default: 0,
      alias: 'discountAmount',
    },
    cashier_id: {
      type: Number,
      default: 0,
      alias: 'cashierId',
    },
    status: {
      type: 'number',
      required: true,
    },
    note: {
      type: 'mixed',
      default: null,
    },
    data: {
      type: 'mixed',
      default: null,
    },
    created_at: {
      type: Number,
      required: true,
      alias: 'createdAt',
    },
    updated_at: {
      type: Number,
      default: 0,
      alias: 'updatedAt',
    },
    deleted_at: {
      type: Number,
      default: 0,
      alias: 'deletedAt',
    },
  })
);

const InvoiceModel = mongooseTwo().model('Invoice', invoiceSchema);

export default InvoiceModel;
