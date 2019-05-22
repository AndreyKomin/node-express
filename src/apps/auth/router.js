import express from 'express';
import { wrapAsync } from 'src/util';
import expressJoi from 'express-joi-validator';
import Joi from 'joi';
import { instagramAuth } from './services';

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

export default app;
