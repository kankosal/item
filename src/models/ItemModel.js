/* eslint-disable import/no-cycle */
import mongoose from 'mongoose';
import extendBaseSchema from './baseModel';
import { mongooseTwo } from '../config/dbMultiConfig';

const itemSchema = extendBaseSchema(
  new mongoose.Schema({
    item_name: {
      type: String,
      required: true,
      alias: 'itemName',
    },
    item_price: {
      type: Number,
      required: true,
      index: true,
      alias: 'itemPrice',
    },
    is_active: {
      type: Boolean,
      default: false,
      alias: 'isActive',
    },
    description: {
      type: String,
      alias: 'description',
    },
    image: {
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

const ItemModel = mongooseTwo().model('Item', itemSchema);

export default ItemModel;
