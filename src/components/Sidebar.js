import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "./SharedComponents";
import {
  faPlus,
  faHome,
  faCalendarAlt,
  faLink,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import UserIcon from "./UserIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 70px;
  border-right: 1px solid #e6e6e6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: ${theme.color.primary};
  padding: 10px;
  z-index: 1000;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  font-weight: 600;
  width: 100%;
  padding: 15px 10px;
  color: white;
  opacity: 0.8;
  transition: all 250ms;
  border-radius: 3px;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: white;
  }

  :hover {
    opacity: 1;
  }
`;

const Sidebar = ({ handleLogout, user }) => {
  return (
    <SidebarContainer>
      <div>
        <StyledLink to={{ pathname: "/home" }}>
          <FontAwesomeIcon icon={faHome} />
        </StyledLink>
        <StyledLink to={{ pathname: "/teams" }}>
          <FontAwesomeIcon icon={faUserFriends} />
        </StyledLink>
        <StyledLink to={{ pathname: "/link-invite" }}>
          <FontAwesomeIcon icon={faLink} />
        </StyledLink>
      </div>

      <UserIcon handleLogout={handleLogout} user={user} />
    </SidebarContainer>
  );
};

export default Sidebar;
