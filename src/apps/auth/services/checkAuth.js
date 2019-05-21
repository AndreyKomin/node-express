import passport from 'passport';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from 'src/config';

const BearerStrategy = require('passport-http-bearer').Strategy;

passport.use(new BearerStrategy(
  ((token, done) => {
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
      if (err) { return done(null, false); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'read' });
    });
  }),
));
