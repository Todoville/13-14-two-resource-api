'use strict';

import mongoose from 'mongoose';
import Character from './Character';

const specialsSchema = mongoose.Schema({
  projectile: {
    type: String,
    required: true,
  },
  reversal: {
    type: String,
    required: true,
  },
  gapclose: {
    type: String,
    required: true,
  },
  commandgrab: {
    type: String,
    required: true,
  },
  characterID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Character',
  },
}, { timestamps: true });

const skipInit = process.env.NODE_ENV === 'development';

export default mongoose.model('Character', characterSchema, 'Character', skipInit); /* eslint-disable-line */

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
