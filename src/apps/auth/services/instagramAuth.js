import jwt from "jsonwebtoken";
import OAuth from "oauth";

import models from "db/models";
import { TOKEN_SECRET } from "src/config";



function authInstagramUser(code, options) {
  const OAuth2 = OAuth.OAuth2;
  const oauth2 = new OAuth2(
    '140ed0f3bb91485fbed75a12db407450',
    'e9d7bae46309404b8c79d3695ae5fee8',
    'https://api.instagram.com');

  return new Promise(
    (resolve, reject) => {
      oauth2.getOAuthAccessToken(
        code,
        options,
        (e, accessToken, refreshToken, response) => {
          if (e) {
            reject(e)
          }

          resolve({ e, accessToken, refreshToken, response })
      });
    },
  )
}

export default function(code, redirectUri) {

  const options = {
    'grant_type': 'authorization_code',
    'redirect_uri': redirectUri,
  };


  return new Promise((resolve) => {

    authInstagramUser(code, options).then(({e, accessToken, refreshToken, response}) => {

      const { user } = response;

      const localUser = models.User.findOrCreate(
        {
          where: {
            instagramId: user.id
          },
          defaults: {
            firstName: user.displayName,
            instagramId: user.id,
            instagramUsername: user.username,
            avatar: user.profile_picture,
          }
        });

      localUser.then(([userData, created]) => {
        const token = jwt.sign(user, TOKEN_SECRET);

        resolve({
          accessToken: token,
          user: {
            isNew: created,
            fullName: user.full_name,
            profilePicture: user.profile_picture
          }
        })
      })
    })

  })




}