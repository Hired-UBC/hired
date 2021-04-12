import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendarAlt, faStopwatch, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { TextButton, PrimaryButton, theme } from "../SharedComponents";
import { deleteCalendarByID, getTeamByID, getUsersByIDArray, updateTeamByID } from "../../utils/api";
import { useHistory, Link } from "react-router-dom";
import { Modal } from "@material-ui/core";
import { FullScreenModal } from "../Modals";

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
  const [id, setId] = useState(window.location.href.split("/").pop());
  const [modal, setModal] = useState(false);

  const handleDelete = () => {
    deleteCalendarByID(calendar._id).then((res) => {
      history.push(`/team/${teamObj._id}`);
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

  console.log(theme.color.mediumGray);

  return (
    <InfoPanelContainer>
      <FullScreenModal open={modal}>
        <div> Do you want to delete the Calendar?</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <PrimaryButton
            onClick={() => {
              handleDelete();
              setModal(false);
            }}
          >
            Delete
          </PrimaryButton>
          <TextButton
            onClick={() => {
              setModal(false);
            }}
          >
            Cancel
          </TextButton>
        </div>
      </FullScreenModal>

      {/* <p>{JSON.stringify(calendar)}</p> */}
      {teamObj && (
        <span style={{ color: "#888", fontSize: "0.8rem", textTransform: "uppercase" }}>{teamObj.teamName}</span>
      )}
      <h5>{calendar.title}</h5>
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
      <IconInfo>
        <FontAwesomeIcon icon={faUserFriends} className="mr-2" />
        <span>
          {calendar.numAssignees} {calendar.numAssignees === 1 ? "person" : "people"} per slot
        </span>
      </IconInfo>
      {editable && (
        <div className="d-flex flex-column align-items-start">
          <a target="_blank" href={`/calendar-share/${calendar._id}`}>
            <TextButton style={{ marginTop: "2rem" }}>Preview</TextButton>
          </a>
          {/* <TextButton onClick={handleEdit}>Edit</TextButton> */}
          <TextButton onClick={() => setModal(true)}>Delete</TextButton>
          <Link to={{ pathname: `/link-invite/${id}` }}>
            <TextButton>Invite</TextButton>
          </Link>
        </div>
      )}
    </InfoPanelContainer>
  );
};

export default InfoPanel;
