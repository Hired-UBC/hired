import React, { createContext, useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Form from "react-bootstrap/Tab";
import Button from "react-bootstrap/Tab";
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import ScheduleCreator from "./components/ScheduleCreator";
import ErrorPage from "./components/ErrorPage";
import ShareLink from "./components/ShareLink";
import CalendarCards from "./components/CalendarCards";
import InterviewerView from "./components/views/InterviewerView";
import PublicView from "./components/views/PublicView";
import { getAllCalendars, getCalendarByID, getUserByID } from "./utils/api";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./components/LandingPage";
import Account from "./components/Account";
import TeamDashboard from "./components/views/TeamDashboard";
import TeamPage from "./components/views/TeamPage";
import JoinTeam from "./components/views/JoinTeam";
import TeamSettings from "./components/views/TeamSettings";

// TODO: when you login or register you need to hit button twice to get to home page
const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userObj")) || undefined);
  const history = useHistory();

  // TODO: we need to update userObj in localStorage after all changes
  // I added api call here which helped in certain circumstances 
  // but we still aren't updating userObj enough to properly display upcoming events
  useEffect(() => {
    if (user) {
      getUserByID(user._id).then((res) => {
        localStorage.setItem("userObj", JSON.stringify(res.data));
        console.log("user logged in");
        console.log("MY USER OBJECT IN APP JS USEEFFECT: ", user);
      })
    }
  }, [user]);

  const handleAuth = (userObj) => {
    setUser(userObj);
    console.log("MY USER OBJECT IN APP JS: ", userObj);
    localStorage.setItem("userObj", JSON.stringify(userObj));
    // history.push("/home");
  };

  const handleLogout = () => {
    setUser(undefined);
    localStorage.removeItem("userObj");
  };

  return (
    <>
      <Router>
        <Switch>
          <Route path='/calendar-share/:id' component={PublicView} />
          <Route path='/join-team/:id' component={JoinTeam} />
          <Route exact path='/register' render={() => <Register handleAuth={handleAuth} />} />
          <Route exact path='/login' render={() => <Login handleAuth={handleAuth} />} />
          <Route exact path='/' render={() => <LandingPage />} />
          {!user && <Redirect from='/' to='/' />}
          {user && (
            <>
              <Sidebar handleLogout={handleLogout} user={user} />
              <Route exact path='/home' render={() => <Dashboard user={user} />} />
              <Route path='/new-schedule/:id' render={() => <ScheduleCreator user={user} />} />
              <Route path='/calendar/:id' component={InterviewerView} />
              <Route path='/link-invite/:id' component={ShareLink} />
              <Route path='/landingpage' component={LandingPage} />
              <Route path='/teams' render={() => <TeamDashboard user={user} />} />
              <Route path='/team/:id' render={() => <TeamPage user={user} />} />
              <Route path='/account' render={() => <Account user={user} />} />
              <Route path='/team-settings/:id' component={TeamSettings} />
            </>
          )}
          <Route path='/' component={ErrorPage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
