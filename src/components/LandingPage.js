import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Login from "./Login";
import * as FcIcons from "react-icons/fc";
import { OuterContainer, PrimaryButton, TextButton, UnstyledLink } from "./SharedComponents";

const LinkWrapper = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
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
        <UnstyledLink to={{ pathname: "/login" }}>
          <PrimaryButton>Login</PrimaryButton>
        </UnstyledLink>
      </div>
      <p>
        Don't have an account?{" "}
        <LinkWrapper style={{ color: "#5c6bc0" }} to={{ pathname: "/register" }}>
          <TextButton>Sign Up</TextButton>
        </LinkWrapper>
      </p>
    </OuterContainer>
  );
}

export default LandingPage;
