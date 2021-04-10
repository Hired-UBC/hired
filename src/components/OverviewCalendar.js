import React, { useState, useEffect } from "react";
import CalendarButton3 from "./CalendarButton3.js";
import IntervieweeCalendar from "./IntervieweeCalendar";
import Calendar from "react-calendar";
import * as GrIcons from "react-icons/gr";
import { ContactMailOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

//Styled Components
const Container = styled.div`
  width: 100vw;
  height: 100vw;
  display: flex;
  flex-direction: column;
`;

const GridContainer = styled.div`
  margin-top: 5%;
  margin-left: 5%;
  //max-width: 70vw;
  gap: 0;
  display: flex;
  justify-content: flex-start;
`;

const ClickableIcon = styled(FontAwesomeIcon)`
  font-size: 1.8em;
  color: black;
  width: 100%;
  height: 100%;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: all 250ms;
  :hover {
    background: #f3f3f3;
    color: #3f51b5;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.enlarge ? "16vw" : "7vw")};
`;

const HeaderWrapper = styled.div`
  height: 4em;
  display: flex;
  align-items: center;
`;

const StyledDates = styled.div`
  font-size: 2em;
  font: open-sans;
  font-weight: 500;
  color: #4f4f4f;
  text-align: center;
  vertical-align: center;
  align-items: center;
  justify-contents: center;
  margin: 0 0 -1px -1px;
  border-left: solid 1px #e0e0e0;
  border-right: solid 1px #e0e0e0;
  border-bottom: solid 1px #e0e0e0;
`;

const StyledWeek = styled.h3`
  font: open-sans;
  backgound-color: blue;
  font-size: 1.5rem;
  display: flex;
  text-align: center;
  vertical-align: center;
  margin-top 5%;
  margin-left 5%;
  display: flex;
  align-items: center;
`;

const StyledYear = styled.h3`
  font-weight: 0.8em;
  text-align: center;
  vertical-align: center;
  font-size: 1.5rem;
  margin: 0;
  font: sans-serif;
`;

const StyledDays = styled.div`
  color: #4f4f4f;
  font-size: 1em;
  font: sans-serif;
  text-align: center;
  vertical-align: center;
  align-items: center;
  justify-contents: center;
`;

const StyledBox = styled.div`
  text-align: center;
  vertical-align: center;
  font-size: 1em;
  width: 100%;
  height: 70%;
`;

function OverviewCalendar(props) {
  const numberOfWeeks = props.weeks;
  var displayArray = props.data;

  const [stateWeeks, setStateWeeks] = useState(0);
  const [stateDates, setStateDates] = useState(displayArray.slice(0, 7));
  const [interviewee, setInterviewee] = useState(props.interviewee);

  useEffect(() => {
    setStateDates(displayArray.slice(0, 7));
    setStateWeeks(0);
  }, [displayArray]);

  const increaseWeek = () => {
    setStateWeeks((stateWeeks + 1) % numberOfWeeks);
    setStateDates(
      displayArray.slice(
        7 * ((stateWeeks + 1) % numberOfWeeks),
        7 * ((stateWeeks + 1) % numberOfWeeks) + 7
      )
    );
  };
  const decreaseWeek = () => {
    setStateWeeks((stateWeeks + numberOfWeeks - 1) % numberOfWeeks);
    setStateDates(
      displayArray.slice(
        7 * ((stateWeeks + numberOfWeeks - 1) % numberOfWeeks),
        7 * ((stateWeeks + numberOfWeeks - 1) % numberOfWeeks) + 7
      )
    );
  };

  const makeEnlarge = (index) => {
    displayArray[index + 7 * stateWeeks].enlarge = !displayArray[
      index + 7 * stateWeeks
    ].enlarge;
    setStateDates(displayArray.slice(stateWeeks * 7, stateWeeks * 7 + 7));
  };

  return (
    <>
      <Container>
        <HeaderWrapper>
          <StyledWeek>
            <ClickableIcon size="1" onClick={decreaseWeek} icon={faArrowLeft} />
            <ClickableIcon
              size="1"
              onClick={increaseWeek}
              icon={faArrowRight}
            />
            <span style={{ margin: "0 15px" }}>
              Week {(stateWeeks % numberOfWeeks) + 1}
            </span>
            <StyledYear>
              {"  "} {stateDates[0].year} {stateDates[0].month}
            </StyledYear>
          </StyledWeek>
        </HeaderWrapper>
        <GridContainer columns={stateDates.length}>
          {stateDates.map((item, index) => {
            return (
              <FlexContainer enlarge={item.enlarge}>
                <StyledDays>{item.day}</StyledDays>
                <StyledDates>{item.date}</StyledDates>
                {item.timeData.map((subitem, i) => {
                  return (
                    <div>
                      <StyledBox
                        onClick={() => {
                          makeEnlarge(index);
                        }}
                      >
                        <CalendarButton3
                          time={subitem.time}
                          interviewer={subitem.interviewer}
                          interviewee={subitem.interviewee}
                          intervieweeEmail={subitem.intervieweeEmail}
                          enlarge={item.enlarge}
                        />
                      </StyledBox>
                    </div>
                  );
                })}
              </FlexContainer>
            );
          })}
        </GridContainer>
      </Container>
    </>
  );
}

export default OverviewCalendar;
