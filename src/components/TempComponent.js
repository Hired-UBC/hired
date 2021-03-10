import React, { useState, useEffect } from "react";
import { MainContent, OuterContainer } from "./SharedComponents";
import {
  getAllCalendars,
  deleteCalendarByID,
  getCalendarByID,
} from "../utils/api";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faClock,
  faCalendarAlt,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import CalendarData from "./CalendarData";

const Card = styled.div`
  background: #f6f6f6;
  padding: 10px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 250ms;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: inherit;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

const InfoPanel = styled.div`
  border-right: 1px solid #c6c6c6;
  min-width: 250px;
  height: 100vh;
  position: fixed;
`;

const IconInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CalendarContainer = styled.div`
  margin-left: 250px;
`;

const TempComponent = () => {
  const [calendar, setCalendar] = useState();
  const calendarId = window.location.pathname.split("/").pop();

  useEffect(() => {
    axios
      .get(`/api/calendars`)
      .then((res) => console.log("THIS ONE!!!: ", res));
    getCalendarByID(calendarId).then((res) => {
      console.log("CALENDAR BY ID: ", res);
      setCalendar(res);
    });
  }, []);

  const handleDeleteCard = (id) => {
    deleteCalendarByID(id).then(() =>
      getAllCalendars()
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    );
  };

  const handleEdit = (id) => {
    console.log("yes");
  };

  return (
    <OuterContainer>
      <MainContent>
        {calendar && (
          <div className="d-flex">
            <InfoPanel>
              <span style={{ color: "#888", fontSize: "0.8rem" }}>
                TEAM NAME HERE
              </span>
              <h4>{calendar.title}</h4>
              <p>{calendar.description}</p>
              <IconInfo>
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                <span>
                  {new Date(calendar.dateStart).toLocaleString("default", {
                    month: "short",
                  })}
                  {new Date(calendar.dateStart).getDate()} -
                  {new Date(calendar.dateEnd).toLocaleString("default", {
                    month: "short",
                  })}
                  {new Date(calendar.dateEnd).getDate()}{" "}
                </span>
              </IconInfo>
              <IconInfo>
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                <span>
                  {new Date(calendar.timeStart).toLocaleString("en-US", {
                    hour: "numeric",
                    hour12: true,
                  })}
                  -
                  {new Date(calendar.timeEnd).toLocaleString("en-US", {
                    hour: "numeric",
                    hour12: true,
                  })}
                </span>
              </IconInfo>

              <IconInfo>
                <FontAwesomeIcon icon={faStopwatch} className="mr-2" />
                <span>{calendar.slotDuration} min</span>
              </IconInfo>
            </InfoPanel>
            <CalendarContainer>
              <CalendarData scheduleObj={calendar} />
            </CalendarContainer>
          </div>
        )}
      </MainContent>
    </OuterContainer>
  );
};

export default TempComponent;
