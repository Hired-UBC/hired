import { HowToVoteRounded } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const TimeBlock = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  background-color: #e8eaf6;
  color: #303f9f;
  padding: 5%;
  transition: all 250ms;
  position: relative;
  border: solid 1px #e0e0e0;
  margin: 0 0 -1px -1px;

  &:hover {
    background-color: #c5cae9;
  }
`;

const InactiveTimeBlock = styled.div`
  display: flex;
  cursor: not-allowed;
  justify-content: space-between;
  background-color: #f5f5f5;
  color: #d0d0d0;
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

function CalendarButton2(props) {
  const [interviewer, setClicked] = useState(props.interviewer);
  // const [popover, setPopover] = useState(false);
  // const [hover, setHover] = useState(false);
  const [date, setDate] = useState(null);

  // const makeClicked = () => {
  //   setPopover(true);
  // };
  // const makeHover = () => setHover(true);
  // const makeNotHover = () => setHover(false);
  const storeDate = () => setDate(props.date);

  console.log(props.interviewee);

  // useEffect(() => {
  //   setClicked(props.clicked);
  // }, [props.clicked]);

  // in case of multiple interviewers,
  // use if(props.interviewer.length > props.interviewee.length)
  // and use array of interviewers and interviewees
  // in case of 1 interviewer and multiple interviewee,
  // add number of interviewees in the infoform and take that as a prop
  // then use if(props.interviwee.length <= props.numberInterviewee)
  if (props.interviewer) {
    return (
      <TimeBlock
      // onClick={makeClicked}
      // onMouseOver={makeHover}
      // onMouseLeave={() => setPopover(false)}
      >
        {props.interviewee ? (
          <Name bgcolor="#7986cb">{props.interviewee}</Name>
        ) : (
          <Name></Name>
        )}
        <Time>{props.time}</Time>
        {/* <Popover visible={popover} onMouseLeave={() => setPopover(false)}>
          <InlineWrapper>
            <Item1>{props.clicked ? "Slot Selected" : "Not Selected"}</Item1>
            <Item2>blah</Item2>
          </InlineWrapper>
          <InlineWrapper>
            {props.interviewee}
          </InlineWrapper>
        </Popover> */}
      </TimeBlock>
    );
  } else {
    return (
      <InactiveTimeBlock>
        <Name></Name>
        <Time>{props.time}</Time>
      </InactiveTimeBlock>
    );
  }
}

CalendarButton2.defaultProps = {
  time: "no time",
  firstName: "First Name",
  lastName: "Last Name",
  active: true,
  clicked: false,
};

export default CalendarButton2;
