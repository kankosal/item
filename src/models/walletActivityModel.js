import mongoose from 'mongoose';
import extendBaseSchema from './baseModel';
import { mongooseOne } from '../config/dbMultiConfig';

const walletActivitySchema = extendBaseSchema(
  new mongoose.Schema({
    mysabay_user_id: {
      type: 'string',
      required: true,
      index: true,
      alias: 'mysabayUserId',
    },
    wallet_address: {
      type: 'string',
      required: true,
      index: true,
      alias: 'walletAddress',
    },
    action_type: {
      type: 'string',
      required: true,
      index: true,
      alias: 'actionType',
    },
    action_date: {
      type: 'number',
      required: true,
      index: true,
      alias: 'actionDate',
    },
    description: {
      type: 'string',
      default: null,
    },
    info: {
      type: 'mixed',
      default: null,
    },
    status: {
      type: 'number',
      required: true,
    },
    created_at: {
      type: 'number',
      required: true,
      alias: 'createdAt',
    },
    updated_at: {
      type: 'number',
      default: 0,
      alias: 'updatedAt',
    },
    deleted_at: {
      type: 'number',
      default: 0,
      alias: 'deletedAt',
    },
  })
);

const WalletActivityModel = mongooseOne().model(
  'Wallet_Activity',
  walletActivitySchema
);

export default WalletActivityModel;
