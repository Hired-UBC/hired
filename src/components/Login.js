import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { addNewUser, getAllUsers } from "../utils/api";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

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

export default function Login({ handleAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userExists, setUserExists] = useState(true);
  const [correctPassword, setCorrectPassword] = useState(true);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`api/users`, { params: { email: email } })
      .then((res) => {
        if (res.data.length === 1) {
          setUserExists(true);
          if (res.data[0].passwordHash === password) {
            setCorrectPassword(true);
            handleAuth(res.data[0]);
          } else {
            setCorrectPassword(false);
          }
        } else {
          setUserExists(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <h2>Login to Hired</h2>
      <Form onSubmit={handleSubmit}>
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
        <PrimaryButton block size="lg" type="submit">
          Login
        </PrimaryButton>
      </Form>
      <a href="/register">Don't have an account? Sign up</a>
      {!userExists && (
        <div>
          There is no Existing Account with this Email - Please Register
        </div>
      )}
      {!correctPassword && <div>Incorrect Password - Try Again</div>}
    </Container>
  );
}
