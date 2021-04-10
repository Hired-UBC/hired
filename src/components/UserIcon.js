import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { PrimaryButton, SecondaryButton, TextButton, UserIconContainer } from "./SharedComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { updateUserByID } from "../utils/api";

const Popover = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding: 20px;
  position: absolute;
  left: 2rem;
  bottom: 2rem;
  width: 240px;
  background-color: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  z-index: 1000;
`;

const ColorCircle = styled.span`
  user-select: none;
  cursor: pointer;
  display: flex;
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.bgColor};
  border-radius: 50%;
  border: solid 1px transparent;
  transition: all 100ms;

  &:hover {
    border: solid 2px grey;
  }

  &:active {
    transform: translateY(5%);
  }
`;

const IconWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  transition: background 250ms;

  &:hover {
    background: #e0e0e0;
  }

  &:active {
    transform: translateY(5%);
  }
`;

const StyledLink = styled(Link)`
  user-select: none;
  text-decoration: none;
  color: inherit;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: black;
  }
`;
const red = "#e57373";
const orange = "#ffb74d";
const green = "#66bb6a";
const lightGreen = "#aed581";
const blue = "#64b5f6";
const lightBlue = "#81d4fa";
const indigo = "#5c6bc0";
const deepPurple = "#7e57c2";
const purple = "#ba68c8";
const grey = "#9e9e9e";

const colors = [red, orange, green, lightGreen, blue, lightBlue, indigo, deepPurple, purple, grey];

function UserIcon({ handleLogout, user, ...props }) {
  const [color, setColor] = useState((user && user.settings && user.settings.bgColor) || colors[4]);
  const [clicked, setClicked] = useState(false);

  const toggleClicked = () => {
    setClicked(!clicked);
  };

  useEffect(() => {
    if (user && user.settings) {
      setColor(user.settings.bgColor);
    }
  }, []);

  const changeColor = (newColor) => {
    updateUserByID(user._id, { settings: { bgColor: newColor } }).then((res) => {
      localStorage.setItem("userObj", JSON.stringify(res));
      setColor(res.settings.bgColor);
    });
  };

  return (
    <>
      <>
        <UserIconContainer size={40} bgColor={color} imgUrl={user?.settings?.iconUrl} onClick={toggleClicked}>
          {user.firstName.slice(0, 1)}
          {user.lastName.slice(0, 1)}
        </UserIconContainer>

        {clicked && (
          <Popover>
            <IconWrapper onClick={toggleClicked}>
              <FontAwesomeIcon icon={faTimes} />
            </IconWrapper>

            <UserIconContainer size={50} bgColor={color} imgUrl={user?.settings?.iconUrl}>
              {user.firstName.slice(0, 1)}
              {user.lastName.slice(0, 1)}
            </UserIconContainer>
            <p
              style={{
                marginTop: "0",
                marginBottom: "3%",
                fontSize: "1.2em",
                fontWeight: "600",
                overflow: "hidden",
              }}
            >
              {user.firstName} {user.lastName}
            </p>
            <p
              style={{
                marginTop: "0",
                marginBottom: "3%",
              }}
            >
              {user.email}
            </p>
            <div
              style={{
                marginTop: "0%",
                paddingBottom: "5%",
                paddingTop: "3%",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {colors.map((color) => {
                return <ColorCircle onClick={(e) => changeColor(color)} bgColor={color} />;
              })}
            </div>

            <StyledLink onClick={toggleClicked} to={{ pathname: "/account" }}>
              <PrimaryButton>Manage Account</PrimaryButton>
            </StyledLink>

            <TextButton
              onClick={() => {
                toggleClicked();
                handleLogout();
              }}
            >
              Logout
            </TextButton>
          </Popover>
        )}
      </>
    </>
  );
}

UserIcon.defaultProps = {
  firstName: "",
  lastName: "",
  email: "",
  color: "#e57373",
};

export default UserIcon;
