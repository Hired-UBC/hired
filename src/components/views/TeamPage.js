import React, { useEffect, useState } from "react";
import {
  deleteCalendarByID,
  deleteTeamByID,
  getTeamByID,
  getUserByID,
  getUsersByIDArray,
  getCalendarsByIDArray,
} from "../../utils/api";
import {
  theme,
  InputField,
  MainContent,
  OuterContainer,
  TextButton,
  PrimaryButton,
  UserIconContainer,
  UnstyledLink,
  Panel,
  Divider,
} from "../SharedComponents";
import { FullScreenModal } from "../Modals";
import slugify from "slugify";
import { useHistory, Link } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CalendarCards from "../CalendarCards";
import styled from "styled-components";

const TeamIcon = styled.div`
  font-size: ${(props) => props.size * 0.5}px;
  cursor: pointer;
  display: flex;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid ${theme.color.lightGray};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  background: ${(props) => props.bgColor};
  color: ${(props) => (props.imgUrl ? "#ffffff00" : "white")};
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-position: center;
  transition: all 250ms;
  &:hover {
    opacity: 0.8;
  }
`;

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
      if (res.data === null || res.data === undefined) {
        setInvalidLink(true);
        return;
      } else {
        let userIds = res.data.users;
        getUsersByIDArray(userIds).then((res) => {
          setMembers(res.data);
        });
        setTeamObj(res.data);
        setTeamSlug(slugify(res.data.teamName, { lower: true, remove: /[*+~.()'"!:@]/g }));
        getCalendarsByIDArray(res.data.calendars).then((res) => {
          setCalendarsInTeamObj(res.data);
        });
      }
    });
  }, []);

  // when you delete team, you need to delete all corresponding calendars created under that team
  const handleDeleteTeam = (e) => {
    e.preventDefault();
    deleteTeamByID(teamId).then((res) => {
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
            <div className='d-flex'>
              <TeamIcon
                className='mr-2'
                size={40}
                imgUrl={teamObj?.settings?.iconUrl}
                bgColor={theme.color.primary}>
                {teamObj.teamName.slice(0, 2)}
              </TeamIcon>
              <h2>{teamObj.teamName}</h2>
            </div>
            <Divider className='my-3' />
            <h4>Team Calendars</h4>
            <div style={{ display: "inline-block" }}>
              <UnstyledLink to={{ pathname: `/new-schedule/${teamObj._id}` }}>
                <PrimaryButton icon={faPlus}>New</PrimaryButton>
              </UnstyledLink>
            </div>

            {calendarsInTeamObj && <CalendarCards calendars={calendarsInTeamObj} />}
          </>
        )}
      </MainContent>
      <Panel>
        {members && (
          <>
            <h5>{members && members.length} Members</h5>
            {members.map((member) => {
              return (
                <div className='d-flex align-items-center mb-2'>
                  <UserIconContainer
                    bgColor={`${member?.settings?.bgColor ? member?.settings?.bgColor : "#66bb6a"}`}
                    imgUrl={member?.settings?.iconUrl}
                    size={25}
                    className='mr-2'>
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
            <UnstyledLink to={`/team-settings/${teamObj._id}`}>
              <TextButton>Settings</TextButton>
            </UnstyledLink>
          </>
        )}
      </Panel>
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
