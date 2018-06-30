'use strict';

import Character from '../../model/Character'

export default () => {
  const mockResourceToPost = {
    name: 'Hadouken',
  };
  return new Character(mockResourceToPost).save();
};
