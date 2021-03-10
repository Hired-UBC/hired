import React, { useState, useEffect } from "react";
import CalendarButton from "./CalendarButton.js";
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
  height: auto;
  display: flex;
  flex-direction: column;
`;

const GridContainer = styled.div`
  margin-top: 5%;
  margin-left: 5%;
  max-width: 70%;
  max-height: auto;
  gap: 0;
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, calc(100% / 7));
  grid-template-rows: 20px, 15px;
  grid-auto-rows: 1fr;
`;

const ClickableIcon = styled(FontAwesomeIcon)`
  font-size: 1.8em;
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

const Button1 = styled.span`
  margin-left: 68vw;
  margin-top: 15px;
  font-weight: 600;
  padding: 1% 2%;
  width: 3vw;
  font-family: open-sans, sans-serif;
  color: white;
  background-color: #5845cb;
  justify-content: center;
  align-item: center;
  border-radius: 0.3em;
  box-shadow: 0.1em 0.1em 0em #e0e0e0;
  visibility: ${(props) => (props.visibility ? "hidden" : "visible")};
  transition: hover 250ms;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    transform: translateY(3%);
    background-color: #4835bb;
    opacity: 1;
  }
`;

function CalendarGrid({ scheduleObj }) {
  const {
    author,
    event_type,
    title,
    description,
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    slotDuration,
    assignees,
    _id,
  } = scheduleObj;
  const dateDiff = dateEnd - dateStart;
  const startHour = timeStart.getHours();
  const finalHour = timeEnd.getHours();
  const startMin = 0;
  const finalMin = 0;
  var dayDiff = 1 + dateDiff / (24 * 60 * 60 * 1000);
  var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let startSplit = dateStart.toString();
  startSplit = startSplit.split(" ");
  let finalSplit = dateEnd.toString();
  finalSplit = finalSplit.split(" ");
  const startIndex = days.indexOf(startSplit[0]);

  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  //calculation functions
  function makeArrays(initialDate, dateEnd) {
    var arrayDays = new Array();
    var arrayDates = new Array();
    var arrayMonths = new Array();
    var arrayYears = new Array();
    let cDate = initialDate;
    while (cDate <= dateEnd) {
      let temp = new Date(cDate);
      temp = temp.toString();
      temp = temp.split(" ");
      arrayDays.push(temp[0]);
      arrayDates.push(temp[2]);
      arrayMonths.push(temp[1]);
      arrayYears.push(temp[3]);
      cDate = cDate.addDays(1);
    }

    return [arrayDays, arrayDates, arrayMonths, arrayYears];
  }

  function getTimeArray(initialHour, initialMin, finalHour, finalMin, length) {
    var startTime = Number(initialHour) * 60 + Number(initialMin);
    var finalTime = Number(finalHour) * 60 + Number(finalMin);
    var timeInterval = Number(length);
    var time = startTime;
    var arrayTime = new Array();
    var arrayInterviewer = new Array();
    var arrayInterviewee = new Array();

    for (time; time <= finalTime; time += timeInterval) {
      let hour = Math.floor(time / 60);
      let min = time % 60;
      if (min == 0) {
        min = "00";
      }
      arrayTime.push(hour.toString() + ":" + min.toString());
      arrayInterviewer.push(null);
      arrayInterviewee.push(null);
    }
    console.log(`arrayTime:${arrayTime}`);
    return [arrayTime, arrayInterviewer, arrayInterviewee];
  }

  function weekNum(days) {
    if (days <= 7) {
      var weekNumber = 1;
    } else {
      weekNumber = Math.ceil(days / 7);
    }
    return weekNumber;
  }

  //get arrays & variables
  var numberOfWeeks = weekNum(dayDiff);
  var array1 = makeArrays(dateStart, dateEnd);
  var array2 = getTimeArray(
    startHour,
    startMin,
    finalHour,
    finalMin,
    slotDuration
  );
  var daysArray = array1[0];
  var datesArray = array1[1];
  var monthsArray = array1[2];
  var yearsArray = array1[3];
  var timeArray = array2[0];
  var interviewerArray = array2[1];
  var intervieweeArray = array2[2];

  var combinedObject = new Array();

  for (let i = 0; i < dayDiff; i++) {
    let temp = {};
    temp.date = datesArray[i];
    temp.day = daysArray[i];
    temp.month = monthsArray[i];
    temp.year = yearsArray[i];
    temp.timeData = [];
    for (let j = 0; j < timeArray.length; j++) {
      temp.timeData.push({
        time: timeArray[j],
        interviewer: interviewerArray[j],
        interviewee: intervieweeArray[j],
      });
    }
    combinedObject[i] = temp;
  }

  //calendar grid from here
  const interviewer = interviewer;
  //const numberOfWeeks = numberOfWeeks;
  //var combinedObject = props.data;

  const [stateWeeks, setStateWeeks] = useState(0);
  const [stateDates, setStateDates] = useState(combinedObject.slice(0, 7));
  const [popover, setPopover] = useState(false);
  const [intervieweeCalendar, setIntervieweeCalendar] = useState(false);

  useEffect(() => {
    setStateDates(combinedObject.slice(0, 7));
    setStateWeeks(0);
  }, [combinedObject]);

  const registerInterviewer = (index, i) => {
    if (combinedObject[index + 7 * stateWeeks].timeData[i].interviewer) {
      combinedObject[index + 7 * stateWeeks].timeData[i].interviewer = null;
    } else {
      combinedObject[index + 7 * stateWeeks].timeData[
        i
      ].interviewer = interviewer;
    }
    let start = stateWeeks * 7;
    let end = start + 7;
    console.log(`start:${start} , end:${end}`);
    setStateDates(combinedObject.slice(start, end));
  };

  const increaseWeek = () => {
    // setPopover(false);
    setStateWeeks((stateWeeks + 1) % numberOfWeeks);
    setStateDates(
      combinedObject.slice(
        7 * ((stateWeeks + 1) % numberOfWeeks),
        7 * ((stateWeeks + 1) % numberOfWeeks) + 7
      )
    );
  };
  const decreaseWeek = () => {
    // setPopover(false);
    setStateWeeks((stateWeeks + numberOfWeeks - 1) % numberOfWeeks);
    setStateDates(
      combinedObject.slice(
        7 * ((stateWeeks + numberOfWeeks - 1) % numberOfWeeks),
        7 * ((stateWeeks + numberOfWeeks - 1) % numberOfWeeks) + 7
      )
    );
  };

  const showShareLink = () => {
    setIntervieweeCalendar(true);
  };

  return (
    <>
      {!intervieweeCalendar && (
        <Container>
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
                            registerInterviewer(index, i);
                          }}
                        >
                          <CalendarButton
                            time={subitem.time}
                            interviewer={subitem.interviewer}
                            firstName="Han"
                            popover={popover}
                          />
                        </StyledBox>
                      </div>
                    );
                  })}
                </FlexContainer>
              );
            })}
          </GridContainer>
          <Button1 onClick={showShareLink}>Confirm</Button1>
        </Container>
      )}
      {intervieweeCalendar && (
        <IntervieweeCalendar data={combinedObject} weeks={numberOfWeeks} />
      )}
    </>
  );
}

CalendarGrid.defaultProps = {
  interviewer: "Han Yu",
};

export default CalendarGrid;
