import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { OuterContainer, MainContent, theme, DisclaimerText, TextButton } from "./SharedComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const CardWrapper = styled.div`
  display: grid;
  grid-column: 1;
  gap: 1vh;
  // flex-direction: column;
`;

const DateCard = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  border: 1px solid ${theme.color.lightGray};
  // border-left: 5px solid ${theme.color.primary};
  justify-content: flex-start;
  align-items: center;
`;

const Banner = styled.div`
  background: #6f52ed20;
  padding: 20px;
  border-radius: 5px;
  background-color: #e5e5f740;
  background-image: radial-gradient(#6f52ed40 1px, #6f52ed05 1px);
  background-size: 20px 20px;
`;

const Panel = styled.div`
  overflow-y: scroll;
  border-left: 1px solid ${theme.color.lightGray};
  padding: 20px;
  height: 100%;
  width: 15vw;
`;

const Dashboard = () => {
  
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
  const user = JSON.parse(localStorage.getItem("userObj"));
  const [upcomingEvents, setUpcomingEvents] = useState(user.interviewIDs);
  const [pastEvents, setPastEvents] = useState(user.interviewIDs);

  const [showPastEvents, setShowPastEvents] = useState(false);
  useEffect(() => {
    const currTime = new Date().getTime();
    const upcoming = new Array();
    const past = new Array();
    user.interviewIDs.forEach(slot => {
      const date = new Date(slot.date);
      console.log(date.getHours()+":"+date.getMinutes(), date.getTime(), new Date().getHours()+":"+new Date().getMinutes(), new Date().getTime());
      if (date.getTime() >= currTime) {
        upcoming.push(slot);
      } else {
        past.push(slot);
      }
    })
    setUpcomingEvents(upcoming);
    setPastEvents(past.reverse());
  }, []);

  return (
    <OuterContainer>
      <MainContent className="d-flex justify-content-between">
        <Banner>
          <h3>Welcome to your swamp, {user.firstName}.</h3>
          <p>What will you be doing in your swamp today?</p>
        </Banner>
        {/* <img src='https://upload.wikimedia.org/wikipedia/en/4/4d/Shrek_%28character%29.png' /> */}
        <Panel>
          {upcomingEvents.length > 0 && (
            <>
              <h5>{upcomingEvents && upcomingEvents.length} Upcoming Events</h5>
              <CardWrapper>
                {upcomingEvents.map((event) => {
                  const date = new Date(event.date);
                  return (
                    <DateCard>
                      <div
                        style={{
                          background: theme.color.primary,
                          width: "3%",
                          height: "100%",
                          borderTopLeftRadius: "5px",
                          borderBottomLeftRadius: "5px",
                        }}
                      >
                        &nbsp;
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", marginLeft: "2%" }}>
                        <div style={{ color: theme.color.primary, fontWeight: "500" }}>{event.calendarName}</div>
                        <div>
                          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" color={theme.color.mediumGray} />
                          {dayNames[date.getDay()]} {monthNames[date.getMonth()]} {date.getDate()}{" "}
                          {date.getYear() + 1900}
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faClock} className="mr-2" color={theme.color.mediumGray} />
                          {date.toLocaleString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: false,
                          })}
                          {/* -
                          {new Date(date.getTime() + 30 * 60 * 1000).toLocaleString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: false,
                          })} */}
                        </div>
                      </div>
                    </DateCard>
                    // <div className="d-flex align-items-center mb-2">
                    // </div>
                  );
                })}
              </CardWrapper>
            </>
          )}
          { !showPastEvents && (
            <TextButton onClick={() => {setShowPastEvents(true)}}>
              <div style={{ width: "3%", height: "100%", border: "5px" }}> &nbsp; </div>
                Show Past Events
              <div style={{ width: "3%", height: "100%", border: "5px" }}> &nbsp; </div>
            </TextButton>
          )}
          { showPastEvents && pastEvents.length > 0 && (
            <>
              <TextButton onClick={() => {setShowPastEvents(false)}}>
                <div style={{ width: "3%", height: "100%", border: "5px" }}> &nbsp; </div>
                  Hide Past Events
                <div style={{ width: "3%", height: "100%", border: "5px" }}> &nbsp; </div>
              </TextButton>
              <h5>{pastEvents && pastEvents.length} Past Events</h5>
              <CardWrapper>
                {pastEvents.map((event) => {
                  const date = new Date(event.date);
                  return (
                    <DateCard>
                      <div
                        style={{
                          background: theme.color.primary,
                          width: "3%",
                          height: "100%",
                          borderTopLeftRadius: "5px",
                          borderBottomLeftRadius: "5px",
                        }}
                      >
                        &nbsp;
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", marginLeft: "2%" }}>
                        <div style={{ color: theme.color.primary, fontWeight: "500" }}>{event.calendarName}</div>
                        <div>
                          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" color={theme.color.mediumGray} />
                          {dayNames[date.getDay()]} {monthNames[date.getMonth()]} {date.getDate()}{" "}
                          {date.getYear() + 1900}
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faClock} className="mr-2" color={theme.color.mediumGray} />
                          {date.toLocaleString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: false,
                          })}
                        </div>
                      </div>
                    </DateCard>
                  );
                })}
              </CardWrapper>
            </>
          )}
          {upcomingEvents.length === 0 && <DisclaimerText>You do not have any upcoming events</DisclaimerText>}
        </Panel>
      </MainContent>
    </OuterContainer>
  );
};

export default Dashboard;
