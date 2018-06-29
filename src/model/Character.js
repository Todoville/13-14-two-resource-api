'use strict';

import mongoose from 'mongoose';

const characterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  charge: {
    type: String,
    unique: false,
  },
  specials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Specials',
    },
  ], 
}, { timestamps: true });

characterSchema.pre('findOne', function preHookCallback(done) {
  this.populate('specials');
  done();
});

const skipInit = process.env.NODE_ENV === 'development';
export default mongoose.model('characters', characterSchema, 'characters', skipInit);
