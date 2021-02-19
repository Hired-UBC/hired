import React from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { OuterContainer, MainContent } from "./SharedComponents";

const Dashboard = ({ user }) => {
  return (
    <OuterContainer>
      <MainContent>
        <h2>Welcome to My Swamp</h2>
        <img src="https://upload.wikimedia.org/wikipedia/en/4/4d/Shrek_%28character%29.png" />
      </MainContent>
    </OuterContainer>
  );
};

export default Dashboard;
