import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./date-picker.css";
import Select from "react-select";
import { Link } from "react-router-dom";

const theme = {
  color: {
    primary: "#5845CB",
  },
};

const Outer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const Main = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-bottom: 3rem;
`;

const InputFieldContainer = styled.input`
  padding: 5px 10px;
  font-family: "Inter", sans-serif;
  min-width: 300px;
  width: 100%;
  border: 1px solid #e7e7e7;
  background: white;
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
  background: white;
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

export const UnstyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  :hover {
    text-decoration: none;
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
  padding: 5px 20px;
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

const TextButtonContainer = styled.button`
  border: none;
  text-decoration: none;
  background: none;
  color: #5845cb;
  font-weight: 600;
  cursor: pointer;
  :hover {
    transform: scale(1.05);
  }
`;

// ---------INFORMATIONAL---------

export const ErrorBanner = styled.div`
  width: 100%;
  padding: 10px;
  background: #e91e6310;
  color: #e91e63;
  border-radius: 5px;
  margin: ${(props) => (props.margin ? props.margin : "0")};
`;

// ---------DECORATIONAL---------
export const Divider = styled.div`
  content: "";
  height: 1px;
  width: 100%;
  background: #c4c4c4;
`;

export const OuterContainer = (props) => {
  return (
    <Outer {...props}>
      <div style={{ width: `${props.offset ? props.offset + "px" : "150px"}` }}></div>
      {props.children}
    </Outer>
  );
};

export const MainContent = (props) => {
  return <Main>{props.children}</Main>;
};

export const InputField = (props) => {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <InputLabel>{props.label}</InputLabel>
      <InputFieldContainer {...props}></InputFieldContainer>
    </div>
  );
};

export const LongInput = (props) => {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <InputLabel>{props.label}</InputLabel>
      <TextAreaContainer maxlength="200" placeholder={props.placeholder} onChange={props.onChange}></TextAreaContainer>
    </div>
  );
};

export const TitleInput = (props) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <TitleInputFieldContainer placeholder={props.placeholder} onChange={props.onChange}></TitleInputFieldContainer>
    </div>
  );
};

export const PrimaryButton = (props) => {
  return (
    <PrimaryContainer {...props}>
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
    <SecondaryContainer {...props}>
      {props.icon && (
        <div style={{ marginRight: "0.5rem" }}>
          <FontAwesomeIcon icon={props.icon} />
        </div>
      )}
      {props.children}
    </SecondaryContainer>
  );
};

export const TextButton = (props) => {
  return <TextButtonContainer {...props}>{props.children}</TextButtonContainer>;
};

export const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate, label }) => {
  return (
    <div>
      <InputLabel>{label}</InputLabel>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "2rem",
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

export const TimeRangePicker = ({ label, startTime, endTime, setStartTime, setEndTime }) => {
  return (
    <div>
      <InputLabel>{label}</InputLabel>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <DatePicker
          selected={startTime}
          onChange={(date) => setStartTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
        <p style={{ margin: "0 20px" }}>to</p>
        <DatePicker
          selected={endTime}
          onChange={(date) => setEndTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
      </div>
    </div>
  );
};

export const StyledSelectDropdown = ({ label, options, onSelect }) => {
  return (
    <div
      style={{
        marginBottom: "2rem",
      }}
    >
      <InputLabel>{label}</InputLabel>
      <div style={{ width: "300px" }}>
        <Select defaultValue={options[1]} onChange={(e) => onSelect(e.value)} options={options} />
      </div>
    </div>
  );
};
