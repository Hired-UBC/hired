import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Login from "./Login";
import * as FcIcons from "react-icons/fc";
import { Divider, MainContent, OuterContainer, PrimaryButton, TextButton, UnstyledLink } from "./SharedComponents";
import planetIllustration from "../assets/illustrations/undraw_planet.svg";

const LinkWrapper = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

const ContentContanier = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  border-radius: 5px;
  background: white;
`;

function LandingPage() {
  return (
    <OuterContainer
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#242452",
      }}
      offset={0}
    >
      <ContentContanier>
        <img src={planetIllustration} width={"100px"} />
        <h1>Welcome to Planet</h1>
        <p>Find space in your calendar to meet.</p>
        <div>
          <UnstyledLink to={{ pathname: "/register" }}>
            <PrimaryButton>Sign Up</PrimaryButton>
          </UnstyledLink>
        </div>
        <p>
          <LinkWrapper to={{ pathname: "/login" }}>
            <TextButton>Log in</TextButton>
          </LinkWrapper>
        </p>
      </ContentContanier>
    </OuterContainer>
  );
}

export default LandingPage;
