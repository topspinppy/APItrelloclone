// import
import path from 'path';
import mongoose from 'mongoose';
import config from './config';
import mongooseClient from './libraries/database/client/mongoose';
import Koa from 'koa';
import cors from '@koa/cors';
import { load } from 'koa-decorator';
import bodyParser from 'koa-bodyparser';
import route from 'koa-router';


// middlewares
const app = new Koa();
const router = new route();
const serve = require('koa-static');

app.use(serve('uploads'));
app.use(cors());
app.use(bodyParser());

// call env
require('dotenv').config();

// load router
const apiRouter = load(
  path.resolve(__dirname, 'controllers'),
  '.controller.js'
);
app.use(apiRouter.routes());
app.use(
  apiRouter.allowedMethods({
    throw: true
  })
);

// connect Database
if (config.database.databaseURI) {
  mongooseClient(config.database.databaseURI)
    .then((dbClient) => {
      console.log(
        `Connected Database to ${dbClient.host}:${dbClient.port}/${
          dbClient.name
        }`
      );
    })
    .catch((err) => {
      console.error('Unable to start server!', err);
      process.exit(1);
    });
}

app.listen(config.system.port, () => {
  console.log('listen on' + config.system.port);
});