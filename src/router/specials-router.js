'use strict';

import { Router } from 'express';
import HttpErrors from 'http-errors';
import logger from '../lib/logger';
import Special from '../model/Specials';

const specialsRouter = new Router();

specialsRouter.post('/api/specials', (request, response, next) => {
  Special.init()
    .then(() => {
      logger.log(logger.INFO, `SPECIALS ROUTER: POST BEFORE SAVE: ${JSON.stringify(request.body)}`);
      return new Special(request.body).save();
    })
    .then((newSpecial) => {
      logger.log(logger.INFO, `SPECIALS ROUTER: POST AFTER SAVE: ${JSON.stringify(newSpecial)}`);
      response.json(newSpecial);
    })
    .catch(next);
});

specialsRouter.get('/api/specials/:id?', (request, response, next) => {
  if (!request.params.id) {
    return next(new HttpErrors(400, 'Did not enter an ID'));
  }

  Special.init()
    .then(() => {
      return Special.findOne({ _id: request.params.id });
    })
    .then((foundSpecial) => {
      logger.log(logger.INFO, `SPECIALS ROUTER: AFTER GETTING SPECIALS ${JSON.stringify(foundSpecial)}`);
      return response.json(foundSpecial);
    })
    .catch(next);
  return undefined;
});

specialsRouter.put('/api/specials/:id?', (request, response, next) => {
  Special.init()
    .then(() => {
      return Special.findOneAndUpdate(request.params._id, request.body, { new: true }, (err, updatedSpecial) => {
        if (err) return response.status(500).send(err);
        if (!updatedSpecial) return response.status(404);
        return response.json(updatedSpecial);
      })
        .catch(next);
    });
});


specialsRouter.delete('/api/specials/:id?', (request, response, next) => {
  Special.init()
    .then(() => {
      Special.findByIdAndRemove(request.params.id, (err, special) => {
        if (err) return response.status(500).send(err);
        const deleteSuccess = {
          message: 'Special successfully deleted buddy',
          id: special._id,
        };
        return response.status(204).send(deleteSuccess);
      })
        .catch(next);
    });
});

export default specialsRouter;
