import React, { useEffect, useReducer, useState } from "react";
import Form from "react-bootstrap/Form";
import { addNewUser, getAllUsers, findUserByEmail } from "../utils/api";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const InputField = styled.input`
  padding: 10px;
  width: 300px;
  border: 1px solid #e7e7e7;
  background: #f9f9f9;
  border-radius: 5px;
  transition: all 250ms;
  :focus {
    outline: none;
    border: 1px solid blue;
  }
`;

const InputLabel = styled.p`
  margin: 0;
  margin-bottom: 0.5rem;
`;

const InputGroup = styled(Form.Group)`
  margin-bottom: 2rem;
`;

const PrimaryButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  background: blue;
  color: white;
  display: inline-block;
  border-radius: 5px;
  transition: all 250ms;
  :hover {
    opacity: 0.8;
  }
`;

export default function Register({ handleAuth }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [user, setUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  function checkFieldsFilled() {
    return firstName.length > 0 
    && lastName.length > 0
    && email.length > 0 
    && password.length > 0
    && confirm.length > 0;
  }

  function checkValidPassword() {
    return password===confirm;
  }

  function checkValidEmail() {
    axios.get('https://emailvalidation.abstractapi.com/v1/?api_key=fabe9b42c98f495ea95c512926fa77f8&email={this.email}')
      .then((res) => {
        if (res.deliverability != "DELIVERABLE") {
          console.log("email not deliverable");
          return false;
        } else {
          console.log("email looks good");
          return true;
        }
      })
      .catch((err) => console.log(err));
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(firstName, lastName, email, password);
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      passwordHash: password,
    };
    addNewUser(newUser).then((res) => {
      setUser(res);
      //handleAuth(res);
    });
  };

  return (
    <Container>
      <h1>Welcome</h1>
      <Form onSubmit={handleSubmit}>
        <InputGroup controlId="first-name">
          <InputLabel>First Name</InputLabel>
          <InputField
            type="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </InputGroup>
        <InputGroup controlId="last-name">
          <InputLabel>Last Name</InputLabel>
          <InputField
            type="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </InputGroup>
        <InputGroup controlId="email">
          <InputLabel>Email</InputLabel>
          <InputField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup controlId="password">
          <InputLabel>Password</InputLabel>
          <InputField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <InputGroup controlId="confirm">
          <InputLabel>Confirm Password</InputLabel>
          <InputField
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </InputGroup>
        <PrimaryButton block size="lg" type="submit" disabled={!checkValidEmail}>
          Sign Up
        </PrimaryButton>
      </Form>
      <div>{JSON.stringify(user)}</div>
    </Container>
  );
}
