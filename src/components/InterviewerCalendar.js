import React, { useEffect, useState } from "react";
import { OuterContainer, MainContent, PrimaryButton, IconButton } from "./SharedComponents";
import { getUserByID, updateCalendarByID } from "../utils/api";
import styled from "styled-components";
import CalendarButton from "./CalendarButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FullScreenModal } from "./Modals";

const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GridContainer = styled.div`
  width: 70vw;
  height: auto;
  gap: 0;
  display: grid;
  grid-template-columns: repeat(7, calc(100% / 7));
  overflow: hidden;
`;

const GridFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ClickableIcon = styled(FontAwesomeIcon)`
  font-size: 1.8em;
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 100%;
  transition: all 250ms;
  :hover {
    background: #f3f3f3;
  }
`;

const DateDay = styled.div`
  text-align: center;
`;

const IconWrapper = styled.span`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  left: 90%;
  border-radius: 50%;
  transition: background 250ms;

  &:hover {
    background: #e0e0e0;
  }

  &:active {
    transform: translateY(5%);
  }
`;

const CalendarWindow = styled.div`
  width: 100%;
  height: 70vh;
  overflow-y: scroll;
  overflow-x: hidden;
`;

function InterviewerCalendar({ scheduleObj }) {
  const [modal, setModal] = useState(false);

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
    slotsInDay,
    _id,
    numAssignees,
  } = scheduleObj;
  
  console.log(slotsInDay);
  const dayDiff = getDays(dateStart, dateEnd);
  const weekNum = getWeeks(dayDiff);
  const [stateWeeks, setStateWeeks] = useState(0);
  const [displayArray, setDisplayArray] = useState(slotsInDay.slice(0, 7));
  const [saved, setSaved] = useState(true);
  const [userObj, setUserObj] = useState(JSON.parse(localStorage.getItem("userObj")));
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  function getDays(startD, endD) {
    let SD = new Date(startD);
    SD = SD.getTime();
    let ED = new Date(endD);
    ED = ED.getTime();
    let dayDif = (ED - SD) / (24 * 60 * 60 * 1000);
    return dayDif;
  }

  function getWeeks(days) {
    let week = Math.ceil(days / 7);
    return week;
  }

  const handleUpdate = () => {
    setSaved(false);
    setDisplayArray(slotsInDay.slice(7 * stateWeeks, 7 * stateWeeks + 7));
    const updatedSchedule = {
      slotsInDay: slotsInDay,
    };
    updateCalendarByID(_id, updatedSchedule).then((res) => {
      setDisplayArray(res.slotsInDay.slice(7 * stateWeeks, 7 * stateWeeks + 7));
      setSaved(true);
    });
  };

  const checkInterviewerForSlot = (i, j) => {
    const currSlot = slotsInDay[i + 7 * stateWeeks].timeSlots[j];
    const currNumInterviewers = currSlot.interviewers.length;
    if (currNumInterviewers >= numAssignees) {
      return false;
    } else {
      return true;
    }
  };

  const registerInterviewer = (i, j) => {
    if (slotsInDay[i + 7 * stateWeeks].timeSlots[j].interviewers.includes(userObj._id)) {
      let index = slotsInDay[i + 7 * stateWeeks].timeSlots[j].interviewers.indexOf(userObj._id);
      slotsInDay[i + 7 * stateWeeks].timeSlots[j].interviewers.splice(index, 1);
      console.log("Calendar updated: deleted");
    } else {
      if (checkInterviewerForSlot(i, j)) {
        slotsInDay[i + 7 * stateWeeks].timeSlots[j].interviewers.push(userObj._id);
        console.log("Calendar updated: registered");
      } else {
        console.log("This slot has reached the maximum number of interviewers: ", numAssignees);
        return;
      }
    }
    handleUpdate();
    setDisplayArray(slotsInDay.slice(7 * stateWeeks, 7 * stateWeeks + 7));
  };

  const increaseWeek = () => {
    setStateWeeks((stateWeeks + 1) % weekNum);
    setDisplayArray(slotsInDay.slice(7 * ((stateWeeks + 1) % weekNum), 7 * ((stateWeeks + 1) % weekNum) + 7));
    console.log("weekNum: " + stateWeeks);
  };

  const decreaseWeek = () => {
    setStateWeeks((stateWeeks + weekNum - 1) % weekNum);
    setDisplayArray(
      slotsInDay.slice(7 * ((stateWeeks + weekNum - 1) % weekNum), 7 * ((stateWeeks + weekNum - 1) % weekNum) + 7)
    );
    console.log("weekNum: " + stateWeeks);
  };

  /*
  useEffect(() => {
    setInterviewer(userObj.firstName);
  }, []);
  */

  // console.log(slotsInDay[0].timeSlots[3].interviewers);
  return (
    <div>
      <HeadContainer>
        <span>
          <IconButton onClick={decreaseWeek} icon={faArrowLeft} />
          <IconButton onClick={increaseWeek} icon={faArrowRight} />
          Week {(stateWeeks % weekNum) + 1}
          {"  "} {new Date(displayArray[0].date).getFullYear()} {monthNames[new Date(displayArray[0].date).getMonth()]}
        </span>
        {saved ? <span style={{ color: "#4caf50", fontWeight: 600 }}>Saved!</span> : <span>Saving...</span>}
      </HeadContainer>
      <GridContainer>
        {displayArray.map((item, index) => {
          return (
            <GridFlex>
              <DateDay>
                <span
                  style={{
                    fontSize: "1.4em",
                    fontWeight: "600",
                  }}
                >
                  {new Date(item.date).getDate()}
                </span>
                <br />
                <span
                  style={{
                    fontSize: "1.8em",
                    fontWeight: "300",
                  }}
                >
                  {dayNames[new Date(item.date).getDay()]}
                </span>
              </DateDay>
            </GridFlex>
          );
        })}
      </GridContainer>
      <CalendarWindow>
        <GridContainer>
          {displayArray.map((item, index) => {
            return (
              <GridFlex>
                {item.timeSlots.map((subitem, subindex) => {
                  return (
                    <div
                      onClick={() => {
                        registerInterviewer(index, subindex);
                      }}
                    >
                      {subitem.interviewers.length > 0 && (
                        <CalendarButton time={subitem.time} interviewers={subitem.interviewers} type={"interviewer"} />
                      )}
                      {subitem.interviewers.length < 1 && <CalendarButton time={subitem.time} type={"interviewer"} />}
                    </div>
                  );
                })}
              </GridFlex>
            );
          })}
        </GridContainer>
      </CalendarWindow>
    </div>
  );
}
export default InterviewerCalendar;
