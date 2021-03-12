import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PrimaryButton } from "./SharedComponents";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import UserIcon from "./UserIcon";

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
  width: 100%;
  padding: 10px 20px;
  color: inherit;
  transition: all 250ms;
  border-radius: 3px;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: black;
  }

  :hover {
    color: #5845cb;
    background: #5845cb10;
  }
`;

const Sidebar = ({ handleLogout, user }) => {
  return (
    <SidebarContainer>
      <Link to={{ pathname: "/new-schedule" }}>
        <PrimaryButton icon={faPlus}>New</PrimaryButton>
      </Link>
      <StyledLink to={{ pathname: "/" }}>Home</StyledLink>
      <StyledLink to={{ pathname: "/my-calendars" }}>Calendars</StyledLink>
      <StyledLink to={{ pathname: "/link-invite" }}>ShareLink</StyledLink>
      <StyledLink to={{ pathname: "/team-settings" }}>Team</StyledLink>
      <UserIcon handleLogout={handleLogout} user={user} />
    </SidebarContainer>
  );
};

export default Sidebar;
