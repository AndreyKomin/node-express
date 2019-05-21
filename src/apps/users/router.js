import express from 'express';
import { loggedIn } from 'src/apps/auth/middleware';

const app = express();

app.get('/example', loggedIn, (req, res) => {
  res.send({ msg: 1 });
});

export default app;
