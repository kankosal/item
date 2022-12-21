/* eslint-disable import/no-cycle */
import mongoose from 'mongoose';
import extendBaseSchema from './baseModel';
import { mongooseTwo } from '../config/dbMultiConfig';

const invoiceDetailSchema = extendBaseSchema(
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
    item_id: {
      type: Number,
      default: 0,
      alias: 'itemId',
    },
    item_name: {
      type: 'string',
      required: true,
      index: true,
      alias: 'itemName',
    },
    item_price: {
      type: Number,
      required: true,
      index: true,
      alias: 'itemPrice',
    },
    action_date: {
      type: 'number',
      required: true,
      index: true,
      alias: 'actionDate',
    },
    note: {
      type: 'string',
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

const InvoiceDetailModel = mongooseTwo().model(
  'InvoiceDetail',
  invoiceDetailSchema
);

export default InvoiceDetailModel;
