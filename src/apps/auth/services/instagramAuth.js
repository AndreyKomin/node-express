import jwt from 'jsonwebtoken';
import OAuth from 'oauth';
import models from 'db/models';

const { TOKEN_SECRET } = process.env;
const { User } = models;

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
        (error, accessToken, refreshToken, response) => {
          if (error) {
            reject(error);
          }

          resolve({
            error, accessToken, refreshToken, response,
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
    // accessToken,
    // refreshToken,
    response,
  } = await authInstagramUser(code, options);

  const { user } = response;

  if (error) {
    throw new Error(error);
  }

  const [
    userData,
    created,
  ] = await User.findOrCreate(
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

  if (userData && !userData.dataValues) {
    throw new Error('User creation/sign up error');
  }

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
