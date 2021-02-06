import { HowToVoteRounded } from "@material-ui/icons";
import React, { useState, Component } from "react";
import "./CalendarButton.css";
import styled, { keyframes } from "styled-components";
//import Popover from "./Popover";

const Fadein = keyframes`
0% {
  opacity: 0;
}
40% {
  opacity: 0;
}
100% {
  opacity: 1;
}
`;

const Popover = styled.div`
  visibility: hidden;
  background-color: white;
  position: absolute;
  width: 16%;
  height: 8%;
  display: flex;
  justify-content: flex;
  flex-direction: column;
  border: solid 1px #e0e0e0;
  shadow: 0 0 0 4;
  transform: translateX(-4%) translateY(-11%);
`;

const InlineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Item1 = styled.span`
  display: flex;
  font-size: 1em;
  margin: 2%;
  grid-column: 1/3;
`;

const Item2 = styled.span`
  display: flex;
  font-size: 1em;
  margin-right: 6%;
  grid-column: 1/3;
  background-color: ;
`;

const TimeBlock = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  color: #0e0e0e;
  padding: 5%;

  &:hover {
    background-color: #e0e0e0;
  }
  &:hover ${Popover} {
    visibility: visible;
    animation: ${Fadein} 1s linear;
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
  // const [hover, setHover] = useState(false);
  const [date, setDate] = useState(null);

  const makeClicked = () => setClicked(!clicked);
  // const makeHover = () => setHover(true);
  // const makeNotHover = () => setHover(false);
  const storeDate = () => setDate(props.date);

  if (props.active) {
    return (
      <TimeBlock
        onClick={makeClicked}
        // onMouseOver={makeHover}
        // onMouseOut={makeNotHover}
      >
        {clicked ? (
          <Name bgcolor="#7986cb">{props.firstName}</Name>
        ) : (
          <Name></Name>
        )}
        <Time>{props.time}</Time>
        <Popover>
          <InlineWrapper>
            <Item1>{props.clicked ? "Slot Selected" : "Not Selected"}</Item1>
            <Item2>blah</Item2>
          </InlineWrapper>
          <InlineWrapper>
            {props.firstName} {props.lastName}
          </InlineWrapper>
        </Popover>
      </TimeBlock>
    );
  } else {
  }
  // else if (props.active) {
  //   return (
  //     <>
  //       <Popover
  //         clicked={clicked}
  //         firstName={props.firstName}
  //         lastName={props.lastName}
  //       />
  //       <TimeBlock
  //         onClick={makeClicked}
  //         // onMouseOver={makeHover}
  //         // onMouseOut={makeNotHover}
  //       >
  //         {clicked ? (
  //           <Name bgcolor="#7986cb">{props.firstName}</Name>
  //         ) : (
  //           <Name></Name>
  //         )}
  //         hovered
  //         <Time>{props.time}</Time>
  //       </TimeBlock>
  //     </>
  //   );
  // }

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
