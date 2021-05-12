/* 
this script handles the CRUD functionality relating to mood history and check-in history
*/ 
const database = require('../models/userModels');

const historyController = {};

// ! it seems that mood history should have its own table
// gets the userId of res.locals
// finds mood row by user_id
// sets the mood rows onto locals.userMoodHistory
historyController.getMoodHistory = (request, response, next) => {
    const userId = [response.locals.user[0].user_id];
    const moonHistoryQuery = `SELECT mood, date FROM "public"."moods" where user_id = $1`;
    database.query(moonHistoryQuery, userId, (error, result) => {
      if (error) return next({ status: 500, message: 'Error in historyController.getMoodHistory.' });
      response.locals.userMoodHistory = result.rows;
      return next();
    });
  };

// updates the users list to set the lastLoginDate to today for the current user
// gets the current user based on the userId in locals
historyController.updateLastLoginDate = (request, response, next) => {    
    const userId = [response.locals.user[0].user_id];
    const updateLastLoginDateQuery = `UPDATE users
                                      SET lastLoginDate = current_date
                                      WHERE user_id = $1;`
    database.query(updateLastLoginDateQuery, userId, (error, result) => {
      if (error) return next({ status: 500, message: 'Error in historyController.updateLastLoginDate.' });
      return next();
    });
};

// inserts a new value into the moods table
// moods table seems to have two columns - mood and userid
// ! wouldn't this need some sort of DATE column to keep them ordered? 
historyController.saveMood = (request, response, next) => {
    const moodAndUserID = [response.locals.thismood, response.locals.user[0].user_id]
    const saveMoodQuery = `INSERT INTO moods (mood, user_id)
                            VALUES ($1, $2);`;
    database.query(saveMoodQuery, moodAndUserID, (error, result) => {
        if (error) return next({ status: 500, message: 'Error in historyController.saveMood.' });
        return next();
    });
};

// looks at the last three moods based on date 
// ! I don't see that date is a column yet though? 
// it tests the resulting rows to see if there were three consecutive 'unwell' days
// it sends a response that indicates the person is not doing well
historyController.checkMood = (request, response, next) => {
    const thisuserID = [response.locals.user[0].user_id];
    const checkMoodQuery = `SELECT mood, date FROM "public"."moods" where user_id = $1 and date > current_date - 3;`;
    database.query(checkMoodQuery, thisuserID, (error, result) => {
        console.log(result.rows);
        if (error) return next({ status: 500, message: 'Error in historyController.checkMood.' });
        if (
            result.rows[0].mood === "unwell" 
            && result.rows[1].mood === "unwell" 
            && result.rows[2].mood === "unwell" ) {
                return response.status(400).json({ moodStatus: false, message: 'This person is NOT OK.' });
        }
        return next();
    });
};

module.exports = historyController;