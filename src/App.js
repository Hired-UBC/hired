<<<<<<< HEAD
import React from 'react';
import styled from 'styled-components';
=======
import React, { useEffect, useState } from "react";
>>>>>>> c997627b2f482999b8009db544fcb99799bd5981
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Register from "./components/Register";
<<<<<<< HEAD
import ExampleComponent from "./components/ExampleComponent";
=======
import Form from "react-bootstrap/Tab";
import Button from "react-bootstrap/Tab";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import ScheduleCreator from "./components/ScheduleCreator";
import Calendar from "./components/CalendarGrid";
import ScheduleEditor from "./components/ScheduleEditor";
>>>>>>> c997627b2f482999b8009db544fcb99799bd5981

const App = () => {
  const [user, setUser] = useState();

<<<<<<< HEAD
  const MyContainer = styled.div`
    background-color: #E6E6E6;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    height: 150px;
`;

  const Button = styled.button`
    border: none;
    cursor: pointer;
    background-color: #3f51b5;
    color: white;
    padding: 10px;
    border-radius: 5px;
    margin-right: 10px;
    :hover {
        opacity: 0.7;
    }
`;

  const StartPage = () => {
    return(
        <MyContainer>
            <h3>Welcome to Hired</h3>
            <Button onClick={e =>  window.location.href='/login'}>Login</Button>
            <Button onClick={e =>  window.location.href='/register'}>Sign Up</Button>
        </MyContainer>
    )
}

  return (
    <div>
      <Router>
        <Switch>
          <Route from = "/" render={() => <StartPage/>} />
        </Switch>
      </Router>
  
      <Router>
        <Switch>
          <Route from="/register" to="/" render={() => <Register />} />
          <Route from="/login" to="/" render={() => <Login />} />
          <Route from="register" to="/" component={ExampleComponent} />
          <Route from="login" to="/" component={ExampleComponent} />
        </Switch>
      </Router>
    </div>
=======
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
        </Switch>
      </Router>
    </>
>>>>>>> c997627b2f482999b8009db544fcb99799bd5981
  );
};

export default App;
