import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCalendarAlt,
  faStopwatch,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { TextButton } from "../SharedComponents";
import { FullScreenModal } from "../Modals";
import {
  deleteCalendarByID,
  getTeamByID,
  getUsersByIDArray,
  updateTeamByID,
} from "../../utils/api";
import { useHistory } from "react-router-dom";

const InfoPanelContainer = styled.div`
  border-right: 1px solid #c6c6c6;
  padding: 20px;
  width: 250px;
  height: 100vh;
  position: fixed;
`;

const IconInfo = styled.div`
  display: flex;
  align-items: center;
`;

const InfoPanel = ({ calendar, editable }) => {
  const history = useHistory();
  const [assignees, setAssignees] = useState();
  const [teamObj, setTeamObj] = useState();
  const [inviteModal, setInviteModal] = useState(false);

  const handleDelete = () => {
    deleteCalendarByID(calendar._id).then((res) => {
      console.log(res);
      history.push("/my-calendars");
    });
  };

  const handleEdit = () => {
    console.log("edit");
  };

  useEffect(() => {
    getUsersByIDArray(calendar.assignees).then((res) => {
      setAssignees(res.data);
    });
    getTeamByID(calendar.teamID).then((res) => {
      setTeamObj(res.data);
    });
  }, []);

  return (
    <InfoPanelContainer>
      {/* <p>{JSON.stringify(calendar)}</p> */}
      {teamObj && (
        <span style={{ color: "#888", fontSize: "0.8rem", textTransform: "uppercase" }}>
          {teamObj.teamName}
        </span>
      )}
      <h4>{calendar.title}</h4>
      <p>{calendar.description}</p>
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
      <IconInfo>
        <FontAwesomeIcon icon={faUserFriends} className='mr-2' />
        <span>
          {calendar.numAssignees} {calendar.numAssignees === 1 ? "person" : "people"} per slot
        </span>
      </IconInfo>
      {editable && (
        <div className='d-flex flex-column align-items-start'>
          <a target='_blank' href={`/calendar-share/${calendar._id}`}>
            <TextButton style={{ marginTop: "2rem" }}>Preview</TextButton>
          </a>
          <TextButton onClick={handleEdit}>Edit</TextButton>
          <TextButton onClick={handleDelete}>Delete</TextButton>
          <TextButton onClick={() => setInviteModal(true)}>Invite</TextButton>
        </div>
      )}
      <FullScreenModal open={inviteModal}>
        <TextButton onClick={() => setInviteModal(false)}>Close</TextButton>
      </FullScreenModal>
    </InfoPanelContainer>
  );
};

export default InfoPanel;
