import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { addNewUser, getAllUsers, findUserByEmail } from "../utils/api";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [newUser, setUser] = useState("");
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
    
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(firstName, lastName, email, password);
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      passwordHash: password,
    };
    if (findUserByEmail(email)!==null) {
      addNewUser(newUser).then((res) => setUser(res));
    } else {
      console.log("User already has a Hired account")
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="first-name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="last-name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="confirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!checkFieldsFilled()||!checkValidPassword()}>
          Sign Up
        </Button>
      </Form>
    </div>
  );
}
