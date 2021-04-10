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
  background: ${(props) => props.selected && "#c5cae9"};
  display: flex;
  flex-direction: column;
  cursor: pointer;
  justify-content: space-between;
  padding: 5%;
  transition: all 250ms;
  position: relative;
  border: solid 1px #e0e0e0;
  margin: 0 0 -1px -1px;

  &:hover {
    // ${(props) => (props.selected ? "opacity: 0.8" : "background: #e8eaf6")};
    background: #e8eaf6;
  }
`;

const InactiveTimeBlock = styled.div`
  // width: 100%;
  // height: 5vh;
  display: flex;
  flex-direction: column;
  cursor: not-allowed;
  justify-content: space-between;
  background-color: #eeeeee;
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
  border-radius: 100%;
`;

const Time = styled.div`
  user-select: none;
  display: inline-box;
  color: ${(props) => (props.selected ? "#fafafa" : theme.color.mediumGray)};
  text-align: right;
  align-items: start;
  justify-contents: end;
  font-size: 0.8rem;
`;

function CalendarButton(props) {
  const [interviewersArray, setInterviewersArray] = useState([]);
  const [date, setDate] = useState(null);
  const [userObjArray, setUserObjArray] = useState();

  useEffect(() => {
    if (props.interviewers) {
      const a = [...props.interviewers];
      const b = [...interviewersArray];
      if (a.toString() !== b.toString() && props.interviewers.length > 0) {
        setInterviewersArray(a);
        getUsersByIDArray(props.interviewers).then((res) => {
          setUserObjArray(res.data);
        });
      }
    }
  }, [props.interviewers]);

  return (
    <>
      {props.type == "interviewer" && [
        props.interviewers.length < props.numAssignees ? (
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
                userObjArray.map((userObj, i) => {
                  return (
                    <UserIconContainer
                      size={18}
                      borderColor={"white"}
                      imgUrl={userObj?.settings?.iconUrl}
                      noHover
                      style={{ margin: `${i !== 0 && "0 0 0 -6px"}` }}
                      bgColor={`${
                        userObj?.settings?.bgColor ? userObj?.settings?.bgColor : theme.color.secondaryGreen
                      }`}
                    >
                      {userObj.firstName.slice(0, 1)}
                      {userObj.lastName.slice(0, 1)}
                    </UserIconContainer>
                  );
                })}
              {!userObjArray && <div style={{ height: "18px" }} />}
            </div>
          </Container>
        ) : (
          [
            props.interviewers.includes(props.currentUser) ? (
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
                    userObjArray.map((userObj, i) => {
                      return (
                        <UserIconContainer
                          size={18}
                          borderColor={"white"}
                          imgUrl={userObj?.settings?.iconUrl}
                          noHover
                          style={{ margin: `${i !== 0 && "0 0 0 -6px"}` }}
                          bgColor={`${
                            userObj?.settings?.bgColor ? userObj?.settings?.bgColor : theme.color.secondaryGreen
                          }`}
                        >
                          {userObj.firstName.slice(0, 1)}
                          {userObj.lastName.slice(0, 1)}
                        </UserIconContainer>
                      );
                    })}
                  {!userObjArray && <div style={{ height: "18px" }} />}
                </div>
              </Container>
            ) : (
              <InactiveTimeBlock>
                <Time>
                  {new Date(props.time).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false,
                  })}
                </Time>
                <div className="d-flex">
                  {userObjArray &&
                    userObjArray.map((userObj, i) => {
                      return (
                        <UserIconContainer
                          size={18}
                          borderColor={"white"}
                          imgUrl={userObj?.settings?.iconUrl}
                          noHover
                          style={{ margin: `${i !== 0 && "0 0 0 -6px"}` }}
                          bgColor={`${
                            userObj?.settings?.bgColor ? userObj?.settings?.bgColor : theme.color.secondaryGreen
                          }`}
                        >
                          {userObj.firstName.slice(0, 1)}
                          {userObj.lastName.slice(0, 1)}
                        </UserIconContainer>
                      );
                    })}
                  {!userObjArray && <div style={{ height: "18px" }} />}
                </div>
              </InactiveTimeBlock>
            ),
          ]
        ),
      ]}
      {props.type == "interviewee" && [
        props.interviewers.length === props.numAssignees
          ? [
              props.interviewees.includes(props.intervieweeEmail) ? (
                <Container selected={true}>
                  <FlexWrapper>
                    <Name></Name>
                    <Time selected={true}>
                      {new Date(props.time).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: false,
                      })}
                    </Time>
                  </FlexWrapper>
                </Container>
              ) : (
                <Container>
                  <FlexWrapper>
                    <Name></Name>
                    <Time>
                      {new Date(props.time).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: false,
                      })}
                    </Time>
                  </FlexWrapper>
                </Container>
              ),
            ]
          : [
              props.interviewers.length == props.intervieweeEmails.length &&
              props.intervieweeEmails.includes(props.intervieweeEmail) ? (
                <Container selected={true}>
                  <FlexWrapper>
                    <Name></Name>
                    <Time selected={true}>
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
            ],
      ]}
    </>
  );
}

export default CalendarButton;
