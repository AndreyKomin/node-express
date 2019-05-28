import mongoose, { Schema } from 'mongoose';
import {
  USER_ROLES,
  AUTH_PROVIDERS,
} from 'src/config';
import { BASE } from 'src/config/userRoles';

const UserSchema = new Schema({
  email: String,
  password: String,
  fullName: String,
  avatar: String,
  role: {
    type: String,
    enum: USER_ROLES,
    default: BASE,
  },
  balance: {
    total: Number,
    expenses: Number,
  },
  auth: {
    oauthProviders: [
      {
        name: {
          type: String,
          enum: AUTH_PROVIDERS,
        },
        userId: String,
        username: String,
        accessToken: String,
      },
    ],
  },
  info: {
    address: {
      city: String,
      postalCode: Number,
      addressLine: String,
    },
  },
});

export default mongoose.model('User', UserSchema);
