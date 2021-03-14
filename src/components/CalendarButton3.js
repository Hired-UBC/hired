import { HowToVoteRounded } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Container = styled.div`
  height: 100px;
  width: ${(props) => (props.enlarge ? "16vw" : "")};
  display: block;
  //flex-direction: column;
  //cursor: pointer;
  //justify-content: ${(props) => (props.enlarge ? "" : "space-between")};
  //justify-content: space-between;
  //color: #0e0e0e;
  //padding: 5%;
  transition: all 250ms;
  position: relative;
  border: solid 1px #e0e0e0;
  //border-right: solid 1px #e0e0e0;
  margin: 0 0 -1px -1px;
  overflow: hide;

  &:hover {
    background-color: #f6f6f6;
  }
`;

const Interviewer = styled.span`
  margin-left: 5px;
  display: inline-box;
  background-color: ${(props) => props.bgcolor};
  color: white;
  width: fit-content;
  border-radius: 5px;
  padding: 1% 2% 1% 2%;
  font-size: 0.8em;
  font: open-sans;
  font-weight: 650;
`;

const Interviewee = styled.span`
  margin-left: 5px;
  margin-top: 5px;
  display: inline-box;
  background-color: ${(props) => props.bgcolor};
  color: white;
  width: fit-content;
  border-radius: 5px;
  padding: 1% 2% 1% 2%;
  font-size: 0.8em;
  font: open-sans;
  font-weight: 650;
`;

const Time = styled.div`
  display: inline-box;
  margin-top: 2px;
  margin-right: 2px;
  font-size: 1em;
  font: open-sans;
  font-weight: 400;
  text-align: right;
  align-items: start;
  justify-contents: end;
  //paddig-top: 2%;
  //padding-bottom: 7%;
  //padding-left: 10%;
`;

function CalendarButton3(props) {
  const [interviewer, setInterviewer] = useState(props.interviewer);
  const [interviewee, setInterviewee] = useState(props.interviewee);
  const [intervieweeEmail, setIntervieweeEmail] = useState(
    props.intervieweeEmail
  );
  const [enlarge, setEnlarge] = useState(props.enlarge);

  useEffect(() => {
    setEnlarge(props.enlarge);
  }, [props.enlarge]);

  const colors = ["#81c784", "#ffd54f", "#ff8a65", "#ba68c8", "#e57373"];

  return (
    <Container enlarge={enlarge}>
      <FlexWrapper style={{ justifyContent: "flex-end" }}>
        <Time>{props.time}</Time>
      </FlexWrapper>
      <FlexWrapper>
        {interviewer
          ? [
              interviewee ? (
                <ColumnWrapper>
                  <FlexWrapper style={{ justifyContent: "flex-start" }}>
                    {enlarge ? (
                      <>
                        <span>Interviewer: </span>
                        <Interviewer bgcolor="#7986cb">
                          {interviewer}
                        </Interviewer>
                      </>
                    ) : (
                      <Interviewer
                        style={{ padding: "3% 5% 3% 5%" }}
                        bgcolor="#7986cb"
                      >
                        {interviewer.charAt(0)}
                      </Interviewer>
                    )}
                  </FlexWrapper>
                  <FlexWrapper style={{ justifyContent: "flex-start" }}>
                    {enlarge ? (
                      <>
                        <span>Interviewee: </span>
                        <Interviewee bgcolor={colors[0]}>
                          {interviewee} {intervieweeEmail}
                        </Interviewee>
                      </>
                    ) : (
                      <Interviewee
                        style={{
                          textTransform: "capitalize",
                          padding: "3% 5% 3% 5%",
                        }}
                        bgcolor={colors[0]}
                      >
                        {interviewee.charAt(0)}
                      </Interviewee>
                    )}

                    {/* {interviewee.map((item, i) => {
                        return (
                          <Interviewee bgcolor={colors[i]}>{item}</Interviewee>
                        );
                      })} */}
                  </FlexWrapper>
                </ColumnWrapper>
              ) : (
                <Interviewer bgcolor="#e0e0e0">{interviewer}</Interviewer>
              ),
            ]
          : [
              <>
                <Interviewer></Interviewer>
                <Interviewee></Interviewee>
              </>,
            ]}
      </FlexWrapper>
    </Container>
  );
}

CalendarButton3.defaultProps = {
  time: "no time",
  //interviewer: "Han",
  //interviewee: ["Niko", "Jenny", "Kaylee"],
};

export default CalendarButton3;
