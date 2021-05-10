const database = require('../models/userModels');

const userController = {};

userController.verifyUser = (request, response, next) => {
  const body = request.body;
  const email = [body.email];
  const findUserQuery = `SELECT * FROM users
    WHERE email = $1;`;
  database.query(findUserQuery, email, (error, result) => {
    if (error) return next({ status: 500, message: 'Error in userController.verifyUser.' });
    if (result.rows.length === 0) {
      return response.status(400).json({ userVerified: false, message: 'User not found. Please check email.' });
    }
    if (result.rows[0].password !== body.password) {
      return response.status(400).json({ userVerified: false, message: 'Password incorrect.' });
    }
    response.locals.user = result.rows;
    return next();
  });
};

userController.updateLastLoginDate = (request, response, next) => {
  const userId = [response.locals.user[0].user_id];
  const updateLastLoginDateQuery = `UPDATE users
    SET lastLoginDate = current_date
    WHERE user_id = $1;`
  database.query(updateLastLoginDateQuery, userId, (error, result) => {
    if (error) return next({ status: 500, message: 'Error in userController.updateLastLoginDate.' });
    return next();
  });
};

userController.createUser = (request, response, next) => {
  const body = request.body;
  const userInformation = [
    body.firstName,
    body.age,
    body.email,
    body.password,
    body.addiction
  ];
  const createUserQuery = `INSERT INTO users (firstName, age, email, password, addiction)
    VALUES ($1, $2, $3, $4, $5);`;
  database.query(createUserQuery, userInformation, (error, result) => {
    if (error) return next({ status: 500, message: 'Error in userController.createUser.' });
    return next();
  });
};

userController.getUserID = (request, response, next) => {
  const body = request.body;
  const email = [body.email];
  const getUserIDQuery = `SELECT * FROM users
  WHERE email = $1;`;
  database.query(getUserIDQuery, email, (error, result) => {
    if (error) return next({ status: 500, message: 'Error in userController.getUserID.' });
    response.locals.thisuser = result.rows;
    response.locals.thismood = request.body.mood;
    return next();
  });
}

userController.saveMood = (request, response, next) => {
  const thisuserID = [response.locals.thisuser[0].user_id];
  const thisMood = [response.locals.thismood];
  const saveMoodQuery = `INSERT INTO moods (mood, user_id)
    VALUES ($1, $2);`;
  database.query(saveMoodQuery, thisuserID, (error, result) => {
    if (error) return next({ status: 500, message: 'Error in userController.saveMood.' });
    return next();
  });
};

userController.checkMood = (request, response, next) => {
  const thisuserID = [response.locals.thisuser[0].user_id];
  const checkMoodQuery = `SELECT mood, date FROM "public"."moods" where user_id = ${thisuserID} and date > current_date - 3;`;
  database.query(checkMoodQuery, thisuserID, (error, result) => {
    if (error) return next({ status: 500, message: 'Error in userController.checkMood.' });
    if (result.rows[0].mood === "unwell" && result.rows[1].mood === "unwell" && result.rows[2].mood === "unwell"){
      return response.status(400).json({ moodStatus: false, message: 'This person is NOT OK.' });
    }
    return next();
  });
};

module.exports = userController;