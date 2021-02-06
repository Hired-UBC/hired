import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Form from "react-bootstrap/Tab";
import Button from "react-bootstrap/Tab";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import ScheduleCreator from "./components/ScheduleCreator";
import Calendar from "./components/CalendarGrid";
import ScheduleEditor from "./components/ScheduleEditor";
import ShareLink from "./components/ShareLink";

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(true);
  }, [user]);

  const handleAuth = (userObj) => {
    setUser(userObj);
    console.log("USER:", user);
  };

  const handleLogout = () => {
    setUser(undefined);
  };

  return (
    <>
      <Router>
        {user && <Sidebar handleLogout={handleLogout} />}
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
          <Route path="/link-invite" component={ShareLink} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
