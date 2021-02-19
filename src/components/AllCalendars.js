import React, { useState, useEffect } from "react";
import { MainContent, OuterContainer } from "./SharedComponents";
import { getAllCalendars, deleteCalendarByID } from "../utils/api";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

const Card = styled.div`
  background: #f6f6f6;
  padding: 10px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 250ms;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

const AllCalendars = () => {
  const [calendars, setCalendars] = useState();

  const handleDeleteCard = (id) => {
    deleteCalendarByID(id).then(() =>
      getAllCalendars().then((res) => setCalendars(res.data))
    );
  };

  const handleEdit = (id) => {
    console.log("yes");
  };

  useEffect(() => {
    getAllCalendars().then((res) => setCalendars(res.data));
  }, []);
  return (
    <OuterContainer>
      <MainContent>
        <h1>My Calendars</h1>
        <CardGrid>
          {calendars &&
            calendars.map((calendar) => {
              return (
                <Card>
                  <span style={{ fontSize: "12px", color: "#AAA" }}>TITLE</span>
                  <p>{calendar.title}</p>
                  <FontAwesomeIcon
                    onClick={() => handleDeleteCard(calendar._id)}
                    icon={faTrash}
                  />
                  <FontAwesomeIcon
                    onClick={() => handleEdit(calendar._id)}
                    icon={faPencilAlt}
                  />
                </Card>
              );
            })}
          {!calendars ||
            (calendars.length === 0 && <p>You do not have any calendars.</p>)}
        </CardGrid>
      </MainContent>
    </OuterContainer>
  );
};

export default AllCalendars;
