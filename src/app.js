import 'src/apps/auth/services/checkAuth';
import routes from './router';
import 'src/db';

import { printIp, handleAsyncExceptions } from './utils';

require('dotenv').config();
// const cluster = require('express-cluster');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('errorhandler');
const cors = require('cors');

const {
  NODE_ENV,
  APP_HOST,
  APP_PORT,
  APP_BASE_URL,
} = process.env;

function run() {
  const app = express();

  app.use(morgan('dev'));

  app.use(helmet()); // https://helmetjs.github.io/docs/
  app.use(helmet.hidePoweredBy());

  app.set('root', `${__dirname}/..`);

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.set('baseUrl', APP_BASE_URL);

  switch (NODE_ENV) {
    case 'production':
      // trust proxy in production from local nginx front server
      app.set('trust proxy', 'loopback');
      app.use('/api/v1', routes);

      // mount server cluster
      /*
      TODO: Implement Clustering logic like here: https://medium.com/tech-tajawal/clustering-in-nodejs-utilizing-multiple-processor-cores-75d78aeb0f4f
      cluster(worker => app.listen(APP_PORT, APP_HOST, () => {
        console.log(`worker ${worker.id} online`);
      }));
      */
      break;

    default:
      app.use('/api/v1', routes);
      app.use(errorHandler());

      app.listen(APP_PORT, APP_HOST, () => {
        // eslint-disable-next-line no-console
        console.log(`App running on http://${APP_HOST}:${APP_PORT}`);
        printIp();
      });
      break;
  }
}

module.exports = run;

if (require.main === module) {
  handleAsyncExceptions();
  run();
}
