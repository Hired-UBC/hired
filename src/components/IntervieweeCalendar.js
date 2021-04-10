import React, { useEffect, useState } from "react";
import { OuterContainer, MainContent, PrimaryButton, IconButton } from "./SharedComponents";
import {
  getUserByID,
  updateCalendarByID,
  updateUsersRemoveUpcomingEvent,
  updateUsersAddUpcomingEvent,
} from "../utils/api";
import styled from "styled-components";
import CalendarButton2 from "./CalendarButton2";
import CalendarButton from "./CalendarButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faAlignRight, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FullScreenModal } from "./Modals";

const HeadContainer = styled.div`
  width: 70vw;
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

function IntervieweeCalendar(props) {
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
    applicants,
    slotsInDay,
    _id,
  } = props.scheduleObj;
  //const slotsInDay = slotsInDay;
  //console.log(slotsInDay);
  const dayDiff = getDays(dateStart, dateEnd);
  const weekNum = getWeeks(dayDiff);
  const [stateWeeks, setStateWeeks] = useState(0);
  const [displayArray, setDisplayArray] = useState(slotsInDay.slice(0, 7));
  //const [interviewer, setInterviewer] = useState();
  const [selectedSlot, setSelectedSlot] = useState();
  const [modal, setModal] = useState(false);
  //console.log(displayArray);
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
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

  // if applicant is currently registered in slot, onClick => remove them from slot
  // if applicant is currently registered in another slot, onClick => remove them from prev. slot and add them to curr. slot
  // if applicant is not registered in any slot, onClick => add them to curr. slot
  const registerInterviewee = (i, j) => {
    const currSlot = slotsInDay[i + 7 * stateWeeks].timeSlots[j];
    if (
      slotsInDay[i + 7 * stateWeeks].timeSlots[j].interviewers.length > 0 && [
        slotsInDay[i + 7 * stateWeeks].timeSlots.intervieweeEmails == 0 &&
          slotsInDay[i + 7 * stateWeeks].timeSlots.intervieweeEmails.includes(props.intervieweeEmail),
      ]
    ) {
      if (currSlot.intervieweeEmails.includes(props.intervieweeEmail)) {
        let index = currSlot.intervieweeEmails.indexOf(props.intervieweeEmail);
        currSlot.interviewees.splice(index, 1);
        currSlot.intervieweeEmails.splice(index, 1);
        setSelectedSlot(null);
        console.log("deleted");
      } else {
        for (let k = 0; k < slotsInDay.length; k++) {
          for (let l = 0; l < slotsInDay[k].timeSlots.length; l++) {
            let index = slotsInDay[k].timeSlots[l].intervieweeEmails.indexOf(props.intervieweeEmail);
            if (index != -1) {
              console.log(index);
              slotsInDay[k].timeSlots[l].interviewees.splice(index, 1);
              slotsInDay[k].timeSlots[l].intervieweeEmails.splice(index, 1);
              console.log("user removed from previously selected slot");
            }
            index = -1;
          }
        }
        currSlot.interviewees.push(props.intervieweeName);
        currSlot.intervieweeEmails.push(props.intervieweeEmail);
        setSelectedSlot(currSlot);
        console.log("registered");
      }
      setDisplayArray(slotsInDay.slice(7 * stateWeeks, 7 * stateWeeks + 7));
      handleUpdate();
    }
  };

  // updates userObject of interviewer(s) and removes this slot from their upcoming events
  const removeInterviewerSlots = (slotObj1, interviewers) => {
    const eventToRemove = {
      calendarName: props.scheduleObj.title,
      date: slotObj1.time,
      slotID: slotObj1._id,
    };
    console.log(eventToRemove);
    updateUsersRemoveUpcomingEvent(eventToRemove, interviewers);
  };

  // updates userObject of interviewer(s) and adds this slot to their upcoming events
  // we only add a slot to upcoming events for interviewers once user hits save
  const addInterviewerSlots = (slotObj) => {
    const upcomingEvent = {
      calendarName: props.scheduleObj.title,
      calendarID: props.scheduleObj._id,
      date: slotObj.time,
      slotID: slotObj._id,
    };
    console.log(upcomingEvent);
    updateUsersAddUpcomingEvent(upcomingEvent, slotObj.interviewers);
  };

  const increaseWeek = () => {
    setStateWeeks((stateWeeks + 1) % weekNum);
    setDisplayArray(slotsInDay.slice(7 * ((stateWeeks + 1) % weekNum), 7 * ((stateWeeks + 1) % weekNum) + 7));
    // console.log("weekNum: " + stateWeeks);
  };
  const decreaseWeek = () => {
    setStateWeeks((stateWeeks + weekNum - 1) % weekNum);
    setDisplayArray(
      slotsInDay.slice(7 * ((stateWeeks + weekNum - 1) % weekNum), 7 * ((stateWeeks + weekNum - 1) % weekNum) + 7)
    );
    // console.log("weekNum: " + stateWeeks);
  };

  const handleUpdate = () => {
    // e.preventDefault();
    //console.log(slotsInDay);

    const updatedSchedule = {
      // author: author,
      // event_type: event_type,
      // title: title,
      // description: description,
      // dateStart: dateStart,
      // dateEnd: dateEnd,
      // timeStart: timeStart,
      // timeEnd: timeEnd,
      // slotDuration: slotDuration,
      // assignees: assignees,
      slotsInDay: slotsInDay,
    };

    updateCalendarByID(_id, updatedSchedule).then((res) => {
      //console.log(res);
      console.log("Calendar updated");
    });
    // setModal(true);
  };
  //   const updatedSchedule = {
  //     author: author,
  //     event_type: event_type,
  //     title: title,
  //     description: description,
  //     dateStart: dateStart,
  //     dateEnd: dateEnd,
  //     timeStart: timeStart,
  //     timeEnd: timeEnd,
  //     slotDuration: slotDuration,
  //     assignees: assignees,
  //     slotsInDay: slotsInDay,
  //   };

  //   updateCalendarByID(_id, updatedSchedule).then((res) => {
  //     console.log(res);
  //     console.log("Calendar updated");
  //   });
  // };

  // useEffect(() => {
  //   getUserByID(author).then((res) => {
  //     setInterviewer(res.data.firstName);
  //   });
  // }, []);

  return (
    <OuterContainer offset="0">
      <FullScreenModal open={modal}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", jusfityContent: "" }}>
            <IconWrapper
              onClick={() => {
                window.close();
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </IconWrapper>
          </div>
          <div>Successfully Registered!</div>
        </div>
        <PrimaryButton
          onClick={() => {
            window.close();
          }}
        >
          Okay!
        </PrimaryButton>
      </FullScreenModal>
      <MainContent style={{ height: "90vh" }}>
        <HeadContainer>
          <span style={{ width: "50%"}}>
            {stateWeeks > 0 ? (
              <IconButton onClick={decreaseWeek} icon={faArrowLeft} />
            ) : (
              <IconButton inactive={true} icon={faArrowLeft} />
            )}
            {stateWeeks < weekNum - 1 ? (
              <IconButton onClick={increaseWeek} icon={faArrowRight} />
            ) : (
              <IconButton inactive={true} icon={faArrowRight} />
            )}
            Week {stateWeeks + 1}
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
                        registerInterviewee(index, subindex);
                      }}
                    >
                      <CalendarButton
                        time={subitem.time}
                        type={"interviewee"}
                        interviewers={subitem.interviewers}
                        interviewees={subitem.interviewees}
                        intervieweeEmails={subitem.intervieweeEmails}
                        intervieweeEmail={props.intervieweeEmail}
                        intervieweeName={props.intervieweeName}
                      />
                      {/* {subitem.interviewers.length == 0 && <CalendarButton2 time={subitem.time} type={"interviewee"} />}
                      {subitem.interviewers > 0 &&
                        subitem.interviewers.length == subitem.interviewees.length &&
                        !subitem.interviewees.includes(props.intervieweeName) && (
                          <CalendarButton2 time={subitem.time} type={"interviewee"} />
                        )}
                      {subitem.interviewers.length > subitem.interviewees.length && (
                        <CalendarButton2
                          time={subitem.time}
                          interviewer={subitem.interviewers[0]}
                          interviewee={props.intervieweeName}
                          type={"interviewee"}
                        />
                      )}
                      {subitem.interviewers.length == subitem.interviewees.length &&
                        subitem.interviewees.includes(props.intervieweeName) && (
                          <CalendarButton2
                            time={subitem.time}
                            interviewer={subitem.interviewers[0]}
                            interviewee={props.intervieweeName}
                            type={"interviewee"}
                          />
                        )} */}

                      {/* below only for reference */}
                      {/* {subitem.interviewers.length > 0 && subitem.interviewees.includes(props.intervieweeName) && (
                        <CalendarButton2
                          time={subitem.time}
                          interviewer={subitem.interviewers[0]}
                          interviewee={props.intervieweeName}
                          type={"interviewee"}
                        />
                      )} */}
                      {/* {subitem.interviewers.length > 0 && !subitem.interviewees.includes(props.intervieweeName) && (
                        <CalendarButton2
                          time={subitem.time}
                          interviewer={subitem.interviewers[0]}
                          type={"interviewee"}
                        />
                      )} */}
                    </div>
                  );
                })}
              </GridFlex>
            );
          })}
        </GridContainer>
        <PrimaryButton
          style={{ position: "absolute", left: "15vw", top: "93vh" }}
          onClick={() => {
            if (selectedSlot != null) {
              addInterviewerSlots(selectedSlot);
              setModal(true);
            }
          }}
        >
          Save
        </PrimaryButton>
      </MainContent>
    </OuterContainer>
  );
}
export default IntervieweeCalendar;
