import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";

const Icon = styled.div`
  //margin-top: auto;
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
    border: solid 3px #c4c4c4;
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(-5%);
  }
`;

const Popover = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  //justify-content: center;
  padding: 10px;
  position: absolute;
  left: 6vw;
  top: 65vh;
  width: 240px;
  height: 300px;
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
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.bgColor};
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 3em;
  font-weight: 600;
  overflow: hidden;
  transition: all 250ms;
  // font-size: 2em;
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
  position: absolute;
  top: 73%;
  font-family: open-sans;
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

const LogoutButton = styled.button`
  display: flex;
  margin-top: auto;
  margin-left: 70%;
  display: flex;
  align-items: center;
  height: 10%;
`;

function UserIcon(props, { handleLogout }) {
  const [color, setColor] = useState(props.color);
  const [clicked, setClicked] = useState(false);

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

  const toggleClicked = () => {
    setClicked(!clicked);
  };

  const changeColor = (newColor) => {
    setColor(newColor);
  };

  return (
    <>
      <Icon bgColor={color} onClick={toggleClicked}>
        {props.firstName.slice(0, 1)}
        {props.lastName.slice(0, 1)}
      </Icon>

      {clicked && (
        <Popover>
          <IconWrapper onClick={toggleClicked}>
            <AiIcons.AiOutlineClose color="#4f4f4f" size="1.5em" />
          </IconWrapper>

          <LargeCircle bgColor={color}>
            {props.firstName.slice(0, 1)}
            {props.lastName.slice(0, 1)}
          </LargeCircle>
          <p
            style={{
              marginTop: "0",
              marginBottom: "3%",
              fontFamily: "open-sans",
              fontSize: "1.2em",
              fontWeight: "600",
              overflow: "hidden",
            }}
          >
            {props.firstName} {props.lastName}
          </p>
          <p
            style={{
              marginTop: "0",
              marginBottom: "3%",
            }}
          >
            {props.email} &nbsp;
            <AiIcons.AiOutlineEdit
              style={{
                color: "#4f4f4f",
                marginLeft: "auto",
                "&:hover": { color: "black" },
                "&:active": { transform: "translateY(-5%)" },
              }}
              size="1em"
            />
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
            <ColorCircle onClick={(e) => changeColor(red)} bgColor={red}>
              &nbsp;
            </ColorCircle>
            <ColorCircle onClick={(e) => changeColor(orange)} bgColor={orange}>
              &nbsp;
            </ColorCircle>
            <ColorCircle onClick={(e) => changeColor(green)} bgColor={green}>
              &nbsp;
            </ColorCircle>
            <ColorCircle
              onClick={(e) => changeColor(lightGreen)}
              bgColor={lightGreen}
            >
              &nbsp;
            </ColorCircle>
            <ColorCircle onClick={(e) => changeColor(blue)} bgColor={blue}>
              &nbsp;
            </ColorCircle>
            <ColorCircle
              onClick={(e) => changeColor(lightBlue)}
              bgColor={lightBlue}
            >
              &nbsp;
            </ColorCircle>
            <ColorCircle onClick={(e) => changeColor(indigo)} bgColor={indigo}>
              &nbsp;
            </ColorCircle>
            <ColorCircle
              onClick={(e) => changeColor(deepPurple)}
              bgColor={deepPurple}
            >
              &nbsp;
            </ColorCircle>
            <ColorCircle onClick={(e) => changeColor(purple)} bgColor={purple}>
              &nbsp;
            </ColorCircle>
            <ColorCircle onClick={(e) => changeColor(grey)} bgColor={grey}>
              &nbsp;
            </ColorCircle>
          </div>
          <div
            style={{
              position: "absolute",
              top: "68%",
              width: "101%",
              borderBottom: "solid 1px grey",
            }}
          ></div>

          <ManageButton
            onClick={toggleClicked}
            to={{ pathname: "/manage-account" }}
          >
            Manage Account
          </ManageButton>

          <LogoutButton
            onClick={() => {
              toggleClicked();
              handleLogout();
            }}
          >
            Logout
          </LogoutButton>
        </Popover>
      )}
    </>
  );
}

UserIcon.defaultProps = {
  firstName: "Han",
  lastName: "Yu",
  email: "ubchanyu@gmail.com",
  color: "#e57373",
};

export default UserIcon;
