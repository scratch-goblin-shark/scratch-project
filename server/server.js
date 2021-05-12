const express = require("express");
const path = require("path");

const app = express();

const userController = require("./controllers/userController");
const historyController = require('./controllers/historyController');

app.use(express.static("../client/assets"));
app.use(express.json());

// app.get("/", (request, response) => {
//   response.status(200).sendFile(path.join(__dirname, "../index.html"));
// });

// NTS: for whatever reason, this breaks if I try to redirect....
const uriArr = ["/login", "/signup", "user", "/"];
uriArr.map((e) =>
app.get(e, (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../index.html"));
}));

app.use("/build", express.static(path.join(__dirname, "../build")));

// logs in the user, retrieves their mood history and saves today's date as their last login
// responds with user details 
app.post(
  "/login",
  userController.verifyUser,
  // historyController.getMoodHistory,
  // historyController.updateLastLoginDate,
  (request, response) => {
    const responseObject = {
      userVerified: true,
      message: "User Found.",
      firstName: response.locals.user[0].firstname,
      addiction: response.locals.user[0].addiction,
      emergencyContactName: response.locals.user[0].emergencycontactname,
      emergencyContactPhone: response.locals.user[0].emergencycontactphone,
      // lastLoginDate: response.locals.user[0].lastlogindate,
      // moodHistory: response.locals.userMoodHistory,
    };
    return response.status(200).json(responseObject);
  }
);

// creates a new user and saves it to the database
// ! it would be nice if this went to the main page afterwards with a verified session and new mood history
app.post("/signup", 
  userController.createUser, 
  (request, response) => {
    return response.status(200).json({newUserCreated: true, message: "New user successfully created."});
  }
);

// retrieves user info, saves mood input, retrieves mood history and returns it
app.post("/user",
  userController.getUserID,
  // historyController.saveMood,
  // historyController.getMoodHistory,
  (req, res) => {
    return res.status(200).json({ 
        user: res.locals.user
        // moodHistory: response.locals.userMoodHistory 
      });
  }
);

// universal route handler
app.get("*", (request, response) => {
  response.status(404).send("Nothing here");
});

// universal error handler
app.use((error, request, response, next) => {
  const defaultError = {
    status: 500,
    log: "Problem in some middleware.",
    message: "Serverside problem.",
  };
  const ourError = Object.assign(defaultError, error);

  console.log(ourError.log);

  response.status(ourError.status).send(ourError.message);
});

app.listen(3000);
