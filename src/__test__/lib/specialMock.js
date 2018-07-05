'use strict';

import Special from '../../model/Specials';
import characterMockPromise from './characterMock';

export default () => {
  const mockData = {};
  return characterMockPromise()
    .then((newCharacter) => {
      mockData.Character = newCharacter;
    })
    .then(() => {
      const mockSpecial = {
        name: 'Shoryuken',
        style: 'Reversal',
        characterID: mockData.Character._id,
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
