import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
<<<<<<< HEAD
import axios from "axios";
import { addNewUser, getAllUsers, findUserByEmail } from "../utils/api";
=======
import { addNewUser, getAllUsers } from "../utils/api";
import styled from "styled-components";
>>>>>>> c997627b2f482999b8009db544fcb99799bd5981

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
  const [newUser, setUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

<<<<<<< HEAD
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
    
  }
=======
  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };
>>>>>>> c997627b2f482999b8009db544fcb99799bd5981

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(firstName, lastName, email, password);
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      passwordHash: password,
    };
<<<<<<< HEAD
    if (findUserByEmail(email)!==null) {
      addNewUser(newUser).then((res) => setUser(res));
    } else {
      console.log("User already has a Hired account")
    }
  }
=======
    addNewUser(newUser).then((res) => {
      setUser(res);
      handleAuth(res);
    });
  };
>>>>>>> c997627b2f482999b8009db544fcb99799bd5981

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
<<<<<<< HEAD
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!checkFieldsFilled()||!checkValidPassword()}>
=======
        </InputGroup>
        <PrimaryButton block size="lg" type="submit" disabled={!validateForm()}>
>>>>>>> c997627b2f482999b8009db544fcb99799bd5981
          Sign Up
        </PrimaryButton>
      </Form>
<<<<<<< HEAD
    </div>
=======
      <div>{JSON.stringify(user)}</div>
    </Container>
>>>>>>> c997627b2f482999b8009db544fcb99799bd5981
  );
}
