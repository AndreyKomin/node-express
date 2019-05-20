import jwt from "jsonwebtoken";

const app = module.exports = require('express')();

import { instagramAuth } from './services'
import {TOKEN_SECRET} from "../../config";


app.post('/instagram', async (req, res) => {
  const {code, redirectUri} = req.body;

  // const response = instagramAuth(code, redirectUri);
  // console.log(response)
  // res.send(response);


  instagramAuth(code, redirectUri).then(response => {
    console.log(response)
    res.send(response);
  });


});

/*
.then(([userData, created]) => {


    const token = jwt.sign(user, TOKEN_SECRET);

    res.send({
      accessToken: token,
      user: {
        isNew: created,
        fullName: user.full_name,
        profilePicture: user.profile_picture
      }
    });
  })

  */
/*
const {omit} = require('lodash');

const {loggedIn, loggedOut} = require('app/auth');

const {login, logout, refresh, forgetPassword, signup} = require('app/actions').auth;

app.post('/signup', (req, res) => {
  signup(req.body)
    .then((user) => res.send({
      user: omit(user, 'password')
    }))
    .catch((err) => {
      res.status(400).send({msg: 'Signup failed', err});
    })
  ;
});


app.post('/login', loggedOut, (req, res) => {
  login(req.body)
    .then(({token, user, projects}) => res.send({
      token,
      user: omit(user, 'password'),
      projects
    }))
    .catch(() => {
      res.status(400).send({err: 'login failed'});
    })
  ;
});

app.get('/logout', loggedIn, (req, res) => {
  logout(req.authKey).then(() => res.send({msg: 'logged out'}));
});

*/
