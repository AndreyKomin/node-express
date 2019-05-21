import jwt from 'jsonwebtoken';
import OAuth from 'oauth';

import models from 'db/models';
import { TOKEN_SECRET } from 'src/config';


function authInstagramUser(code, options) {
  const { OAuth2 } = OAuth;
  const oauth2 = new OAuth2(
    process.env.INSTAGRAM_CLIENT_ID,
    process.env.INSTAGRAM_CLIENT_SECRET,
    'https://api.instagram.com',
  );

  return new Promise(
    (resolve, reject) => {
      oauth2.getOAuthAccessToken(
        code,
        options,
        (e, accessToken, refreshToken, response) => {
          if (e) {
            reject(e);
          }

          resolve({
            e, accessToken, refreshToken, response,
          });
        },
      );
    },
  );
}

export default async function (code, redirectUri) {
  const options = {
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
  };

  const {
    error,
    accessToken,
    refreshToken,
    response,
  } = await authInstagramUser(code, options);

  const { user } = response;

  const [
    userData,
    created,
  ] = await models.User.findOrCreate(
    {
      where: {
        instagramId: user.id,
      },
      defaults: {
        firstName: user.displayName,
        instagramId: user.id,
        instagramUsername: user.username,
        avatar: user.profile_picture,
      },
    },
  );

  if (userData) {
    const token = jwt.sign(user, TOKEN_SECRET);

    return {
      accessToken: token,
      user: {
        isNew: created,
        id: userData.dataValues.id,
        firstName: userData.dataValues.firstName,
        avatar: userData.dataValues.avatar,
      },
    };
  }
}
