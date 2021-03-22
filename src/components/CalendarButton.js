import { HowToVoteRounded } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faDiceFive } from "@fortawesome/free-solid-svg-icons";
import { getUsersByIDArray } from "../utils/api";
import { UserIconContainer, theme } from "./SharedComponents";

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
  max-height: 80%;
  max-width: 60%;
  overflow: hidden;
  display: inline-box;
  background-color: ${(props) => props.bgcolor};
  color: white;
  border-radius: 100%;
`;

const Time = styled.div`
  display: inline-box;
  color: ${theme.color.mediumGray};
  text-align: right;
  align-items: start;
  justify-contents: end;
  paddig-top: 2%;
  padding-bottom: 7%;
  padding-left: 10%;
`;

function CalendarButton({ interviewers, ...props }) {
  const [popover, setPopover] = useState(props.popover);
  const [date, setDate] = useState(null);
  const [userObjArray, setUserObjArray] = useState();
  const makeClicked = (e) => {
    e.stopPropagation();
    setPopover(!popover);
  };

  useEffect(() => {
    if (interviewers?.length !== 0) {
      getUsersByIDArray(interviewers).then((res) => {
        setUserObjArray(res.data);
      });
    }
  }, [interviewers]);

  if (props.type == "interviewer") {
    return (
      <Container>
        <Time>
          {new Date(props.time).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          })}
        </Time>
        <div className="d-flex">
          {userObjArray &&
            userObjArray.map((userObj) => {
              return (
                <UserIconContainer
                  size={18}
                  borderColor={"white"}
                  noHover
                  style={{ margin: `${i !== 0 && "0 0 0 -6px"}` }}
                  bgColor={theme.color.secondaryGreen}
                >
                  {userObj.firstName.slice(0, 1)}
                  {userObj.lastName.slice(0, 1)}
                </UserIconContainer>
              );
            })}

        {/* <Popover visible={popover}>
          <InlineWrapper>
            <Item1>{interviewers ? "Slot Selected" : "Not Selected"}</Item1>
            <Item2>blah</Item2>
          </InlineWrapper>
          {userObjArray &&
            userObjArray.map((userObj) => {
              return <InlineWrapper>Interviewer: {userObj.firstName}</InlineWrapper>;
            })}
        </Popover>
        <ClickableIcon popover={popover} onClick={makeClicked} icon={faPlus} /> */}
      </Container>
    );
  } else if (props.type == "interviewee" && interviewers) {
    return (
      <Container>
        <FlexWrapper>
          <Name bgcolor="#7986cb">{props.interviewee}</Name>
          <Time>
            {new Date(props.time).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: false,
            })}
          </Time>
        </FlexWrapper>
      </Container>
    );
  } else if (props.type == "interviewee" && !interviewers) {
    return (
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
    );
  }
}

export default CalendarButton;
