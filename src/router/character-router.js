'use strict';

import { Router } from 'express';
import logger from '../lib/logger';
import Character from '../model/Character';

const characterRouter = new Router();

characterRouter.post('/api/Characters', (request, response, next) => {
  Character.init()
    .then(() => {
      logger.log(logger.INFO, `CHARACTER ROUTER BEFORE SAVE: Saved a new character ${JSON.stringify(request.body)}`);
      return new Character(request.body).save();
    })
    .then((newCharacter) => {
      logger.log(logger.INFO, `CHARACTER ROUTER AFTER SAVE: Saved a new character ${JSON.stringify(newCharacter)}`);
      return response.JSON(newCharacter);
    })
    .catch(next);
});

characterRouter.get('/api/Characters/:id?', (request, response, next) => {
  Character.init()
    .then(() => {
      return Character.findOne({ _id: request.params.id });
    })
    .then((foundCharacter) => {
      logger.log(logger.INFO, `CHARACTER ROUTER: FOUND THAT MODEL BAYBEE, ${JSON.stringify(foundCharacter)}`);
      response.JSON(foundCharacter);
    })
    .catch(next);
});

export default characterRouter;
