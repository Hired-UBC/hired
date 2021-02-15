import { HowToVoteRounded } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

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
  visibility: ${(props) => (props.visible ? "default" : "hidden")};
  background-color: white;
  position: absolute;
  width: 300px;
  height: 150px;
  display: flex;
  justify-content: flex;
  flex-direction: column;
  border: solid 1px #e0e0e0;
  padding: 10px;
  shadow: 0 0 0 4;
  z-index: 2;
  top: 100%;
  left: 0;
  box-shadow: 0 0.25rem 0.125rem 0 rgb(0 0 0 / 3%);
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
  cursor: pointer;
  justify-content: space-between;
  color: #0e0e0e;
  padding: 5%;
  transition: all 250ms;
  position: relative;
  border: solid 1px #e0e0e0;
  margin: 0 0 -1px -1px;

  &:hover {
    background-color: #f6f6f6;
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

const Time = styled.div`
  display: inline-box;
  font-size: 1em;
  font: open-sans;
  font-weight: 400;
  text-align: right;
  align-items: start;
  justify-contents: end;
  paddig-top: 2%;
  padding-bottom: 7%;
  padding-left: 10%;
`;

function CalendarButton(props) {
  const [clicked, setClicked] = useState(props.clicked);
  const [popover, setPopover] = useState(false);
  // const [hover, setHover] = useState(false);
  const [date, setDate] = useState(null);

  const makeClicked = () => {
    setClicked(!clicked);
    setPopover(true);
  };
  // const makeHover = () => setHover(true);
  // const makeNotHover = () => setHover(false);
  const storeDate = () => setDate(props.date);

  useEffect(() => {
    setClicked(props.clicked);
  }, [props.clicked]);

  if (props.active) {
    return (
      <TimeBlock
        // onClick={makeClicked}
        // onMouseOver={makeHover}
        onMouseLeave={() => setPopover(false)}
      >
        {clicked ? (
          <Name bgcolor="#7986cb">{props.firstName}</Name>
        ) : (
          <Name></Name>
        )}
        <Time>{props.time}</Time>
        <Popover visible={popover} onMouseLeave={() => setPopover(false)}>
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
