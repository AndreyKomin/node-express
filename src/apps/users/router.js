import { loggedIn } from 'src/apps/auth/middleware';

const app = module.exports = require('express')();

app.get('/example', loggedIn, (req, res) => {
  res.send({ msg: 1 });
});
