'use strict';

import Character from '../../model/Character'

export default () => {
  const mockResourceToPost = {
    projectile: 'hadouken',
  };
  return new Character(mockResourceToPost).save();
};
