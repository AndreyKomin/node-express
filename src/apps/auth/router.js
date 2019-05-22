import express from 'express';
import { wrapAsync } from 'src/util';
import { instagramAuth } from './services';

const app = express();

app.post('/instagram', wrapAsync(async (req, res) => {
  const { code, redirectUri } = req.body;

  const response = await instagramAuth(code, redirectUri);

  res.json(response);
}));

export default app;
