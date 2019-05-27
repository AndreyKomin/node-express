import express from 'express';
import { wrapAsync } from 'src/util';
import expressJoi from 'express-joi-validator';
import Joi from 'joi';
import models from 'db/models';
import { instagramAuth } from './services';

const uuidv4 = require('uuid/v4');

const { User, AuthProvider } = models;

const app = express();

const bodySchema = {
  body: {
    clientId: Joi.string().required(),
    redirectUri: Joi.string().required(),
    code: Joi.string().required(),
  },
};

app.post('/instagram', expressJoi(bodySchema), wrapAsync(async (req, res) => {
  const { code, redirectUri } = req.body;

  const response = await instagramAuth(code, redirectUri);

  res.json(response);
}));


// User.sync({ force: true });
// AuthProvider.sync({ force: true });

// User.sync({ force: true }).then(() => {
//   const uuid = uuidv4();
//
//   // Table created
//   return User.create({
//     id: uuid,
//     authProvider: {
//       userId: uuid,
//       providerType: 'instagram',
//     },
//   }, {
//     include: [AuthProvider],
//   });
// });


app.get('/sync', wrapAsync(async (req, res) => {
  const uuid = uuidv4();

  const result1 = await User.create({
    id: uuid,
    authProvider: {
      userId: uuid,
      providerType: 'instagram',
    },
  }, {
    include: [{
      association: AuthProvider,
      as: 'authProvider',
    }],
  });
  //
  // console.log(result1);

  // const result2 = await AuthProvider.create({
  //
  //   userId: '50a634b3-cc51-4b36-aca2-ccb639d9d1b3',
  //   providerType: 'instagram',
  //
  // });

  res.json(result1);
}));

export default app;
