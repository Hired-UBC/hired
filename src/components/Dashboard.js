import React from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { OuterContainer, MainContent } from "./SharedComponents";

const Dashboard = ({ user }) => {
  return (
    <OuterContainer>
      <MainContent>
        <h2>Home</h2>
      </MainContent>
    </OuterContainer>
  );
};

export default Dashboard;
