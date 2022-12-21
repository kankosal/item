/* istanbul ignore file */
import mongoose from 'mongoose';

const { Schema } = mongoose;

const baseSchema = new Schema({});

// Attach soft delete hook condition
baseSchema.pre(
  [
    'count',
    'countDocuments',
    'deleteMany',
    'deleteOne',
    'find',
    'findOne',
    'findOneAndDelete',
    'findOneAndRemove',
    'findOneAndUpdate',
    'remove',
    'update',
    'updateOne',
    'updateMany',
  ],
  function (next) {
    // modify query condition
    if (!this._conditions.with_trashed && !this._conditions.deleted_at) {
      this.where({ deleted_at: false });
    } else if (this._conditions.deleted_at) {
      this.where({ deleted_at: { $ne: false } });
    }

    // remove with_trashed element
    delete this._conditions.with_trashed;
    next();
  }
);

// Aggregation Hooks
baseSchema.pre('aggregate', function (next) {
  let excludeTrashed = false;
  let trashedOnly = false;
  for (let i = 0; i < this._pipeline.length; i += 1) {
    const element = this._pipeline[i];
    if (element.$match) {
      if (!element.$match.with_trashed && !element.$match.deleted_at) {
        excludeTrashed = true;
      } else {
        if (element.$match.deleted_at) {
          trashedOnly = true;
          delete element.$match.deleted_at;
        }

        // remove withTrashed element
        if (element.$match.with_trashed) {
          delete element.$match.with_trashed;
        }
      }
    }
  }

  if (excludeTrashed) {
    // Add a $match state to the beginning of each pipeline.
    this.pipeline().unshift({ $match: { deleted_at: 0 } });
  } else if (trashedOnly) {
    this.pipeline().unshift({ $match: { deleted_at: { $ne: 0 } } });
  }

  next();
});

baseSchema.methods = {
  async softDelete() {
    try {
      this.deleted_at = Date.now();
      await this.save();
      return { ok: 1 };
    } catch (err) {
      return { ok: 0 };
    }
  },
};

const extendBaseSchema = (childSchema = new Schema({})) => {
  const newChildSchema = childSchema;
  // assign base hook
  newChildSchema.s.hooks = baseSchema.s.hooks;
  // assign base method
  newChildSchema.methods = baseSchema.methods;

  return newChildSchema;
};

export default extendBaseSchema;
