import React, { useEffect, useState } from "react";
import { OuterContainer, MainContent, PrimaryButton, IconButton } from "./SharedComponents";
import { getUserByID, updateCalendarByID, updateUsersRemoveUpcomingEvent, updateUsersAddUpcomingEvent } from "../utils/api";
import styled from "styled-components";
import CalendarButton2 from "./CalendarButton2";
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
        slotsInDay[i + 7 * stateWeeks].timeSlots.interviewees == 0 &&
          slotsInDay[i + 7 * stateWeeks].timeSlots.interviewees.includes(props.intervieweeName),
      ]
    ) {
      if (currSlot.interviewees.includes(props.intervieweeName)) {
        let index = currSlot.interviewees.indexOf(props.intervieweeName);
        currSlot.interviewees.splice(index, 1);
        currSlot.intervieweeEmails.splice(index, 1);
        setSelectedSlot(null);
        console.log("deleted");
      } else {
        for (let k = 0; k < slotsInDay.length; k++) {
          for (let l = 0; l < slotsInDay[k].timeSlots.length; l++) {
            let index = slotsInDay[k].timeSlots[l].interviewees.indexOf(props.intervieweeName);
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
    }
    console.log(eventToRemove);
    updateUsersRemoveUpcomingEvent(eventToRemove, interviewers);
  }

  // updates userObject of interviewer(s) and adds this slot to their upcoming events
  // we only add a slot to upcoming events for interviewers once user hits save
  const addInterviewerSlots = (slotObj) => {
    const upcomingEvent = {
      calendarName: props.scheduleObj.title, 
      calendarID: props.scheduleObj._id,
      date: slotObj.time,
      slotID: slotObj._id,
    }
    console.log(upcomingEvent);
    updateUsersAddUpcomingEvent(upcomingEvent, slotObj.interviewers);
  }

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
      <MainContent>
        <HeadContainer>
          <span style={{}}>
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

// import React, { useState, useEffect } from "react";
// import CalendarButton2 from "./CalendarButton2.js";
// import Calendar from "react-calendar";
// import * as GrIcons from "react-icons/gr";
// import { ContactMailOutlined } from "@material-ui/icons";
// import styled from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft, faArrowRight, faEdit, faCheckSquare, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
// import OverviewCalendar from "./OverviewCalendar";
// import { FullScreenModal } from "./Modals.js";
// import { PrimaryButton, InputField } from "./SharedComponents.js";

// //Styled Components
// const Container = styled.div`
//   user-select: none;
//   width: 73vw;
//   height: auto;
//   display: flex;
//   flex-direction: column;
// `;

// const HeaderWrapper = styled.div`
//   display: flex;
//   height: 10vh;
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-end;
// `;

// const StyledWeek = styled.h3`
//   margin-left: 5vw;
//   font: open-sans;
//   font-size: 1.5rem;
//   display: flex;
//   text-align: center;
//   vertical-align: center;
//   align-items: center;
// `;

// const ClickableIcon = styled(FontAwesomeIcon)`
//   font-size: 1.8em;
//   color: black;
//   width: 100%;
//   height: 100%;
//   cursor: pointer;
//   padding: 10px;
//   border-radius: 50%;
//   transition: all 250ms;
//   :hover {
//     background: #f3f3f3;
//     color: #3f51b5;
//   }
// `;

// const NonClickableIcon = styled(FontAwesomeIcon)`
//   font-size: 5em;
//   color: #3f51b5;
//   width: 100%;
//   height: 100%;
//   padding: 10px;
//   border-radius: 50%;
//   transition: all 250ms;
// `;

// const StyledYear = styled.h3`
//   font-weight: 0.8em;
//   text-align: center;
//   vertical-align: center;
//   font-size: 1.5rem;
//   margin: 0;
//   font: sans-serif;
// `;

// const GridContainer = styled.div`
//   margin-top: 1vh;
//   margin-left: 5%;
//   max-width: 70vw;
//   max-height: auto;
//   gap: 0;
//   display: grid;
//   grid-template-columns: repeat(${(props) => props.columns}, calc(100% / 7));
//   grid-template-rows: 20px, 15px;
//   grid-auto-rows: 1fr;
// `;

// const FlexContainer = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const StyledDates = styled.div`
//   font-size: 2em;
//   font: open-sans;
//   font-weight: 500;
//   color: #4f4f4f;
//   text-align: center;
//   vertical-align: center;
//   align-items: center;
//   justify-contents: center;
//   margin: 0 0 -1px -1px;
//   border-left: solid 1px #e0e0e0;
//   border-right: solid 1px #e0e0e0;
//   border-bottom: solid 1px #e0e0e0;
// `;

// const StyledDays = styled.div`
//   color: #4f4f4f;
//   font-size: 1em;
//   font: sans-serif;
//   text-align: center;
//   vertical-align: center;
//   align-items: center;
//   justify-contents: center;
// `;

// const StyledBox = styled.div`
//   user-select: none;
//   text-align: center;
//   vertical-align: center;
//   font-size: 1em;
//   width: 100%;
//   height: 70%;
// `;

// const FormWrapper = styled.div`
//   position: absolute;
//   top: 50vh;
//   left: 50vw;
//   transform: translateX(-200px) translateY(-100px);
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: start;
//   width: 400px;
//   height: 200px;
//   padding: 20px;
//   border: solid 1px grey;
//   border-radius: 20px;
//   box-shadow: 5px 5px 4px #e0e0e0;
// `;

// const Form = styled.form`
//   width: 95%;
// `;

// const NameInput = styled.input`
//   width: 36%;
//   border: solid 1px grey;
//   border-radius: 0.3em;
//   overflow: hidden;
//   &:focus {
//     outline: none;
//     border: 1px solid blue;
// `;

// const EmailInput = styled.input`
//   width: 80%;
//   border: solid 1px grey;
//   border-radius: 0.3em;
//   overflow: hidden;
//   &:focus {
//     outline: none;
//     border: 1px solid blue;
// `;

// const Submit = styled.button`
//   user-select: none;
//   width: 7vw;
//   background: #3f51b5;
//   color: white;
//   //font-family: open-sans;
//   padding: 0.5% 0.5%;
//   font-weight: 600;
//   border: none;
//   text-decoration: none;
//   border-radius: 0.3em;
//   transition: opacity 250ms;

//   &:hover {
//     opacity: 0.8;
//   }

//   &:active {
//     transform: translateY(3%);
//   }
// `;

// const Confirmation = styled.div`
//   position: absolute;
//   right: 50vw;
//   top: 50vh;
//   transform: translateY(-50%) translateX(-50%);
//   width: 20vw;
//   height: 20vh;
//   border-radius: 20px;
//   border: solid 1px grey;
// `;

// function CalendarGrid(props) {
//   //const interviewee = props.interviewee;
//   //const intervieweeEmail = props.email;
//   const numberOfWeeks = props.weeks;

//   var displayArray = props.data;

//   useEffect(() => {
//     setStateDates(displayArray.slice(0, 7));
//     setStateWeeks(0);
//   }, [displayArray]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setInterviewee(firstName);
//   };

//   const [firstName, setFirstName] = useState(null);
//   const [lastName, setLastName] = useState(null);
//   const [interviewee, setInterviewee] = useState(null);
//   const [intervieweeEmail, setIntervieweeEmail] = useState(null);
//   const [stateWeeks, setStateWeeks] = useState(0);
//   const [stateDates, setStateDates] = useState(displayArray.slice(0, 7));
//   const [submitted, setSubmitted] = useState();
//   const [date, setDate] = useState();
//   const [showOverview, setShowOverview] = useState();

//   const registerInterviewee = (index, i) => {
//     if (displayArray[index + 7 * stateWeeks].timeData[i].interviewer) {
//       if (displayArray[index + 7 * stateWeeks].timeData[i].registered == interviewee) {
//         displayArray[index + 7 * stateWeeks].timeData[i].registered = null;
//       } else if (displayArray[index + 7 * stateWeeks].timeData[i].registered == null) {
//         for (let j = 0; j < displayArray.length; j++) {
//           for (let k = 0; k < displayArray[index].timeData.length; k++) {
//             if (displayArray[j].timeData[k].registered == interviewee) {
//               displayArray[j].timeData[k].registered = null;
//             }
//           }
//         }
//         displayArray[index + 7 * stateWeeks].timeData[i].registered = interviewee;
//       }
//       let start = stateWeeks * 7;
//       let end = start + 7;
//       console.log(`start:${start} , end:${end}`);
//       setStateDates(displayArray.slice(start, end));
//     }
//   };

//   const submit = () => {
//     let name = firstName + "\xa0" + lastName;
//     setInterviewee(name);
//     console.log(name);
//     console.log(interviewee);
//     setSubmitted(true);
//     for (let j = 0; j < displayArray.length; j++) {
//       for (let k = 0; k < displayArray[j].timeData.length; k++) {
//         if (displayArray[j].timeData[k].registered == interviewee) {
//           displayArray[j].timeData[k].registered = true;
//           displayArray[j].timeData[k].interviewee = interviewee;
//           displayArray[j].timeData[k].intervieweeEmail = intervieweeEmail;
//           //displayArray[j].timeData[k].interviewee.email = intervieweeEmail;
//           let temp = `${displayArray[j].month} ${displayArray[j].date} ${displayArray[j].day} at ${displayArray[j].timeData[k].time}`;
//           setDate(temp);
//           break;
//         }
//         console.log(displayArray);
//       }
//     }
//   };

//   const rename = () => {
//     for (let j = 0; j < displayArray.length; j++) {
//       for (let k = 0; k < displayArray[0].timeData.length; k++) {
//         if (displayArray[j].timeData[k].registered == interviewee) {
//           displayArray[j].timeData[k].registered = null;
//         }
//       }
//     }
//     setInterviewee(null);
//   };

//   const increaseWeek = () => {
//     setStateWeeks((stateWeeks + 1) % numberOfWeeks);
//     setStateDates(
//       displayArray.slice(7 * ((stateWeeks + 1) % numberOfWeeks), 7 * ((stateWeeks + 1) % numberOfWeeks) + 7)
//     );
//   };
//   const decreaseWeek = () => {
//     setStateWeeks((stateWeeks + numberOfWeeks - 1) % numberOfWeeks);
//     setStateDates(
//       displayArray.slice(
//         7 * ((stateWeeks + numberOfWeeks - 1) % numberOfWeeks),
//         7 * ((stateWeeks + numberOfWeeks - 1) % numberOfWeeks) + 7
//       )
//     );
//   };

//   return (
//     <>
//       {interviewee && (
//         <Container>
//           {showOverview && <OverviewCalendar interviewee={interviewee} data={displayArray} weeks={numberOfWeeks} />}
//           {submitted ? (
//             <FullScreenModal open={true}>
//               {/* <NonClickableIcon size={"1.8em"} icon={faCheckCircle} /> */}
//               <h4>
//                 <div>Your interview has been scheduled!</div>
//                 <div>{date}</div>
//               </h4>
//               <PrimaryButton
//                 onClick={() => {
//                   setShowOverview(true);
//                   setSubmitted();
//                 }}
//               >
//                 Show Overview
//               </PrimaryButton>
//             </FullScreenModal>
//           ) : (
//             <>
//               <HeaderWrapper>
//                 <StyledWeek>
//                   <ClickableIcon size="1" onClick={decreaseWeek} icon={faArrowLeft} />
//                   <ClickableIcon onClick={increaseWeek} icon={faArrowRight} />
//                   <span style={{ margin: "0 15px" }}>Week {(stateWeeks % numberOfWeeks) + 1}</span>
//                   <StyledYear>
//                     {"  "} {stateDates[0].year} {stateDates[0].month}
//                   </StyledYear>
//                 </StyledWeek>
//                 <div style={{ display: "flex", alignItems: "center" }}>
//                   <p style={{ textAlign: "right" }}>
//                     {`${firstName} ${lastName}`} <br />
//                     {intervieweeEmail}
//                   </p>
//                   <ClickableIcon style={{ fontSize: "2.5em" }} icon={faEdit} onClick={rename} />
//                 </div>
//               </HeaderWrapper>
//               <GridContainer columns={stateDates.length}>
//                 {stateDates.map((item, index) => {
//                   return (
//                     <FlexContainer>
//                       <StyledDays>{item.day}</StyledDays>
//                       <StyledDates>{item.date}</StyledDates>
//                       {item.timeData.map((subitem, i) => {
//                         return (
//                           <div>
//                             <StyledBox
//                               onClick={() => {
//                                 registerInterviewee(index, i);
//                               }}
//                             >
//                               <CalendarButton2
//                                 time={subitem.time}
//                                 interviewer={subitem.interviewer}
//                                 interviewee={subitem.registered}
//                               />
//                             </StyledBox>
//                           </div>
//                         );
//                       })}
//                     </FlexContainer>
//                   );
//                 })}
//               </GridContainer>
//               <Submit style={{ marginTop: "1vh", marginLeft: "66vw" }} onClick={submit}>
//                 Submit
//               </Submit>
//             </>
//           )}
//         </Container>
//       )}
//       {!interviewee && (
//         <FullScreenModal open={true}>
//           <h4>Interviewee Information</h4>
//           <Form>
//             <InputField
//               label="First Name"
//               value={firstName}
//               onChange={(e) => {
//                 setFirstName(e.target.value);
//               }}
//               placeholder="First name"
//             />{" "}
//             <InputField
//               label="Last Name"
//               value={lastName}
//               onChange={(e) => {
//                 setLastName(e.target.value);
//               }}
//               placeholder="Last name"
//             />
//             <InputField
//               label="Email"
//               value={intervieweeEmail}
//               onChange={(e) => setIntervieweeEmail(e.target.value)}
//               type="email"
//               placeholder="Email"
//             />
//             <p style={{ display: "flex", justifyContent: "flex-end" }}>
//               <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
//             </p>
//           </Form>
//         </FullScreenModal>
//       )}
//     </>
//   );
// }

// export default CalendarGrid;