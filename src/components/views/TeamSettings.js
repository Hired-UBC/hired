import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getTeamByID, updateTeamByID } from "../../utils/api";
import { InputField, MainContent, OuterContainer, PrimaryButton } from "../SharedComponents";

const TeamSettings = () => {
  const teamId = window.location.pathname.split("/").pop();
  const [teamObj, setTeamObj] = useState();
  const history = useHistory();

  useEffect(() => {
    getTeamByID(teamId).then((res) => {
      setTeamObj(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTeamByID(teamObj._id, teamObj)
      .then((res) => {
        history.push(`/team/${teamObj._id}`);
      })
      .catch((err) => console.log(err));
  };
  return (
    <OuterContainer>
      <MainContent>
        {teamObj && (
          <>
            <h4>{teamObj.teamName} Settings</h4>
            <form style={{ maxWidth: "500px" }} onSubmit={handleSubmit}>
              <InputField
                defaultValue={teamObj.teamName}
                label={"Team Name"}
                onChange={(e) => {
                  setTeamObj({ ...teamObj, teamName: e.target.value });
                }}
              />
              <InputField
                defaultValue={teamObj?.settings?.iconUrl}
                label={"Team Display Picture URL"}
                onChange={(e) => {
                  setTeamObj({ ...teamObj, settings: { iconUrl: e.target.value } });
                }}
              />
              <PrimaryButton type='submit'>Save</PrimaryButton>
            </form>
          </>
        )}
      </MainContent>
    </OuterContainer>
  );
};

export default TeamSettings;
