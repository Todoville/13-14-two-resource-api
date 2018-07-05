'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import Character from '../model/Character';
import createMockCharactersPromise from './lib/characterMock';

const apiUrl = `http://localhost:${process.env.PORT}/api/characters`;

describe('api/characters', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(() => Character.remove({}));

  describe('POST /api/characters', () => {
    const mockRyu = {
      name: 'Ryu',
      charge: false,
      specials: [],
    
    };

    test('200 POST for successful post of a character', () => {
      return superagent.post(apiUrl)
        .send(mockRyu)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual(mockRyu.name);
          expect(response.body.charge).toEqual(mockRyu.charge);
          expect(response.body._id).toBeTruthy();
        })
        .catch((err) => {
          throw err;
        });
    });
  });

  describe('GET /api/characters', () => {
    test('200 GET for successful fetching of character', () => {
      let returnedCharacter;
      return createMockCharactersPromise()
        .then((newCharacter) => {
          returnedCharacter = newCharacter;
          return superagent.get(`${apiUrl}/${newCharacter._id}`);
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual(returnedCharacter.name);
          expect(response.body.charge).toEqual(returnedCharacter.charge);
        })
        .catch((err) => {
          throw err;
        });
    });
  });
});
