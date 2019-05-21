import express from 'express';
import auth from './apps/auth/router';
import users from './apps/users/router';

const app = express();

app.get('/', (req, res) => {
  res.send({ msg: 'hello! Server is up and running' });
});

app.use('/auth', auth);
app.use('/users', users);
// app.use('/projects', require('./projects'));
// app.use('/tasks', require('./tasks'));

// the catch all route
app.all('*', (req, res) => {
  res.status(404).send({ msg: 'not found' });
});

export default app;
