'use strict';

import mongoose from 'mongoose';

const characterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  charge: {
    type: Boolean,
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
  this.populate('Specials');
  done();
});

const skipInit = process.env.NODE_ENV === 'development';
export default mongoose.model('Characters', characterSchema, 'Characters', skipInit);
