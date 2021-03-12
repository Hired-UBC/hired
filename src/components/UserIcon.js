import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SecondaryButton } from "./SharedComponents";

const Icon = styled.div`
  cursor: pointer;
  user-select: none;
  position: absolute;
  top: 90vh;
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1.05);
  }
`;

const Popover = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding: 20px;
  position: absolute;
  left: 6vw;
  top: 65vh;
  width: 240px;
  background-color: white;
  box-shadow: 7px 7px 4px #e0e0e0;
  border: solid 1.5px grey;
  border-radius: 5%;
`;

const ColorCircle = styled.span`
  user-select: none;
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

const LargeCircle = styled.span`
  user-select: none;
  display: flex;
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.bgColor};
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5em;
  font-weight: 600;
  overflow: hidden;
  transition: all 250ms;
`;

const IconWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  position: absolute;
  left: 88%;
  border-radius: 50%;
  transition: background 250ms;

  &:hover {
    background: #e0e0e0;
  }

  &:active {
    transform: translateY(5%);
  }
`;

const ManageButton = styled(Link)`
  user-select: none;
  display: flex;
  font-weight: 100;
  font-size: 1.1em;
  color: black;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  height: 10%;
  width: 70%;
  border-radius: 15px;
  border: solid 1px grey;
  outline: none;
  background: white;
  transition: background 250ms;

  &: hover {
    background: #f4f4f4;
    // background: #d4d4d4;
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

const colors = [
  red,
  orange,
  green,
  lightGreen,
  blue,
  lightBlue,
  indigo,
  deepPurple,
  purple,
  grey,
];

function UserIcon({ handleLogout, user }, props) {
  const [color, setColor] = useState(colors[4]);
  const [clicked, setClicked] = useState(false);

  const toggleClicked = () => {
    setClicked(!clicked);
  };

  const changeColor = (newColor) => {
    setColor(newColor);
  };

  return (
    <>
      <Icon bgColor={color} onClick={toggleClicked}>
        {user.firstName.slice(0, 1)}
        {user.lastName.slice(0, 1)}
      </Icon>

      {clicked && (
        <Popover>
          <IconWrapper onClick={toggleClicked}>
            <AiIcons.AiOutlineClose color="#4f4f4f" size="1.5em" />
          </IconWrapper>

          <LargeCircle bgColor={color}>
            {user.firstName.slice(0, 1)}
            {user.lastName.slice(0, 1)}
          </LargeCircle>
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
              return (
                <ColorCircle
                  onClick={(e) => changeColor(color)}
                  bgColor={color}
                />
              );
            })}
          </div>

          <ManageButton onClick={toggleClicked} to={{ pathname: "/account" }}>
            Manage Account
          </ManageButton>

          <a
            onClick={() => {
              toggleClicked();
              handleLogout();
            }}
          >
            Logout
          </a>
        </Popover>
      )}
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
