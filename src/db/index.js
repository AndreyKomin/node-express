import mongoose from 'mongoose';

require('dotenv').config();

const {
  MONGO_DB_USERNAME,
  MONGO_DB_PASSWORD,
  MONGO_DB_NAME,
  MONGO_DB_HOSTNAME,
  MONGO_DB_PORT,
} = process.env;

mongoose.connect(
  `mongodb://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOSTNAME}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`,
  { useNewUrlParser: true },
);
