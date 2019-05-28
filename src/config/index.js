import USER_ROLES from './userRoles';
import AUTH_PROVIDERS from './authProviders';

require('dotenv').config();

const {
  TOKEN_SECRET,
  INSTAGRAM_CLIENT_ID,
  INSTAGRAM_CLIENT_SECRET,
} = process.env;

export {
  TOKEN_SECRET,

  INSTAGRAM_CLIENT_ID,
  INSTAGRAM_CLIENT_SECRET,

  USER_ROLES,
  AUTH_PROVIDERS,
};
