'use strict';

import { Router } from 'express';
import HttpErrors from 'http-errors';
import logger from '../lib/logger';
import Special from '../model/Specials';

const specialsRouter = new Router();

specialsRouter.post('/api/Specials', (request, response, next) => {
  Special.init()
    .then(() => {
      logger.log(logger.INFO, `SPECIALS ROUTER: POST BEFORE SAVE: ${JSON.stringify(request.body)}`);
      return new Special(request.body).save();
    })
    .then((newSpecial) => {
      logger.log(logger.INFO, `SPECIALS ROUTER: POST AFTER SAVE: ${JSON.stringify(newSpecial)}`);
      response.JSON(newSpecial);
    })
    .catch(next);
});

specialsRouter.get('/api/Specials/:id?', (request, response, next) => {
  if (!request.params.id) {
    return next(new HttpErrors(400, 'Did not enter an ID'));
  }

  Special.init()
    .then(() => {
      return Special.findOne({ _id: request.params.id });
    })
    .then((foundSpecial) => {
      logger.log(logger.INFO, `SPECIALS ROUTER: AFTER GETTING SPECIALS ${JSON.stringify(foundSpecial)}`);
      return response.JSON(foundSpecial);
    })
    .catch(next);
  return undefined;
});

export default specialsRouter;
