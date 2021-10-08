import 'reflect-metadata';
import { BaseEntity, createConnection } from 'typeorm';
import { router as users } from './users';
import { router as posts } from './posts';
import express, { json, Request, Response } from 'express';
const app = express();

app.use(express.json());

const PORT = 5000;

app.use('/users', users);
app.use('/posts', posts);

createConnection()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`app start at port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
