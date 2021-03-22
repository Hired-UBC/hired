import React, { useState, useEffect } from "react";
import { MainContent, OuterContainer } from "../SharedComponents";
import { getCalendarByID } from "../../utils/api";
import styled from "styled-components";
import InterviewerCalendar from "../InterviewerCalendar";
import CalendarData from "../CalendarData";
import InfoPanel from "../Calendar/InfoPanel";

const CalendarContainer = styled.div`
  margin-left: 250px;
`;

const InterviewerView = () => {
  const [calendar, setCalendar] = useState();
  const calendarId = window.location.pathname.split("/").pop();

  useEffect(() => {
    getCalendarByID(calendarId).then((res) => {
      setCalendar(res);
    });
  }, []);

  return (
    <OuterContainer>
      <MainContent>
        {calendar && (
          <div className="d-flex">
            <InfoPanel editable calendar={calendar} />
            <CalendarContainer>
              <InterviewerCalendar scheduleObj={calendar} />
            </CalendarContainer>
          </div>
        )}
      </MainContent>
    </OuterContainer>
  );
};

export default InterviewerView;
