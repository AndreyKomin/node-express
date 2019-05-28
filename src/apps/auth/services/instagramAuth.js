import jwt from 'jsonwebtoken';
import OAuth from 'oauth';
import { User } from 'src/db/models';
import { INSTAGRAM } from 'src/config/authProviders';

import {
  TOKEN_SECRET,
  INSTAGRAM_CLIENT_ID,
  INSTAGRAM_CLIENT_SECRET,
} from 'src/config';

function authInstagramUser(code, options) {
  const { OAuth2 } = OAuth;
  const oauth2 = new OAuth2(
    INSTAGRAM_CLIENT_ID,
    INSTAGRAM_CLIENT_SECRET,
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

const instagramAuth = async (code, redirectUri) => {
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

  const { user: instagramUser } = response;

  if (error) {
    throw new Error(error);
  }

  const queryFindUser = {
    'auth.providers.name': INSTAGRAM,
    'auth.providers.userId': instagramUser.id,
  };

  let user = await User.findOne(queryFindUser).exec();
  let isNew = false;

  if (user === null) {
    const newUser = {
      fullName: instagramUser.full_name,
      avatar: instagramUser.profile_picture,
      auth: {
        providers: [
          {
            name: INSTAGRAM,
            userId: instagramUser.id,
            username: instagramUser.username,
            accessToken,
            refreshToken,
          },
        ],
      },
    };

    user = await User.create(newUser);
    isNew = true;
  }

  const {
    _id: id,
    fullName,
    avatar,
    role,
  } = user;

  const userPayload = {
    id,
    role,
  };

  const token = jwt.sign(userPayload, TOKEN_SECRET);

  return {
    accessToken: token,
    user: {
      isNew,
      ...userPayload,
      fullName,
      avatar,
    },
  };
};

export default instagramAuth;
