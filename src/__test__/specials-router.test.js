'use strict';

import superagent from 'superagent';
import { start } from 'repl';
import { startServer, stopServer } from '../lib/server';
import Character from '../model/Character';
import Special from '../model/Special';
import createMockDataPromise from './lib/SpecialMock';

const apiUrl = `http://localhost: ${process.env.PORT}/api/students`;

beforeAll(startServer);
afterAll(stopServer);
afterEach(() => {
  Promise.all([
    Character.remove({}),
    Special.remove({}),
  ]);
});

describe('POST /api/specials', () => {
  test('200 POST for successful posting of a special move', () => {
    return createMockDataPromise()
      .then((mockData) => {
        const mockSpecial = {
          projectile: 'hadouken',
          reversal: 'shoryuken',
          gapclose: 'tatsu',
          commandgrab: null, 
          characterId: mockData.Character._id,
        };

        return superagent.post(apiUrl)
          .send(mockSpecial)
          .then((response) => {
            expect(response.status).toEqual(200);
          })
          .catch((err) => {
            throw err;
          });
      });
  });
});

describe('GET /api/specials', () => {
  test('200 GET for successful fetching of a special', () => {
    return createMockDataPromise()
      .then((mockData) => {
        return superagent.get(`${apiUrl}/${mockData.special._id}`);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
      })
      .catch((err) => {
        throw err;
      });
  });
});
