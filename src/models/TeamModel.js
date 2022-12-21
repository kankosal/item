/* eslint-disable import/no-cycle */
import mongoose from 'mongoose';
import extendBaseSchema from './baseModel';
import { mongooseTwo } from '../config/dbMultiConfig';

const teamSchema = extendBaseSchema(
  new mongoose.Schema({
    team_name: {
      type: String,
      required: true,
      alias: 'teamName',
    },
    is_active: {
      type: Boolean,
      default: false,
      alias: 'isActive',
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

const TeamModel = mongooseTwo().model('Team', teamSchema);

export default TeamModel;
