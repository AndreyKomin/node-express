require('dotenv').config();
// const cluster = require('express-cluster');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const cors = require('cors');
import "src/apps/auth/services/checkAuth";


const {printIp, handleAsyncExceptions} = require('./util');

const config = require('../config/server');
const routes = require('./router');

function run() {
  const app = express();

  app.use(helmet()); // https://helmetjs.github.io/docs/
  // app.use(helmet.hidePoweredBy())

  app.set('root', `${__dirname}/..`);

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({extended: true}));
  // parse application/json
  app.use(bodyParser.json({limit: '50mb'}));
  // enable cors
  app.use(cors());

  switch (process.env.NODE_ENV) {
    case 'production':
      // trust proxy in production from local nginx front server
      app.set('trust proxy', 'loopback');

      // enable cors in dev
      app.use(cors());

      // set the base uri
      app.set('baseUrl', config.baseUrl);

      // mount the routes
      app.use('/api/v1', routes);

      // mount server cluster
      cluster((worker) => app.listen(config.port, config.host, () => {
        console.log(`worker ${worker.id} online`);
      }));
      break;

    default:
      // enable cors in dev
      app.use(cors());

      // handle errors and send them back to browser
      app.use(errorhandler());

      // set the base uri
      app.set('baseUrl', config.baseUrl);

      // mount the routes
      app.use('/api/v1', routes);

      // mount server
      app.listen(config.port, config.host, () => {
        console.log(`app running on http://${config.host}:${config.port}`);
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
