import React from 'react';
import styled from 'styled-components';
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Register from "./components/Register";
import ExampleComponent from "./components/ExampleComponent";

function App() {

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
  );
}

export default App;
