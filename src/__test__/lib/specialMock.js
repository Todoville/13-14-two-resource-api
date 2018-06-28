'use strict';

import Special from '../../model/Special';
import characterMockPromise from './characterMock';

export default () => {
  const mockData = {};
  return characterMockPromise()
    .then((newCharacter) => {
      mockData.Character = newCharacter;
    })
    .then(() => {
      const mockSpecial = {
        reversal: 'shoryuken',
        characterId: mockData.character._id,
      };
      return new Special(mockSpecial).save();
    })
    .then((newSpecial) => {
      mockData.special = newSpecial;
      return mockData;
    })
    .catch((err) => {
      throw err;
    });
};
