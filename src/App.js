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
import Calendar from "./components/CalendarGrid";
import ScheduleEditor from "./components/ScheduleEditor";
import ShareLink from "./components/ShareLink";
import AllCalendars from "./components/AllCalendars";
import CalendarGrid from "./components/IntervieweeCalendar";
import CalendarData from "./components/CalendarData";
import TempComponent from "./components/TempComponent";
import { getAllCalendars, getCalendarByID } from "./utils/api";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./components/LandingPage";

const App = () => {
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {}, [user]);

  const handleAuth = (userObj) => {
    setUser(userObj);
    console.log("USER:", user);
    history.push("/dashboard");
  };

  const handleLogout = () => {
    setUser(undefined);
  };

  return (
    <>
      <Router>
        {user ? (
          <Sidebar handleLogout={handleLogout} />
        ) : (
          <Redirect to="/landingpage" />
        )}
        <Switch>
          {/* <Route
            path="/"
            render={() =>
              user ? (
                <Dashboard user={user} />
              ) : (
                <Register handleAuth={handleAuth} />
              )
            }
          /> */}
          <Route exact path="/" render={() => <Dashboard user={user} />} />
          <Route path="/new-schedule" component={ScheduleCreator} />
          <Route path="/calendar/" component={TempComponent} />
          <Route path="/link-invite" component={ShareLink} />
          <Route path="/my-calendars" component={AllCalendars} />
          <Route
            exact
            path="/login"
            render={() => <Login handleAuth={handleAuth} />}
          />
          <Route path="/landingpage" component={LandingPage} />
          <Route
            exact
            path="/register"
            render={() => <Register handleAuth={handleAuth} />}
          />
          <Route path="/" render={() => <p>404</p>} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
