'use strict';

import Character from '../../model/Character';

export default () => {
  const mockResourceToPost = {
    name: 'Ken',
    charge: false,
    specials: [],
  };
  return new Character(mockResourceToPost).save();
};
