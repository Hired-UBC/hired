import React, { useEffect, useState } from "react";
import { OuterContainer, MainContent, PrimaryButton } from "./SharedComponents";
import {
  getAllCalendars,
  getCalendarByID,
  getUserByID,
  getSlotByID,
  updateCalendarByID,
} from "../utils/api";
import styled from "styled-components";
import CalendarButton from "./CalendarButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FullScreenModal } from "./Modals";

const HeadContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const GridContainer = styled.div`
  width: 70vw;
  height: auto;
  gap: 0;
  display: grid;
  grid-template-columns: repeat(7, calc(100% / 7));
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

function CalendarData({ scheduleObj }) {
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
  } = scheduleObj;
  //const slotsInDay = slotsInDay;
  console.log(slotsInDay);
  const dayDiff = getDays(dateStart, dateEnd);
  const weekNum = getWeeks(dayDiff);
  const [stateWeeks, setStateWeeks] = useState(0);
  const [displayArray, setDisplayArray] = useState(slotsInDay.slice(0, 7));
  // interviewer is userObj (current user that is logged in)
  const [userObj, setUserObj] = useState(JSON.parse(localStorage.getItem("userObj")));
  const [modal, setModal] = useState(false);
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

  const registerInterviewer = (i, j) => {
    if (
      slotsInDay[i + 7 * stateWeeks].timeSlots[j].interviewers.includes(userObj)
    ) {
      let index = slotsInDay[i + 7 * stateWeeks].timeSlots[
        j
      ].interviewers.indexOf(userObj);
      slotsInDay[i + 7 * stateWeeks].timeSlots[j].interviewers.splice(index, 1);
      console.log("deleted");
    } else {
      slotsInDay[i + 7 * stateWeeks].timeSlots[j].interviewers.push(userObj);
      console.log("registered");
    }

    setDisplayArray(slotsInDay.slice(7 * stateWeeks, 7 * stateWeeks + 7));
  };

  const increaseWeek = () => {
    setStateWeeks((stateWeeks + 1) % weekNum);
    setDisplayArray(
      slotsInDay.slice(
        7 * ((stateWeeks + 1) % weekNum),
        7 * ((stateWeeks + 1) % weekNum) + 7
      )
    );
    console.log("weekNum: " + stateWeeks);
  };
  const decreaseWeek = () => {
    setStateWeeks((stateWeeks + weekNum - 1) % weekNum);
    setDisplayArray(
      slotsInDay.slice(
        7 * ((stateWeeks + weekNum - 1) % weekNum),
        7 * ((stateWeeks + weekNum - 1) % weekNum) + 7
      )
    );
    console.log("weekNum: " + stateWeeks);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setModal(true);

    const updatedSchedule = {
      author: author,
      event_type: event_type,
      title: title,
      description: description,
      dateStart: dateStart,
      dateEnd: dateEnd,
      timeStart: timeStart,
      timeEnd: timeEnd,
      slotDuration: slotDuration,
      assignees: assignees,
      slotsInDay: slotsInDay,
    };

    updateCalendarByID(_id, updatedSchedule).then((res) => {
      console.log(res);
      console.log("Calendar updated");
    });
  };

  /*
  useEffect(() => {
    getUserByID(author).then((res) => {
      setInterviewer(res.data.firstName);
    });
  }, []);
  */

  console.log(slotsInDay[0].timeSlots[3].interviewers);
  return (
    <OuterContainer offset="0">
      <FullScreenModal open={modal}>
        {/* <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <div style={{display:"flex", jusfityContent:""}}> */}
        <IconWrapper
          onClick={() => {
            setModal(false);
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </IconWrapper>
        {/* </div> */}
        <div>Successfully Saved!</div>
        {/* </div> */}
      </FullScreenModal>
      <MainContent>
        <HeadContainer>
          <span style={{}}>
            <ClickableIcon onClick={decreaseWeek} icon={faArrowLeft} />
            <ClickableIcon onClick={increaseWeek} icon={faArrowRight} />
            Week {(stateWeeks % weekNum) + 1}
            {"  "} {new Date(displayArray[0].date).getFullYear()}{" "}
            {monthNames[new Date(displayArray[0].date).getMonth()]}
          </span>
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
                      fontSize: "2em",
                      fontWeight: "300",
                    }}
                  >
                    {dayNames[new Date(item.date).getDay()]}
                  </span>
                </DateDay>

                {item.timeSlots.map((subitem, subindex) => {
                  return (
                    <div
                      onClick={() => {
                        // registerInterviewer(subitem.time);
                        registerInterviewer(index, subindex);
                      }}
                    >
                      {subitem.interviewers.length > 0 ? (
                        <CalendarButton
                          time={subitem.time}
                          interviewer={userObj.firstName}
                        />
                      ) : (
                        <CalendarButton time={subitem.time} />
                      )}
                    </div>
                  );
                })}
              </GridFlex>
            );
          })}
        </GridContainer>
        <PrimaryButton onClick={handleUpdate}>Save</PrimaryButton>
      </MainContent>
    </OuterContainer>
  );
}
export default CalendarData;
