'use strict';

import { Router } from 'express';
import logger from '../lib/logger';
import Character from '../model/Character';

const characterRouter = new Router();

characterRouter.post('/api/characters', (request, response, next) => {
  Character.init()
    .then(() => {
      logger.log(logger.INFO, `CHARACTER ROUTER BEFORE SAVE: Saved a new character ${JSON.stringify(request.body)}`);
      return new Character(request.body).save();
    })
    .then((newCharacter) => {
      logger.log(logger.INFO, `CHARACTER ROUTER AFTER SAVE: Saved a new character ${JSON.stringify(newCharacter)}`);
      return response.json(newCharacter);
    })
    .catch(next);
});

characterRouter.get('/api/characters/:id?', (request, response, next) => {
  Character.init()
    .then(() => {
      return Character.findOne({ _id: request.params.id });
    })
    .then((foundCharacter) => {
      logger.log(logger.INFO, `CHARACTER ROUTER: FOUND THAT MODEL BAYBEE, ${JSON.stringify(foundCharacter)}`);
      response.json(foundCharacter);
    })
    .catch(next);
});

characterRouter.put('/api/characters/:id?', (request, response, next) => {
  Character.init()
    .then(() => {
      return Character.findOneAndUpdate(request.params._id, request.body, { new: true }, (err, updatedCharacter) => {
        if (err) return response.status(500).send(err);
        return response.json(updatedCharacter);
      })
        .catch(next);
    });
});

characterRouter.delete('/api/characters/:id?', (request, response, next) => {
  Character.init()
    .then(() => {
      Character.findByIdAndRemove(request.params._id, (err, character) => {
        if (err) return response.status(500).send(err);
        const deleteSuccess = {
          message: 'Character successfully deleted my pal',
          id: character._id,
        };
        return response.status(200).send(deleteSuccess);
      })
        .catch(next);
    });
});

export default characterRouter;
