import 'reflect-metadata';

import express from 'express';
import routes from './routes';
import uploadConfig from './config/upload';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World 2021' });
});

app.listen(3333, () => {
  console.log('🚀 Server started!');
});
