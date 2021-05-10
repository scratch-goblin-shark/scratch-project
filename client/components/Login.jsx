import React from "react";
import { useHistory } from "react-router-dom";

const getDateDiff = (date1, date2) => {
  return Math.floor((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
};

function Login({
  setFirstName,
  setAge,
  email,
  setEmail,
  password,
  setPassword,
  setEmergencyContactName,
  setEmergencyContactPhone,
  setAddiction,
  setMissedLogin,
  setMoodHistory,
}) {
  const history = useHistory();

  const login = () => {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email,
        password,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setPassword("");
        setAge(data.age);
        setEmergencyContactName(data.emergencyContactName);
        setEmergencyContactPhone(data.emergencyContactPhone);
        setAddiction(data.addiction);
        setFirstName(data.firstName);
        // make functionality for missed login they will send last login date
        setMissedLogin(getDateDiff(data.lastLoginDate, Date.now()));
        setMoodHistory(data.moodHistory);
        history.push("/user");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="login">
      <label for="email">Email </label>
      <input
        id="email"
        type="email"
        placeholder="MyEmail@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <label for="password">Password </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button type="submit" onClick={(e) => login()}>
        Submit
      </button>
    </div>
  );
}

export default Login;
