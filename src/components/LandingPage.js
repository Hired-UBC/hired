import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Login from "./Login";
import * as FcIcons from "react-icons/fc";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const LinkWrapper = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

const LoginButton = styled.div`
  cursor: pointer;
  user-select: none;
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 5vh;
  background: #5845cb;
  color: white;
  font-size: 1.2em;
  font-family: open-sans;
  font-weight: 500;
  border-radius: 10px;

  &: hover {
    opacity: 0.8;
  }
`;

const SignupButton = styled.div`
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10vw;
  height: 5vh;
  background: #4285f4;
  color: white;
  font-size: 1.2em;
  font-family: open-sans;
  font-weight: 500;
  border-radius: 10px;
`;

const GoogleLogin = styled.div`
  cursor: pointer;
  user-select: none;
  margin-top: 10%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 20vw;
  height: 5vh;
  background: #4285f4;
  color: white;
  font-size: 1.2em;
  font-family: open-sans;
  font-weight: 500;
  border-radius: 10px;

  &: hover {
    opacity: 0.8;
  }
`;

const SpanHover = styled.span`
  &:hover {
    text-decoration: underline;
    color: #3949ab;
  }
`;

function LandingPage() {
  return (
    <Container>
      <div style={{ fontSize: "3em", marginTop: "15vh" }}>Welcome</div>
      <div
        style={{
          marginTop: "20vh",
          display: "flex",
          flexDirection: "column",
          //   justifyContent: "center",
          //   alignItems: "center",
        }}
      >
        <LinkWrapper to={{ pathname: "/login" }}>
          <LoginButton>Login</LoginButton>
        </LinkWrapper>
        <GoogleLogin>
          <span
            style={{
              marginLeft: "5%",
              marginRight: "10%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "35px",
              height: "35px",
              background: "white",
              borderRadius: "15%",
            }}
          >
            <FcIcons.FcGoogle size="1.5em" />
          </span>
          <span
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              paddingRight: "5%",
              marginRight: "10%",
            }}
          >
            Login with Google
          </span>
        </GoogleLogin>
      </div>
      <span style={{ marginTop: "1%" }}>
        Don't have an account?{" "}
        <LinkWrapper
          style={{ color: "#5c6bc0" }}
          to={{ pathname: "/register" }}
        >
          <SpanHover>Sign Up</SpanHover>
        </LinkWrapper>
      </span>
    </Container>
  );
}

export default LandingPage;
