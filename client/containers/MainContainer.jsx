import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "../components/Navbar";
import ContentContainer from "./ContentContainer";

function MainContainer() {
  const [firstName, setFirstName] = useState(() => "");
  const [age, setAge] = useState(() => 0);
  const [email, setEmail] = useState(() => "");
  const [password, setPassword] = useState(() => "");
  const [emergencyContactName, setEmergencyContactName] = useState(() => "");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState(() => 0);
  const [missedLogin, setMissedLogin] = useState(() => 0);
  const [addiction, setAddiction] = useState(() => "");
  const [moodHistory, setMoodHistory] = useState(() => []);
  const [isLoggedIn, setisLoggedIn] = useState(() => false);

  return (
    <div className="main-container">
      <Router>
      <NavBar firstName={firstName}
              age={age}
              emergencyContactName={emergencyContactName}
              emergencyContactPhone={emergencyContactPhone}
              setEmergencyContactName={setEmergencyContactName}
              setEmergencyContactPhone={setEmergencyContactPhone}
              missedLogin={missedLogin}
              addiction={addiction}
              moodHistory={moodHistory}
              isLoggedIn={isLoggedIn}
        />

        <Switch>
          <Route path="/login" exact>
            <AuthContainer
              authtype="login"
              firstName={firstName}
              setFirstName={setFirstName}
              age={age}
              setAge={setAge}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              emergencyContactName={emergencyContactName}
              emergencyContactPhone={emergencyContactPhone}
              setEmergencyContactName={setEmergencyContactName}
              setEmergencyContactPhone={setEmergencyContactPhone}
              missedLogin={missedLogin}
              setMissedLogin={setMissedLogin}
              addiction={addiction}
              setAddiction={setAddiction}
            />
          </Route>
        </Switch>
        <Switch>
          <Route path="/signup" exact>
            <AuthContainer
              authtype="signup"
              firstName={firstName}
              setFirstName={setFirstName}
              age={age}
              setAge={setAge}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              emergencyContactName={emergencyContactName}
              emergencyContactPhone={emergencyContactPhone}
              setEmergencyContactName={setEmergencyContactName}
              setEmergencyContactPhone={setEmergencyContactPhone}
              missedLogin={missedLogin}
              setMissedLogin={setMissedLogin}
              addiction={addiction}
              setAddiction={setAddiction}
            />
          </Route>
        </Switch>
        <Switch> 
          <Route path="/user" exact>
            <ContentContainer
              firstName={firstName}
              age={age}
              emergencyContactName={emergencyContactName}
              emergencyContactPhone={emergencyContactPhone}
              setEmergencyContactName={setEmergencyContactName}
              setEmergencyContactPhone={setEmergencyContactPhone}
              missedLogin={missedLogin}
              addiction={addiction}
              moodHistory={moodHistory}
              isLoggedIn={isLoggedIn}
            />
          </Route>
        </Switch>
        <Switch>
          <Route path="/" exact>
            <HomepageContainer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default MainContainer;
