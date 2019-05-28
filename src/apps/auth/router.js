import express from 'express';
import Joi from 'joi';
import { validateRequest, wrapAsync } from 'src/middlewares';
import { instagramAuth } from './services';

const app = express();

const schema = {
  body: {
    clientId: Joi.string().required(),
    redirectUri: Joi.string().required(),
    code: Joi.string().required(),
  },
};

app.post('/instagram', validateRequest(schema), wrapAsync(async (req, res) => {
  const { code, redirectUri } = req.body;

  const response = await instagramAuth(code, redirectUri);

  res.json(response);
}));

export default app;
