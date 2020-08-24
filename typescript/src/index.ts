import express from 'express';

import { index } from './routes';

const api = express();

api.get('/', index);

api.listen(3333);