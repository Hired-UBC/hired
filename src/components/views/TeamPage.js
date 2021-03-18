import React, { useEffect, useState } from "react";
import { deleteTeamByID, getTeamByID, getUserByID, getUsersByIDArray } from "../../utils/api";
import {
  theme,
  InputField,
  MainContent,
  OuterContainer,
  TextButton,
  PrimaryButton,
  UserIconContainer,
} from "../SharedComponents";
import { FullScreenModal } from "../Modals";
import slugify from "slugify";
import { useHistory, Link } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const TeamPage = () => {
  const teamId = window.location.pathname.split("/").pop();
  const [teamSlug, setTeamSlug] = useState();
  const [teamObj, setTeamObj] = useState();
  const [members, setMembers] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const [teamSlugInput, setTeamSlugInput] = useState();
  const history = useHistory();

  // TODO - use team code instead of mongodb id for invite link

  useEffect(() => {
    getTeamByID(teamId).then((res) => {
      let userIds = res.data.users;
      getUsersByIDArray(userIds).then((res) => {
        setMembers(res.data);
      });
      setTeamObj(res.data);
      setTeamSlug(slugify(res.data.teamName, { lower: true, remove: /[*+~.()'"!:@]/g }));
    });
  }, []);

  const handleDeleteTeam = (e) => {
    e.preventDefault();
    deleteTeamByID(teamId).then((res) => {
      history.pushState("/teams");
    });
  };

  return (
    <OuterContainer>
      {teamObj && (
        <>
          <MainContent>
            <span>TEAM</span>
            <h1>{teamObj.teamName}</h1>
            <h4>Team Calendars</h4>
            <Link to={{ pathname: `/new-schedule/${teamObj._id}` }}>
              <PrimaryButton icon={faPlus}>New</PrimaryButton>
            </Link>
            {members && <h4>Members ({members && members.length})</h4>}
            {members &&
              members.map((member) => {
                return (
                  <div className="d-flex align-items-center mb-2">
                    <UserIconContainer bgColor={"#66bb6a"} size={25} className="mr-2">
                      {" "}
                      {member.firstName.slice(0, 1)}
                      {member.lastName.slice(0, 1)}
                    </UserIconContainer>
                    <span>{member.email}</span>
                  </div>
                );
              })}
            <TextButton onClick={() => setInviteModal(true)}>Invite</TextButton>
            <TextButton onClick={() => setDeleteModal(true)}>Delete team</TextButton>
          </MainContent>
          <FullScreenModal
            open={deleteModal}
            onClose={() => {
              setDeleteModal(false);
            }}
          >
            <h4>Are you sure you want to delete this team?</h4>
            <div style={{ pointerEvents: "none" }}>
              <p>This action cannot be undone. The team's data will be permanently deleted.</p>
              <p>
                To delete, type <b style={{ color: theme.color.primary }}>{teamSlug}</b> in the field below.
              </p>
            </div>

            <form onSubmit={handleDeleteTeam}>
              <InputField
                placeholder={teamSlug}
                onChange={(e) => {
                  setTeamSlugInput(e.target.value);
                }}
              />
              <div className="d-flex">
                <PrimaryButton type="submit" disabled={teamSlugInput !== teamSlug}>
                  Delete
                </PrimaryButton>
                <TextButton onClick={() => setDeleteModal(false)}>Cancel</TextButton>
              </div>
            </form>
          </FullScreenModal>
          <FullScreenModal open={inviteModal} onClose={() => setInviteModal(false)}>
            <h3>Invite to {teamObj.teamName}</h3>
            <Link to={{ pathname: `/join-team/${teamObj._id}` }} target="_blank">
              <TextButton>Invite link</TextButton>
            </Link>
            <p>Team Code: {teamObj.teamCode}</p>
            <div className="d-flex">
              <PrimaryButton onClick={() => setInviteModal(false)}>Done</PrimaryButton>
            </div>
          </FullScreenModal>
        </>
      )}
    </OuterContainer>
  );
};

export default TeamPage;
