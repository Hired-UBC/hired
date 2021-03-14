import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Form from "react-bootstrap/Tab";
import Button from "react-bootstrap/Tab";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import ScheduleCreator from "./components/ScheduleCreator";
import ErrorPage from "./components/ErrorPage";
import ShareLink from "./components/ShareLink";
import AllCalendars from "./components/AllCalendars";
import InterviewerView from "./components/views/InterviewerView";
import PublicView from "./components/views/PublicView";
import { getAllCalendars, getCalendarByID } from "./utils/api";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./components/LandingPage";
import Account from "./components/Account";

const App = () => {
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      console.log("user logged in");
      console.log(user);
    }
  }, [user]);

  const handleAuth = (userObj) => {
    setUser(userObj);
    console.log("USER:", user);
    history.push("/home");
  };

  const handleLogout = () => {
    setUser(undefined);
  };

  return (
    <>
      {!user ? (
        <Router>
          <Switch>
            <Route path="/calendar-share/:id" component={PublicView} />
            <Route
              exact
              path="/register"
              render={() => <Register handleAuth={handleAuth} />}
            />
            <Route
              exact
              path="/login"
              render={() => <Login handleAuth={handleAuth} />}
            />
            <Redirect from="/" to="/login" />
          </Switch>
        </Router>
      ) : (
        <Router>
          <Sidebar handleLogout={handleLogout} user={user} />
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Redirect exact from="/login" to="/home" />
            <Redirect exact from="/register" to="/home" />
            <Route
              exact
              path="/home"
              render={() => <Dashboard user={user} />}
            />
            <Route path="/new-schedule" component={ScheduleCreator} />
            <Route path="/calendar/" component={InterviewerView} />
            <Route path="/link-invite" component={ShareLink} />
            <Route path="/my-calendars" component={AllCalendars} />
            <Route path="/landingpage" component={LandingPage} />
            <Route path="/account" render={() => <Account user={user} />} />
            <Route path="/" component={ErrorPage} />
          </Switch>
        </Router>
      )}
    </>
  );
};

export default App;
