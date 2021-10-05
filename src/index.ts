import 'reflect-metadata';
import { BaseEntity, createConnection } from 'typeorm';
import { User } from './entity/User';

import express from 'express';

createConnection()
  .then(async (connection) => {
    console.log('Inserting a new user into the database...');

    const user = new User();
    user.name = 'Ivan';
    user.email = 'ivan@mail.com';
    user.role = 'admin';

    await user.save();

    console.log('User created!');

    // await connection.manager.save(user);
    // console.log('Saved a new user with id: ' + user.id);

    // console.log('Loading users from the database...');
    // const users = await connection.manager.find(User);
    // console.log('Loaded users: ', users);

    // console.log('Here you can setup and run express/koa/any other framework.');
  })
  .catch((error) => console.log(error));

const app = express()