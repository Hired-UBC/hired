import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as AiIcons from "react-icons/ai";

const Icon = styled.div`
  //margin-top: auto;
  position: absolute;
  top: 90vh;
  display: flex;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;

  &:hover {
    border: solid 3px grey;
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
  display: flex;
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.bgColor};
  border-radius: 50%;

  &:hover {
    border: solid 1px grey;
  }

  &:active {
    transform: translateY(5%);
  }
`;

const LargeCircle = styled.span`
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
`;

const LogoutButton = styled.button``;

function UserIcon(props) {
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
          <p style={{ marginTop: "0" }}>
            {props.email} &nbsp;
            <AiIcons.AiOutlineEdit
              style={{
                color: "#4f4f4f",
                marginLeft: "auto",
                "&:hover": { color: "black" },
              }}
              size="1em"
            />
          </p>
          <div
            style={{
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
            {/* <ColorCircle bgColor={red} /> */}
          </div>
          <div
            style={{
              marginTop: "auto",
              marginLeft: "70%",
              display: "flex",
              justifyContent: "flex-end",
              height: "10%",
            }}
          >
            <LogoutButton>Logout</LogoutButton>
          </div>
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
