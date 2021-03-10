import { HowToVoteRounded } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ClickableIcon = styled(FontAwesomeIcon)`
  font-size: 0.8 rem;
  cursor: pointer;
  padding: 4px;
  transition: transform 250ms;
  color: ${(props) => (props.popover ? "#3f51b5" : "#dadada")};

  &:hover {
    transform: rotate(180deg);
    color: ${(props) => (props.popover ? "#3f51b5" : "#b0b0b0")};
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
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

const InactiveTimeBlock = styled.div`
  display: flex;
  cursor: not-allowed;
  justify-content: space-between;
  background-color: $a6a6a6;
  color: white;
  padding: 5%;
  transition: all 250ms;
  position: relative;
  border: solid 1px #e0e0e0;
  margin: 0 0 -1px -1px;
`;

const Name = styled.span`
  overflow: hidden;
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
  const [interviewer, setInterviewer] = useState(props.interviewer);
  const [popover, setPopover] = useState(props.popover);
  // const [hover, setHover] = useState(false);
  const [date, setDate] = useState(null);

  const makeClicked = (e) => {
    e.stopPropagation();
    setPopover(!popover);
  };
  // const makeHover = () => setHover(true);
  // const makeNotHover = () => setHover(false);
  const storeDate = () => setDate(props.date);

  useEffect(() => {
    setInterviewer(props.interviewer);
  }, [props.interviewer]);

  // useEffect(() => {
  //   setPopover(props.popover);
  // }, [props.popover]);

  return (
    <Container
    // onClick={makeClicked}
    // onMouseOver={makeHover}
    // onMouseLeave={() => setPopover(false)}
    >
      <FlexWrapper>
        {interviewer ? (
          <Name bgcolor="#7986cb">{props.interviewer}</Name>
        ) : (
          <Name></Name>
        )}
        <Time>{props.time}</Time>
      </FlexWrapper>

      <Popover
        visible={popover}
        // onMouseLeave={() => setPopover(false)}
      >
        <InlineWrapper>
          <Item1>{props.interviewer ? "Slot Selected" : "Not Selected"}</Item1>
          <Item2>blah</Item2>
        </InlineWrapper>
        <InlineWrapper>Interviewer: {props.interviewer}</InlineWrapper>
      </Popover>
      <ClickableIcon popover={popover} onClick={makeClicked} icon={faPlus} />
    </Container>
  );
  // else if (props.active) {
  //   return (
  //     <>
  //       <Popover
  //         clicked={clicked}
  //         firstName={props.interviewer}
  //         lastName={props.lastName}
  //       />
  //       <TimeBlock
  //         onClick={makeClicked}
  //         // onMouseOver={makeHover}
  //         // onMouseOut={makeNotHover}
  //       >
  //         {clicked ? (
  //           <Name bgcolor="#7986cb">{props.interviewer}</Name>
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
  //           <p className="interviewer">{clicked ? `${props.interviewer}` : ""}</p>
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
  //               {props.interviewer} {props.lastName}
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
