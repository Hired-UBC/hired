import { HowToVoteRounded } from "@material-ui/icons";
import React, { useState, Component } from "react";
import "./CalendarButton.css";
import styled from "styled-components";
import Popover from "./Popover";

const TimeBlock = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  color: #0e0e0e;
  padding: 5%;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Name = styled.span`
  display: inline-box;
  background-color: ${(props) => props.bgcolor};
  color: white;
  //width: 70%;
  border-radius: 5px;
  padding: 3% 5% 3% 5%;
  font-size: 0.8em;
  font: open-sans;
  font-weight: 650;
`;

const Time = styled.span`
  display: inline-box;
  font-size: 1em;
  font: open-sans;
  font-weight: 400;
  //width: 30%;
  text-align: right;
  align-items: start;
  justify-contents: end;
  paddig-top: 2%;
  padding-bottom: 7%;
  padding-left: 10%;
`;

function CalendarButton(props) {
  const [clicked, setClicked] = useState(props.clicked);
  const [hover, setHover] = useState(false);
  const [date, setDate] = useState(null);

  const makeClicked = () => setClicked(!clicked);
  const makeHover = () => setHover(true);
  const makeNotHover = () => setHover(false);
  const storeDate = () => setDate(props.date);

  if (props.active && !hover) {
    return (
      <TimeBlock
        onClick={makeClicked}
        onMouseOver={makeHover}
        onMouseOut={makeNotHover}
      >
        {clicked ? (
          <Name bgcolor="#7986cb">{props.firstName}</Name>
        ) : (
          <Name></Name>
        )}
        <Time>{props.time}</Time>
      </TimeBlock>
    );
  } else if (props.active && hover) {
    return (
      <>
        <Popover
          clicked={clicked}
          firstName={props.firstName}
          lastName={props.lastName}
        />
        <TimeBlock
          onClick={makeClicked}
          onMouseOver={makeHover}
          onMouseOut={makeNotHover}
        >
          {clicked ? (
            <Name bgcolor="#7986cb">{props.firstName}</Name>
          ) : (
            <Name></Name>
          )}
          hovered
          <Time>{props.time}</Time>
        </TimeBlock>
      </>
    );
  }

  //   if (props.active) {
  //     return (
  //       <>
  //         <div
  //           onClick={makeClicked}
  //           onMouseOver={makeHover}
  //           onMouseOut={makeNotHover}
  //           className={clicked ? "clicked" : "not-clicked"}
  //         >
  //           <p className="time"> {props.time} </p>
  //           <p className="interviewer">{clicked ? `${props.firstName}` : ""}</p>
  //         </div>
  //         <p
  //           onMouseOver={makeHover}
  //           onMouseOut={makeNotHover}
  //           onClick={makeClicked}
  //           className={hover ? "hover active" : "hover"}
  //         >
  //           <p>
  //             <span className="hover-text">{props.time}</span>
  //             <span>{clicked ? "selected" : "not selected"}</span>
  //           </p>
  //           <p>
  //             <span className="hover-text">
  //               {props.firstName} {props.lastName}
  //             </span>
  //           </p>
  //         </p>
  //       </>
  //     );
  //   }
  //   {
  //     return (
  //       <div className="inactive">
  //         <span className="time">{props.time}</span>
  //       </div>
  //     );
  //   }
}

CalendarButton.defaultProps = {
  time: "no time",
  firstName: "First Name",
  lastName: "Last Name",
  active: true,
  clicked: false,
};

export default CalendarButton;
