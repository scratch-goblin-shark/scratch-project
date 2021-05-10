const express = require('express');
const path = require('path');

const app = express();

const userController = require('./controllers/userController');

app.use(express.static('../client/assets'));
app.use(express.json());

app.get('/', (request, response) => {
  response.status(200).send(path.join(__dirname, '../index.html'));
});

app.get('/build', (request, response) => {
  response.status(200).send(path.join(__dirname, '../build/bundle.js'));
})

app.post('/login',
  userController.verifyUser,
  userController.updateLastLoginDate,
  (request, response) => {
    return response.status(200).json({ userVerified: true, message: 'User Found.' });
  }
);

app.post('/signup',
  userController.createUser,
  (request, response) => {
    return response.status(200).json({ newUserCreated: true, message: 'New user successfully created.' });
  }
);

app.get('*', (request, response) => {
  response.status(404).send('Nothing here');
})

app.use((error, request, response, next) => {
  const defaultError = {
    status: 500,
    log: 'Problem in some middleware.',
    message: 'Serverside problem.',
  }
  const ourError = Object.assign(defaultError, error);

  console.log(ourError.log);

  response.status(ourError.status).send(ourError.message);
});


app.listen(3000);