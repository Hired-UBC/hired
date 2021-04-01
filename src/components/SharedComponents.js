import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./date-picker.css";
import Select from "react-select";
import { Link } from "react-router-dom";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export const theme = {
  color: {
    primary: "#6F52ED",
    secondaryRed: "#FF6E6E",
    secondaryYellow: "#FFD54F",
    secondaryGreen: "#2BC8D8",
    secondaryPurple: "#948BFF",
    primaryText: "#51485A",
    mediumGray: "#AEAFBE",
    lightGray: "#EBEDF1",
    disabled: "#B1B1B1",
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
`;

export const Panel = styled.div`
  border-left: 1px solid ${theme.color.lightGray};
  padding: ${(props) => (props.padding ? props.padding : "20px")};
  height: 100%;
  width: ${(props) => props.width && props.width};
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

export const Card = styled.div`
  background: ${theme.color.lightGray};
  position: relative;
  padding: 20px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 250ms;
  :hover {
    background: ${theme.color.primary}10;
    color: ${theme.color.primary};
    transform: scale(1.02);
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

// ---------BUTTONS---------
const PrimaryContainer = styled.button`
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  background: ${(props) => (props.disabled ? theme.color.disabled : theme.color.primary)};
  font-weight: 600;
  display: flex;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 5px 20px;
  transition: all 250ms;
  text-decoration: none;
  &:hover,
  &:focus,
  &:active {
    opacity: 0.7;
    text-decoration: none;
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
  color: ${theme.color.primary};
  font-weight: 600;
  cursor: pointer;
  :hover {
    transform: scale(1.05);
  }
`;

export const IconButtonContainer = styled.button`
  border: none;
  text-decoration: none;
  background: ${(props) => (props.inactive ? theme.color.lightGray : "none")};
  border: 1.5px solid ${theme.color.mediumGray};
  padding: 0 5px;
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "3px")};
  :hover {
    border-color: ${(props) => !props.inactive && theme.color.primary};
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

export const DisclaimerText = styled.span`
  color: ${theme.color.mediumGray};
`;

// ---------DECORATIONAL---------
export const Divider = styled.div`
  content: "";
  height: 1px;
  width: 100%;
  background: ${theme.color.lightGray};
`;

// ---------USER RELATED---------
export const UserIconContainer = styled.div`
  font-size: ${(props) => props.size * 0.5}px;
  cursor: pointer;
  display: flex;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  overflow: hidden;
  border-radius: 50%;
  background: ${(props) => !props.imgUrl && props.bgColor};
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.imgUrl ? "#ffffff00" : "white")};
  font-weight: 600;
  text-transform: uppercase;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-position: center;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1.05);
  }
`;

export const OuterContainer = (props) => {
  return (
    <Outer {...props}>
      <div style={{ width: `${props.offset ? props.offset + "px" : "70px"}` }}></div>
      {props.children}
    </Outer>
  );
};

export const MainContent = (props) => {
  return <Main {...props}>{props.children}</Main>;
};

export const IconButton = ({ icon, ...props }) => {
  return (
    <IconButtonContainer {...props}>
      <FontAwesomeIcon color={theme.color.mediumGray} icon={icon} />
    </IconButtonContainer>
  );
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

export const NumericalInput = ({ updateValue, value, ...props }) => {
  const decrement = (e) => {
    e.preventDefault();
    if (value > 1) {
      updateValue(value - 1);
    }
  };

  const increment = (e) => {
    e.preventDefault();
    if (value < 4) {
      updateValue(value + 1);
    }
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <InputLabel>{props.label}</InputLabel>
      <div className="d-flex">
        <IconButton icon={faMinus} onClick={decrement} />
        <InputFieldContainer value={value} style={{ minWidth: "0", width: "50px" }} />
        <IconButton icon={faPlus} onClick={increment} />
      </div>
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
