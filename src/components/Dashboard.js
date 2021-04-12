import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { OuterContainer, MainContent, theme, DisclaimerText, TextButton } from "./SharedComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import TeamDashboard from "./views/TeamDashboard";

const CardWrapper = styled.div`
  display: grid;
  grid-column: 1;
  gap: 1vh;
`;

const DateCard = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  border: 1px solid ${theme.color.lightGray};
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
  width: 25vw;
`;

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

const EventCard = ({ event }) => {
  console.log("mY EVENT", event);
  const date = new Date(event.date);
  return (
    <DateCard>
      <div
        style={{
          background: theme.color.primary,
          width: "8px",
          height: "100%",
          borderTopLeftRadius: "5px",
          borderBottomLeftRadius: "5px",
        }}>
        &nbsp;
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginLeft: "8px", padding: "5px" }}>
        <div style={{ color: theme.color.primary, fontWeight: "500" }}>{event.calendarName}</div>
        <div>
          <FontAwesomeIcon icon={faCalendarAlt} className='mr-2' color={theme.color.mediumGray} />
          {dayNames[date.getDay()]} {monthNames[date.getMonth()]} {date.getDate()} {date.getYear() + 1900}
        </div>
        <div>
          <FontAwesomeIcon icon={faClock} className='mr-2' color={theme.color.mediumGray} />
          {date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          })}
        </div>
      </div>
    </DateCard>
  );
};

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("userObj"));
  const [upcomingEvents, setUpcomingEvents] = useState(user.interviewIDs);
  const [pastEvents, setPastEvents] = useState(user.interviewIDs);

  const [showPastEvents, setShowPastEvents] = useState(true);
  useEffect(() => {
    const currTime = new Date().getTime();
    const upcoming = new Array();
    const past = new Array();
    user.interviewIDs.forEach((slot) => {
      const date = new Date(slot.date);
      console.log(
        date.getHours() + ":" + date.getMinutes(),
        date.getTime(),
        new Date().getHours() + ":" + new Date().getMinutes(),
        new Date().getTime()
      );
      if (date.getTime() >= currTime) {
        upcoming.push(slot);
      } else {
        past.push(slot);
      }
    });
    setUpcomingEvents(upcoming);
    setPastEvents(past.reverse());
  }, []);

  return (
    <OuterContainer>
      <div className='d-flex justify-content-between w-100'>
        <MainContent className='w-100 flex-grow'>
          <Banner>
            <h3>Welcome to your Planet, {user.firstName}.</h3>
            <p>What will you be planning today?</p>
          </Banner>
          <TeamDashboard user={user} />
        </MainContent>

        <Panel>
          <div className='mb-4'>
            <h5>{upcomingEvents && upcomingEvents.length} Upcoming Event(s)</h5>
            {upcomingEvents.length === 0 && <DisclaimerText>You do not have any upcoming events</DisclaimerText>}
            {upcomingEvents.length > 0 && (
              <CardWrapper>
                {upcomingEvents.map((event) => {
                  return <EventCard event={event} />;
                })}
              </CardWrapper>
            )}
          </div>
          <div className='w-100 d-flex align-items-start justify-content-between'>
            <h5>{pastEvents.length} Past Event(s)</h5>
            <TextButton onClick={() => setShowPastEvents(!showPastEvents)}>
              {showPastEvents ? "Hide" : "Show"}
            </TextButton>
          </div>
          {showPastEvents && pastEvents.length === 0 && (
            <DisclaimerText>You do not have any past events</DisclaimerText>
          )}
          {showPastEvents && pastEvents.length > 0 && (
            <CardWrapper>
              {pastEvents.map((event) => {
                return <EventCard event={event} />;
              })}
            </CardWrapper>
          )}
        </Panel>
      </div>
    </OuterContainer>
  );
};

export default Dashboard;
