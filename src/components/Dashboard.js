import React from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { OuterContainer, MainContent } from "./SharedComponents";

const Banner = styled.div`
  background: #6f52ed20;
  padding: 20px;
  width: 100%;
  border-radius: 5px;
  background-color: #e5e5f740;
  background-image: radial-gradient(#6f52ed40 1px, #6f52ed05 1px);
  background-size: 20px 20px;
`;

const Dashboard = ({ user }) => {
  return (
    <OuterContainer>
      <MainContent>
        <Banner>
          <h3>Welcome to your swamp, {user.firstName}.</h3>
          <p>What will you be doing in your swamp today?</p>
        </Banner>
        <img src="https://upload.wikimedia.org/wikipedia/en/4/4d/Shrek_%28character%29.png" />
      </MainContent>
    </OuterContainer>
  );
};

export default Dashboard;
