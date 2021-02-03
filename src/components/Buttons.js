import React from "react";
import styled from "styled-components";

const PrimaryContainer = styled.button`
  background: blue;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px 20px;
  transition: all 250ms;
  :hover {
    opacity: 0.7;
  }
`;

const SecondaryContainer = styled(PrimaryContainer)`
  background: white;
  color: black;
  border: 2px solid blue;
`;

export const PrimaryButton = (props) => {
  return (
    <PrimaryContainer onClick={props.onClick}>
      {props.children}
    </PrimaryContainer>
  );
};

export const SecondaryButton = (props) => {
  return (
    <SecondaryContainer onClick={props.onClick}>
      {props.children}
    </SecondaryContainer>
  );
};
