import {
  Divider,
  ErrorBanner,
  MainContent,
  OuterContainer,
  PrimaryButton,
  SecondaryButton,
  TextButton,
  UnstyledLink,
} from "../SharedComponents";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { addUserToTeam, createTeam, getAllTeams } from "../../utils/api";
import { FullScreenModal } from "../Modals";
import { InputField } from "../SharedComponents";
import styled from "styled-components";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const Card = styled.div`
  background: #f6f6f6;
  position: relative;
  padding: 20px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 250ms;
  :hover {
    background: #5845cb10;
    color: #5845cb;
    transform: scale(1.02);
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

const TeamDashboard = ({ user }) => {
  const [joinModal, setJoinModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [teamCode, setTeamCode] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [newTeamName, setNewTeamName] = useState();
  const [teams, setTeams] = useState();
  const [teamJoined, setTeamJoined] = useState(false);

  useEffect(() => {
    getAllTeams().then((res) => {
      setTeams(res.data);
    });
  }, [teamJoined]);

  const handleJoinTeam = (e) => {
    e.preventDefault();
    setErrorMessage(undefined);
    if (teamCode === undefined || !teamCode) {
      setErrorMessage("Field is empty!");
      return;
    }
    getAllTeams({ teamCode: teamCode }).then((res) => {
      if (res.data.length === 1) {
        // TODO - Check for duplicate user id
        addUserToTeam(teamCode, user._id).then((res) => {
          setJoinModal(false);
          setTeamJoined(true);
        });
      } else {
        setErrorMessage("This team code is invalid.");
      }
    });
  };

  const handleCreateTeam = (e) => {
    e.preventDefault();
    createTeam({ teamName: newTeamName, users: [user._id] }).then(setCreateModal(false));
  };

  return (
    <OuterContainer>
      <MainContent>
        <h2>Your Teams</h2>
        <p>This currently displays all teams regardless of user.</p>
        <div className="d-flex">
          <PrimaryButton icon={faPlus} className="mr-3" onClick={() => setCreateModal(true)}>
            New Team
          </PrimaryButton>
          <SecondaryButton onClick={() => setJoinModal(true)}>Join Team</SecondaryButton>
        </div>
        <CardGrid className="mt-4">
          {teams &&
            teams.map((team) => {
              return (
                <UnstyledLink to={`/team/${team._id}`}>
                  <Card>
                    <h5>{team.teamName}</h5>
                    <p>Team code: {team.teamCode}</p>
                    <p>
                      {team.users.length} Member{team.users.length > 1 && "s"}
                    </p>
                  </Card>
                </UnstyledLink>
              );
            })}
        </CardGrid>

        <FullScreenModal open={joinModal} onClose={() => setJoinModal(false)}>
          <h4>Join Team</h4>
          <p>Enter the 8 digit team code.</p>
          <Divider className="my-4" />
          <form onSubmit={handleJoinTeam}>
            <InputField
              label="Team Code"
              placeholder="8 character team code"
              onChange={(e) => setTeamCode(e.target.value)}
            />
            {errorMessage && <ErrorBanner className="mb-3">{errorMessage}</ErrorBanner>}
            <div className="d-flex">
              <PrimaryButton>Join</PrimaryButton>
              <TextButton onClick={() => setJoinModal(false)}>Cancel</TextButton>
            </div>
          </form>
        </FullScreenModal>
        <FullScreenModal open={createModal} onClose={() => setCreateModal(false)}>
          <h4>Create New Team</h4>
          <p>Create a new team and invite members to create schedules together.</p>
          <form onSubmit={handleCreateTeam}>
            <InputField label="Team Name" onChange={(e) => setNewTeamName(e.target.value)} />
            <div className="d-flex">
              <PrimaryButton type="submit">Create</PrimaryButton>
              <TextButton onClick={() => setCreateModal(false)}>Cancel</TextButton>
            </div>
          </form>
        </FullScreenModal>
        <FullScreenModal>
          <h4>{}</h4>
        </FullScreenModal>
      </MainContent>
    </OuterContainer>
  );
};

export default TeamDashboard;
