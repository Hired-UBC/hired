import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PrimaryButton } from "./SharedComponents";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const SidebarContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 150px;
  max-width: 150px;
  height: 100vh;
  border-right: 1px solid #e6e6e6;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  margin-top: 1rem;
  transition: all 250ms;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: black;
  }

  :hover {
    color: blue;
  }
`;

const Sidebar = ({ handleLogout }) => {
  return (
    <SidebarContainer>
      <StyledLink to={{ pathname: "/new-schedule" }}>
        <PrimaryButton icon={faPlus}>New</PrimaryButton>
      </StyledLink>
      <StyledLink to={{ pathname: "/" }}>Home</StyledLink>
      <StyledLink to={{ pathname: "/team-settings" }}>Team</StyledLink>
      <StyledLink onClick={handleLogout}>Logout</StyledLink>
    </SidebarContainer>
  );
};

export default Sidebar;
