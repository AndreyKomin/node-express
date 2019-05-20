const BearerStrategy = require('passport-http-bearer').Strategy;

import passport from "passport";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "src/config";

passport.use(new BearerStrategy(
  function (token, done) {
    jwt.verify(token, TOKEN_SECRET, function(err, user) {

      if (err) { return done(null) }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'read' });

    });
  }
));
