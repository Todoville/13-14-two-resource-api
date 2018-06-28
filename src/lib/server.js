'use strict';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import logger from './logger';
import characterRouter from '../router/character-router';
import specialsRouter from '../router/specials-router';

import errorMiddleWare from '../lib/middleware/error-middleware';
import loggerMiddleWare from '../lib/middlware/logger-middleware';

const app = express();
