/* eslint-disable import/no-cycle */
import mongoose from 'mongoose';
import extendBaseSchema from './baseModel';
import { mongooseTwo } from '../config/dbMultiConfig';

const heroSchema = extendBaseSchema(
  new mongoose.Schema({
    hero_name: {
      type: String,
      required: true,
      alias: 'heroName',
    },
    is_active: {
      type: Boolean,
      default: false,
      alias: 'isActive',
    },
    role_name: {
      type: String,
      alias: 'roleName',
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
    team_id: {
      type: mongoose.SchemaTypes.ObjectId,
      default: null,
      alias: 'teamId',
    },
  })
);

const HeroModel = mongooseTwo().model('Heroes', heroSchema);

export default HeroModel;
