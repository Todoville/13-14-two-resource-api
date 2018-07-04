'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import Character from '../model/Character';
import Special from '../model/Specials';
import createMockDataPromise from './lib/specialMock';

const apiUrl = `http://localhost:${process.env.PORT}/api/specials`;
describe('api/specials', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(() => {
    Promise.all([
      Character.remove({}),
      Special.remove({}),
    ]);
  }); 

  describe('PUT /api/specials', () => {
    test('200 PUT for successful updating of a special move', () => {
      return createMockDataPromise()
        .then((mockData) => {
          console.log(mockData, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
          return superagent.put(`${apiUrl}/${mockData.special._id}`)
            .send({ name: 'Flash Kick', style: 'Reversal' })
            .then((response) => {
              console.log(response.body);
              expect(response.status).toEqual(200);
              expect(response.body.name).toEqual('Flash Kick');
              expect(response.body.style).toEqual('Reversal');
              expect(response.body._id.toString()).toEqual(mockData.special._id.toString());
            })
            .catch((err) => {
              throw err;
            });
        })
        .catch((err) => {
          throw err;
        });
    });
  });

  describe('POST /api/specials', () => {
    test('200 POST for successful posting of a special move', () => {
      return createMockDataPromise()
        .then((mockData) => {
          const mockSpecial = {
            name: 'Shoryuken',
            style: 'Reversal',
            characterID: mockData.Character._id,
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

  describe('DELETE /api/specials', () => {
    test('200 DELETE for successful deleting of a special', () => {
      return createMockDataPromise()
        .then((mockData) => {
          console.log(mockData, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
          return superagent.del(`${apiUrl}/${mockData.special._id}`);
        })
        .then((response) => {
          expect(response.status).toEqual(204);
        })
        .catch((err) => {
          throw err;
        });
    });
  });
});
