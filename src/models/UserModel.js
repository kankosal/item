/* eslint-disable import/no-cycle */
import mongoose from 'mongoose';
import extendBaseSchema from './baseModel';
import { mongooseOne } from '../config/dbMultiConfig';

const userSchema = extendBaseSchema(
  new mongoose.Schema({
    firstname: {
      type: String,
      default: null,
    },
    lastname: {
      type: String,
      default: null,
    },
    team_id: {
      type: mongoose.SchemaTypes.ObjectId,
      default: null,
      alias: 'teamId',
    },
    is_active: {
      type: Boolean,
      default: false,
      alias: 'isActive',
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

const UserModel = mongooseOne().model('User', userSchema);

export default UserModel;
