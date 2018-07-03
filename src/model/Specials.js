'use strict';

import mongoose from 'mongoose';
import Character from './Character';

const specialsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  style: {
    required: true,
    type: String,
    enum: ['Reversal', 'Projectile', 'Gap Closer', 'Command Grab'],
  },
  characterID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Character',
  },
}, { timestamps: true });

const skipInit = process.env.NODE_ENV === 'development';

export default mongoose.model('Character', specialsSchema, 'Character', skipInit); /* eslint-disable-line */

function specialsPreHook(done) {
  return Character.findById(this.characterID)
    .then((foundCharacter) => {
      foundCharacter.specials.push(this._id);
      return foundCharacter.save();
    })
    .then(() => done())
    .catch(done);
}

function specialsPostHook(document, done) {
  return Character.findById(document.characterID)
    .then((foundCharacter) => {
      foundCharacter.specials = foundCharacter.specials.filter(specials => specials._id.toString() !== document._id.toString());
      return foundCharacter.save();
    })
    .then(() => done())
    .catch(done);
}

specialsSchema.pre('save', specialsPreHook);
specialsSchema.post('remove', specialsPostHook);
