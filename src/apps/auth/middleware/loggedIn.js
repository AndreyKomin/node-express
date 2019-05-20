import passport from "passport";

export default (req, res, next) => {
  passport.authenticate('bearer', {session: false}, function (err, user, info) {
    if (err) {
      return res.json({ error: info.message || 'Invalid Token' })
    }

    //authentication error
    if (!user) {
      return res.json({ error: info.message || 'Invalid Token' })
    }

    return next();

  })(req, res, next)
}