const database;
const bcrypt = require('bcrypt');

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
    bcrypt.compare(body.password, result.rows[0].password, (error, isMatched) => {
      if (isMatched === false) {
        return response.status(400).json({ userVerified: false, message: 'Password incorrect.' });
      }
      response.locals.user = result.rows;
      return next();
    });
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

userController.createUser = async (request, response, next) => {
  const body = request.body;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(body.password, saltRounds);
  const userInformation = [
    body.firstName,
    body.age,
    body.email,
    hashedPassword,
    body.addiction,
    body.emergencyContactName,
    body.emergencyContactPhone
  ];
  const createUserQuery = `INSERT INTO users (firstName, age, email, password, addiction, emergencyContactName, emergencyContactPhone)
    VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  database.query(createUserQuery, userInformation, (error, result) => {
    if (error) return next({ status: 500, message: 'Error in userController.createUser.' });
    return next();
  });
};



module.exports = userController;