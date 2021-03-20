import React, { useEffect, useState } from "react";
import { addUserToTeam, getTeamByID } from "../../utils/api";
import { MainContent, OuterContainer, PrimaryButton, TextButton } from "../SharedComponents";
import styled from "styled-components";
import enveloppeIllustration from "../../assets/illustrations/undraw_enveloppe.svg";
import { useHistory } from "react-router-dom";

const InviteContainer = styled.div`
  padding: 40px;
  border-radius: 5px;
  border: 1px solid #c4c4c4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  text-align: center;
`;

const JoinTeam = () => {
  const teamId = window.location.pathname.split("/").pop();
  const [teamObj, setTeamObj] = useState();
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const history = useHistory();

  useEffect(() => {
    getTeamByID(teamId).then((res) => {
      setTeamObj(res.data);
    });
    let userObj = JSON.parse(localStorage.getItem("userObj"));
    setIsLoggedIn(userObj !== undefined && userObj !== null);
    setUser(userObj);
  }, []);

  const handleJoin = () => {
    addUserToTeam(teamObj.teamCode, user._id).then(() => {
      history.push("/teams");
    });
  };

  return (
    <OuterContainer offset={"0"}>
      {teamObj && (
        <MainContent className="d-flex align-items-center justify-content-center flex-column">
          <InviteContainer>
            <img className="mb-4" width="150px" src={enveloppeIllustration} />
            <h4>You've been invited to {teamObj.teamName} on Planet</h4>

            {isLoggedIn && (
              <>
                <p>
                  Hi {user.firstName} ({user.email}), <b>{teamObj.teamName}</b> has invited you to their team.
                </p>
                <p>Join now to start collaborating!</p>
                <PrimaryButton onClick={handleJoin}>Join Team</PrimaryButton>
              </>
            )}
            {!isLoggedIn && (
              <>
                <p>Sign up or log in to Planet to start scheduling events collaboratively with your team.</p>
                <PrimaryButton>Sign up to join</PrimaryButton>
                <TextButton>Log in</TextButton>
              </>
            )}
          </InviteContainer>
        </MainContent>
      )}
    </OuterContainer>
  );
};

export default JoinTeam;
