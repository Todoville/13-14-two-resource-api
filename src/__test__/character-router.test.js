'use strict';

import superagent from 'superagent';
import { startServer } from '../lib/server';
import Character from '../model/character';
import createMockCharactersPromise from './lib/charactersMock';

const apiUrl = `http://localhost:${process.env.PORT}/api/characters`;

beforeAll(startServer);
afterAll(stopServer);
afterEach(() => Character.remove({}));

describe('POST /api/characters', () => {
  const mockResource = {
    projectile: 'hadouken',
    reversal: 'shoryuken',
    gapclose: 'tatsu',
    commandgrab: null, 
  };

  test('200 POST for successful post of a character', () => {
    return superagent.post(apiUrl)
      .send(mockResource)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.projectile).toEqual(mockResource.projectile);
        expect(response.body.reversal).toEqual(mockResource.reversal);
        expect(response.body.gapclose).toEqual(mockResource.gapclose);
        expect(response.body.commandgrab).toEqual(mockResource.commandgrab);
        expect(response.body._id).toBeTruthy();
      })
      .catch((err) => {
        throw err;
      });
  });
});

describe('GET /api/characters', () => {
  test('200 GET for successful fetching of special move list', () => {
    let returnedCharacter;
    return createMockCharactersPromise()
      .then((newCharacter) => {
        returnedCharacter = newCharacter;
        return superagent.get(`${apiUrl}/${newCharacter._id}`);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.projectile).toEqual(returnedCharacter.projectile);
        expect(response.body.reversal).toEqual(returnedCharacter.reversal);
        expect(response.body.gapclose).toEqual(returnedCharacter.gapclose);
        expect(response.body.commandgrab).toEqual(returnedCharacter.commandgrab);
      })
      .catch((err) => {
        throw err;
      });
  });
});
