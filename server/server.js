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
  userController.getMoodHistory,
  userController.updateLastLoginDate,
  (request, response) => {
    const responseObject = {
      userVerified: true,
      message: 'User Found.',
      firstName: response.locals.user[0].firstname,
      addiction: response.locals.user[0].addiction,
      emergencyContactName: response.locals.user[0].emergencycontactname,
      emergencyContactPhone: response.locals.user[0].emergencycontactphone,
      lastLoginDate: response.locals.user[0].lastlogindate,
      moodHistory: response.locals.userMoodHistory
    }
    return response.status(200).json(responseObject);
  }
);

app.post('/signup',
  userController.createUser,
  (request, response) => {
    return response.status(200).json({ newUserCreated: true, message: 'New user successfully created.' });
  }
);


app.post('/user', 
  userController.getUserID,
  userController.saveMood,
  userController.getMoodHistory,
  (request, response) => {
    return response.status(200).json({ moodHistory: response.locals.userMoodHistory });
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