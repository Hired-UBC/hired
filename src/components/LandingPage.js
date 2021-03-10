import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Login from "./Login";
import * as FcIcons from "react-icons/fc";
import { OuterContainer, PrimaryButton } from "./SharedComponents";

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
  background: #5845cb;
  color: white;
  font-size: 1.2em;
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
    <OuterContainer
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Welcome to Hired</h1>
      <div>
        <LinkWrapper to={{ pathname: "/login" }}>
          <PrimaryButton>Login</PrimaryButton>
        </LinkWrapper>
      </div>
      <p>
        Don't have an account?{" "}
        <LinkWrapper
          style={{ color: "#5c6bc0" }}
          to={{ pathname: "/register" }}
        >
          <SpanHover>Sign Up</SpanHover>
        </LinkWrapper>
      </p>
    </OuterContainer>
  );
}

export default LandingPage;
