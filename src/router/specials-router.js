'use strict';

import { Router } from 'express';
import HttpErrors from 'http-errors';
import logger from '../lib/logger';
import Specials from '../model/Specials';

const specialsRouter = new Router();

specialsRouter.post('/api/Specials', (request, response, next) => {
  Specials.init()
    .then(() => {
      logger.log(logger.INFO, `SPECIALS ROUTER: POST BEFORE SAVE: ${JSON.stringify(request.body)}`);
      return new Specials(request.body).save();
    })
    .then((newSpecials) => {
      logger.log(logger.INFO, `SPECIALS ROUTER: POST AFTER SAVE: ${JSON.stringify(newSpecials)}`);
      response.JSON(newSpecials);
    })
    .catch(next);
});

specialsRouter.get('/api/Specials/:id?', (request, response, next) => {
  if (!request.params.id) {
    return next(new HttpErrors(400, 'Did not enter an ID'));
  }

  Specials.init()
    .then(() => {
      return Specials.findOne({ _id: request.params.id });
    })
    .then((foundSpecials) => {
      logger.log(logger.INFO, `SPECIALS ROUTER: AFTER GETTING SPECIALS ${JSON.stringify(foundSpecials)}`);
      return response.JSON(foundSpecials);
    })
    .catch(next);
  return undefined;
});

export default specialsRouter;
