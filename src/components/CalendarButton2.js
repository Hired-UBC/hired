import { HowToVoteRounded } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getUserByID } from "../utils/api";
import { propTypes } from "react-bootstrap/esm/Image";

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
  background-color: #e8eaf6;
  color: #303f9f;
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
  user-select: none;
  max-height: 80%;
  max-width: 60%;
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
  user-select: none;
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
  const [interviewee, setInterviewee] = useState();


  return (
    <>
      {props.interviewers.length > props.interviewees.length ? (
        <Container>
          <FlexWrapper>
            {props.interviewees.includes(props.intervieweeName) && (
              <Name bgcolor="#7986cb">{props.intervieweeName}</Name>
            )}
            <Time>
              {new Date(props.time).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: false,
              })}
            </Time>
          </FlexWrapper>
        </Container>
      ) : (
        [
          props.interviewers.length == props.interviewees.length &&
          props.interviewees.includes(props.intervieweeName) ? (
            <Container>
              <FlexWrapper>
                <Name bgcolor="#7986cb">{props.intervieweeName}</Name>
                <Time>
                  {new Date(props.time).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false,
                  })}
                </Time>
              </FlexWrapper>
            </Container>
          ) : (
            <InactiveTimeBlock>
              <Name></Name>
              <Time>
                {new Date(props.time).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false,
                })}
              </Time>
            </InactiveTimeBlock>
          ),
        ]
      )}
    </>
  );
}

export default CalendarButton2;