import React from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { OuterContainer, MainContent, theme, DisclaimerText } from "./SharedComponents";

const Banner = styled.div`
  background: #6f52ed20;
  padding: 20px;
  border-radius: 5px;
  background-color: #e5e5f740;
  background-image: radial-gradient(#6f52ed40 1px, #6f52ed05 1px);
  background-size: 20px 20px;
`;

const Panel = styled.div`
  border-left: 1px solid ${theme.color.lightGray};
  padding: 20px;
  height: 100%;
  width: 200px;
`;

const Dashboard = ({ user }) => {
  return (
    <OuterContainer>
      <MainContent className='d-flex justify-content-between'>
        <Banner>
          <h3>Welcome to your swamp, {user.firstName}.</h3>
          <p>What will you be doing in your swamp today?</p>
        </Banner>
        {/* <img src='https://upload.wikimedia.org/wikipedia/en/4/4d/Shrek_%28character%29.png' /> */}
        <Panel>
          <h5>Upcoming Events</h5>
          <DisclaimerText>You do not have any upcoming events</DisclaimerText>
        </Panel>
      </MainContent>
    </OuterContainer>
  );
};

export default Dashboard;
