import React, { useEffect, useState } from "react";
import { deleteCalendarByID, deleteTeamByID, getTeamByID, getUserByID, getUsersByIDArray } from "../../utils/api";
import {
  theme,
  InputField,
  MainContent,
  OuterContainer,
  TextButton,
  PrimaryButton,
  UserIconContainer,
  UnstyledLink,
} from "../SharedComponents";
import { FullScreenModal } from "../Modals";
import slugify from "slugify";
import { useHistory, Link } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const TeamPage = () => {
  const teamId = window.location.pathname.split("/").pop();
  const [teamSlug, setTeamSlug] = useState();
  const [teamObj, setTeamObj] = useState();
  const [calendarsInTeamObj, setCalendarsInTeamObj] = useState();
  const [members, setMembers] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const [teamSlugInput, setTeamSlugInput] = useState();
  const [invalidLink, setInvalidLink] = useState(false);
  const history = useHistory();

  // TODO - use team code instead of mongodb id for invite link

  useEffect(() => {
    getTeamByID(teamId).then((res) => {
      if (res.data === null) {
        setInvalidLink(true);
        return;
      } else {
        let userIds = res.data.users;
        getUsersByIDArray(userIds).then((res) => {
          setMembers(res.data);
        });
        setTeamObj(res.data);
        setCalendarsInTeamObj(res.data.calendars);
        setTeamSlug(slugify(res.data.teamName, { lower: true, remove: /[*+~.()'"!:@]/g }));
      }
    });
  }, []);

  // when you delete team, you need to delete all corresponding calendars created under that team
  const handleDeleteTeam = (e) => {
    e.preventDefault();
    deleteTeamByID(teamId).then((res) => {
      calendarsInTeamObj.forEach(calendarID => {
        deleteCalendarByID(calendarID).then((res) => {
          console.log(res);
        });
      });
      history.push("/teams");
    });
  };

  return (
    <OuterContainer>
      <MainContent>
        {invalidLink && (
          <div>
            <p>This team does not exist.</p>
            <UnstyledLink to={{ pathname: `/teams` }}>
              <PrimaryButton>Return to teams dashboard</PrimaryButton>
            </UnstyledLink>
          </div>
        )}
        {teamObj && (
          <>
            <span>TEAM</span>
            <h1>{teamObj.teamName}</h1>
            <h4>Team Calendars</h4>
            <UnstyledLink to={{ pathname: `/new-schedule/${teamObj._id}` }}>
              <PrimaryButton icon={faPlus}>New</PrimaryButton>
            </UnstyledLink>
            {members && <h4>Members ({members && members.length})</h4>}
            {members &&
              members.map((member) => {
                return (
                  <div className='d-flex align-items-center mb-2'>
                    <UserIconContainer bgColor={"#66bb6a"} size={25} className='mr-2'>
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
          </>
        )}
      </MainContent>
      {teamObj && (
        <>
          <FullScreenModal
            open={deleteModal}
            onClose={() => {
              setDeleteModal(false);
            }}>
            <h4>Are you sure you want to delete this team?</h4>
            <div style={{ pointerEvents: "none" }}>
              <p>This action cannot be undone. The team's data will be permanently deleted.</p>
              <p>
                To delete, type <b style={{ color: theme.color.primary }}>{teamSlug}</b> in the
                field below.
              </p>
            </div>

            <form onSubmit={handleDeleteTeam}>
              <InputField
                placeholder={teamSlug}
                onChange={(e) => {
                  setTeamSlugInput(e.target.value);
                }}
              />
              <div className='d-flex'>
                <PrimaryButton type='submit' disabled={teamSlugInput !== teamSlug}>
                  Delete
                </PrimaryButton>
                <TextButton onClick={() => setDeleteModal(false)}>Cancel</TextButton>
              </div>
            </form>
          </FullScreenModal>
          <FullScreenModal open={inviteModal} onClose={() => setInviteModal(false)}>
            <h3>Invite to {teamObj.teamName}</h3>
            <Link to={{ pathname: `/join-team/${teamObj._id}` }} target='_blank'>
              <TextButton>Invite link</TextButton>
            </Link>
            <p>Team Code: {teamObj.teamCode}</p>
            <div className='d-flex'>
              <PrimaryButton onClick={() => setInviteModal(false)}>Done</PrimaryButton>
            </div>
          </FullScreenModal>
        </>
      )}
    </OuterContainer>
  );
};

export default TeamPage;
