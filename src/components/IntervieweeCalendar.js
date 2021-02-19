import React, { useState, useEffect } from "react";
import CalendarButton2 from "./CalendarButton2.js";
import Calendar from "react-calendar";
import * as GrIcons from "react-icons/gr";
import { ContactMailOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

//Styled Components
const GridContainer = styled.div`
  margin-top: 5%;
  margin-left: 5%;
  max-width: 70%;
  max-height: 700px;
  gap: 0;
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, calc(100% / 7));
  grid-template-rows: 20px, 15px;
  grid-auto-rows: 1fr;
`;

const ClickableIcon = styled(FontAwesomeIcon)`
  font-size: 1.3rem;
  cursor: pointer;
  padding: 10px;
  border-radius: 100%;
  transition: all 250ms;
  :hover {
    background: #f3f3f3;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
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

function CalendarGrid(props) {
  const interviewee = props.interviewee;
  const numberOfWeeks = props.weeks;

  var displayArray = props.data;

  useEffect(() => {
    setStateDates(displayArray.slice(0, 7));
    setStateWeeks(0);
  }, [displayArray]);

  const [stateWeeks, setStateWeeks] = useState(0);
  const [stateDates, setStateDates] = useState(displayArray.slice(0, 7));

  console.log("interviewee displayArray:");
  console.log(displayArray);

  const registerInterviewee = (index, i) => {
    if (displayArray[index + 7 * stateWeeks].timeData[i].interviewer) {
      if (displayArray[index + 7 * stateWeeks].timeData[i].interviewee) {
        displayArray[index + 7 * stateWeeks].timeData[i].interviewee = null;
      } else {
        for (let j = 0; j < displayArray.length; j++) {
          for (let k = 0; k < displayArray[index].timeData.length; k++) {
            displayArray[j].timeData[k].interviewee = null;
          }
        }
        displayArray[index + 7 * stateWeeks].timeData[
          i
        ].interviewee = interviewee;
      }
      let start = stateWeeks * 7;
      let end = start + 7;
      console.log(`start:${start} , end:${end}`);
      setStateDates(displayArray.slice(start, end));
    }
  };

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

  return (
    <>
      <HeaderWrapper>
        <StyledWeek>
          <ClickableIcon onClick={decreaseWeek} icon={faArrowLeft} />
          <ClickableIcon onClick={increaseWeek} icon={faArrowRight} />
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
            <FlexContainer>
              <StyledDays>{item.day}</StyledDays>
              <StyledDates>{item.date}</StyledDates>
              {item.timeData.map((subitem, i) => {
                return (
                  <div>
                    <StyledBox
                      onClick={() => {
                        registerInterviewee(index, i);
                      }}
                    >
                      <CalendarButton2
                        time={subitem.time}
                        interviewer={subitem.interviewer}
                        interviewee={subitem.interviewee}
                      />
                    </StyledBox>
                  </div>
                );
              })}
            </FlexContainer>
          );
        })}
      </GridContainer>
    </>
  );
}

CalendarGrid.defaultProps = {
  interviewer: "Han Yu",
  interviewee: "Niko",
};

export default CalendarGrid;