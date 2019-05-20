const app = module.exports = require('express')();

import { loggedIn } from 'src/apps/auth/middleware';

app.get('/example', loggedIn, (req, res) => {
    res.send({ msg: 1 });
  });

