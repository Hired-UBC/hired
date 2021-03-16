import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { addNewUser, getAllUsers } from "../utils/api";
import styled from "styled-components";
import bcrypt from "bcryptjs";
import { InputField } from "./SharedComponents";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
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

async function handleHash(password) {
  const hash = await bcrypt.hash(password, 10); // # of salts rounds -> 10
  return hash;
}

export default function Register({ handleAuth }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [filledInFields, setFilledInFields] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [userExists, setUserExists] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFilledInFields(
      firstName.length > 0 && lastName.length > 0 && email.length > 0 && password.length > 0 && confirm.length > 0
    );
    setPasswordMatch(password === confirm);
    axios
      .get(`api/users`, { params: { email: email } })
      .then((res) => {
        if (res.data.length === 1) {
          console.log("account exists");
          setUserExists(true);
        } else {
          console.log("account does not exist");
          var hash;
          handleHash(password).then((res) => {
            hash = res;

            const newUser = {
              firstName: firstName,
              lastName: lastName,
              email: email,
              passwordHash: hash,
            };

            addNewUser(newUser).then((res) => {
              console.log(res);
              handleAuth(res);
            });
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      {localStorage.getItem("userObj") && <Redirect to="/home" />}
      <h1>Welcome</h1>
      <Form onSubmit={handleSubmit}>
        <InputGroup controlId="first-name">
          <InputLabel>First Name</InputLabel>
          <InputField type="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </InputGroup>
        <InputGroup controlId="last-name">
          <InputLabel>Last Name</InputLabel>
          <InputField type="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </InputGroup>
        <InputGroup controlId="email">
          <InputLabel>Email</InputLabel>
          <InputField type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </InputGroup>
        <InputGroup controlId="password">
          <InputLabel>Password</InputLabel>
          <InputField type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </InputGroup>
        <InputGroup controlId="confirm">
          <InputLabel>Confirm Password</InputLabel>
          <InputField type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        </InputGroup>
        <PrimaryButton block size="lg" type="submit">
          Create Account
        </PrimaryButton>
      </Form>
      <a href="/login">Already have an account? Sign in</a>
      {!filledInFields && !userExists && <div>Not All Fields are Filled Out</div>}
      {!passwordMatch && !userExists && <div>Passwords Do Not Match</div>}
      {userExists && <div>An Account Already Exists Corresponding to this Email - Try Logging In</div>}
    </Container>
  );
}
