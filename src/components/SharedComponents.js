import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./date-picker.css";

const theme = {
  color: {
    primary: "#5845CB",
  },
};

const Outer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const Main = styled.div`
  flex: 1;
  padding: 20px;
`;

const InputFieldContainer = styled.input`
  padding: 10px;
  font-family: "Inter", sans-serif;
  width: 300px;
  border: 1px solid #e7e7e7;
  background: #f9f9f9;
  border-radius: 5px;
  transition: all 250ms;
  :focus {
    outline: none;
    border: 1px solid blue;
  }
`;

const TitleInputFieldContainer = styled(InputFieldContainer)`
  border: none;
  font-size: 1.5rem;
  background: white;
  border-radius: 0;
  border-bottom: 1px solid #e7e7e7;
  transition: all 250ms;
  :focus {
    outline: none;
    border: none;
    border-bottom: 1px solid blue;
  }
`;

const InputLabel = styled.p`
  margin: 0;
  margin-bottom: 0.5rem;
`;

const TextAreaContainer = styled.textarea`
  border: 1px solid #e7e7e7;
  font-family: "Inter", sans-serif;
  background: #f9f9f9;
  padding: 10px;
  width: 300px;
  max-width: 300px;
  min-height: 50px;
  max-height: 300px;
  resize: vertical;
  transition: all 250ms;
  :focus {
    border: 1px solid blue;
    outline: none;
  }
`;

// ---------BUTTONS---------
const PrimaryContainer = styled.button`
  background: ${theme.color.primary};
  font-weight: 600;
  display: flex;
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
  border: 2px solid ${theme.color.primary};
`;

export const OuterContainer = (props) => {
  return (
    <Outer>
      <div style={{ width: "150px" }}></div>
      {props.children}
    </Outer>
  );
};

export const MainContent = (props) => {
  return <Main>{props.children}</Main>;
};

export const InputField = ({ label, placeholder }) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <InputLabel>{label}</InputLabel>
      <InputFieldContainer placeholder={placeholder}></InputFieldContainer>
    </div>
  );
};

export const LongInput = ({ label, placeholder }) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <InputLabel>{label}</InputLabel>
      <TextAreaContainer
        maxlength="200"
        placeholder={placeholder}
      ></TextAreaContainer>
    </div>
  );
};

export const TitleInput = ({ label, placeholder }) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <TitleInputFieldContainer
        placeholder={placeholder}
      ></TitleInputFieldContainer>
    </div>
  );
};

export const PrimaryButton = (props) => {
  return (
    <PrimaryContainer onClick={props.onClick}>
      {props.icon && (
        <div style={{ marginRight: "0.5rem" }}>
          <FontAwesomeIcon icon={props.icon} />
        </div>
      )}
      {props.children}
    </PrimaryContainer>
  );
};

export const SecondaryButton = (props) => {
  return (
    <SecondaryContainer onClick={props.onClick}>
      {props.icon && (
        <div style={{ marginRight: "0.5rem" }}>
          <FontAwesomeIcon icon={props.icon} />
        </div>
      )}
      {props.children}
    </SecondaryContainer>
  );
};

export const DateRangePicker = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  label,
}) => {
  return (
    <div>
      <InputLabel>{label}</InputLabel>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <DatePicker
          selectsStart
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          startDate={startDate}
          endDate={endDate}
        />
        <p style={{ margin: "0 20px" }}>to</p>
        <DatePicker
          selectsEnd
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>
    </div>
  );
};
