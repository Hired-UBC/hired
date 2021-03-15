import React, { useEffect, useState } from "react";
import { getTeamByID, getUserByID, getUsersByIDArray } from "../../utils/api";
import { MainContent, OuterContainer } from "../SharedComponents";

const TeamPage = () => {
  const teamId = window.location.pathname.split("/").pop();
  const [teamObj, setTeamObj] = useState();
  const [members, setMembers] = useState();

  useEffect(() => {
    getTeamByID(teamId).then((res) => {
      let userIds = res.data.users;
      getUsersByIDArray(userIds).then((res) => {
        setMembers(res.data);
      });
      setTeamObj(res.data);
    });
  }, []);

  return (
    <OuterContainer>
      <MainContent>
        {teamObj && (
          <>
            <span>TEAM</span>
            <h1>{teamObj.teamName}</h1>
            <h4>Team Calendars</h4>
            {members && <h4>Members ({members && members.length})</h4>}
            {members &&
              members.map((member) => {
                return (
                  <div className="d-flex">
                    <p>{member.email}</p>
                  </div>
                );
              })}
          </>
        )}
      </MainContent>
    </OuterContainer>
  );
};

export default TeamPage;
