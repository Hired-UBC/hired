import React, { useState, useEffect } from "react";
import { MainContent, OuterContainer, theme } from "./SharedComponents";
import { getAllCalendars, deleteCalendarByID } from "../utils/api";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrash,
  faClock,
  faCalendarAlt,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Card = styled.div`
  background: ${theme.color.lightGray};
  position: relative;
  padding: 20px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 250ms;
  :hover {
    background: ${theme.color.primary}10;
    color: ${theme.color.primary};
    transform: scale(1.02);
  }
`;

const ContentPreview = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #7a7f89;
  color: ${(props) => props.color};
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

const IconsContainer = styled.div`
  position: absolute;
  bottom: 0;
  padding: 20px 0;
`;

const IconInfo = styled.div`
  display: flex;
  align-items: center;
`;

const AllCalendars = () => {
  const [calendars, setCalendars] = useState();
  const handleDeleteCard = (id) => {
    deleteCalendarByID(id).then(() => getAllCalendars().then((res) => setCalendars(res.data)));
  };

  const handleEdit = (id) => {
    console.log("yes");
  };


  // this displays all calendars we have on db
  /*
  useEffect(() => {
    getAllCalendars().then((res) => setCalendars(res.data));
  }, []);
  */

  // this displays all calendars that user has access to through what teams they are in
  useEffect(() => {
    getAllCalendars().then((res) => setCalendars(res.data));
  }, []);

  return (
    <OuterContainer>
      <MainContent>
        <h2>My Calendars</h2>
        <p>Currently this displays ALL calendars regardless of user.</p>
        <CardGrid>
          {calendars &&
            calendars.map((calendar) => {
              return (
                <StyledLink to={`/calendar/${calendar._id}`}>
                  <Card>
                    <h5>{calendar.title}</h5>
                    <ContentPreview className='mb-3'>{calendar.description}</ContentPreview>
                    <IconInfo>
                      <FontAwesomeIcon icon={faCalendarAlt} className='mr-2' />
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
                      <FontAwesomeIcon icon={faClock} className='mr-2' />
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
                      <FontAwesomeIcon icon={faStopwatch} className='mr-2' />
                      <span>{calendar.slotDuration} min</span>
                    </IconInfo>

                    {/* <IconsContainer>
                      <FontAwesomeIcon
                        onClick={() => handleDeleteCard(calendar._id)}
                        icon={faTrash}
                      />
                      <FontAwesomeIcon
                        onClick={() => handleEdit(calendar._id)}
                        icon={faPencilAlt}
                      />
                    </IconsContainer> */}
                  </Card>
                </StyledLink>
              );
            })}
          {!calendars || (calendars.length === 0 && <p>You do not have any calendars.</p>)}
        </CardGrid>
      </MainContent>
    </OuterContainer>
  );
};

export default AllCalendars;
