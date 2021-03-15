import React, { useState, useEffect } from "react";
import CalendarButton2 from "./CalendarButton2.js";
import Calendar from "react-calendar";
import * as GrIcons from "react-icons/gr";
import { ContactMailOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faEdit,
  faCheckSquare,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import OverviewCalendar from "./OverviewCalendar";

//Styled Components
const Container = styled.div`
  user-select: none;
  width: 73vw;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  display: flex;
  height: 10vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const StyledWeek = styled.h3`
  margin-left: 5vw;
  font: open-sans;
  font-size: 1.5rem;
  display: flex;
  text-align: center;
  vertical-align: center;
  align-items: center;
`;

const ClickableIcon = styled(FontAwesomeIcon)`
  font-size: 1.8em;
  color: black;
  width: 100%;
  height: 100%;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: all 250ms;
  :hover {
    background: #f3f3f3;
    color: #3f51b5;
  }
`;

const NonClickableIcon = styled(FontAwesomeIcon)`
  font-size: 5em;
  color: #3f51b5;
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 50%;
  transition: all 250ms;
`;

const StyledYear = styled.h3`
  font-weight: 0.8em;
  text-align: center;
  vertical-align: center;
  font-size: 1.5rem;
  margin: 0;
  font: sans-serif;
`;

const GridContainer = styled.div`
  margin-top: 1vh;
  margin-left: 5%;
  max-width: 70vw;
  max-height: auto;
  gap: 0;
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, calc(100% / 7));
  grid-template-rows: 20px, 15px;
  grid-auto-rows: 1fr;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledDates = styled.div`
  font-size: 2em;
  font: open-sans;
  font-weight: 500;
  color: #4f4f4f;
  text-align: center;
  vertical-align: center;
  align-items: center;
  justify-contents: center;
  margin: 0 0 -1px -1px;
  border-left: solid 1px #e0e0e0;
  border-right: solid 1px #e0e0e0;
  border-bottom: solid 1px #e0e0e0;
`;

const StyledDays = styled.div`
  color: #4f4f4f;
  font-size: 1em;
  font: sans-serif;
  text-align: center;
  vertical-align: center;
  align-items: center;
  justify-contents: center;
`;

const StyledBox = styled.div`
  user-select: none;
  text-align: center;
  vertical-align: center;
  font-size: 1em;
  width: 100%;
  height: 70%;
`;

const FormWrapper = styled.div`
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translateX(-200px) translateY(-100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 400px;
  height: 200px;
  padding: 20px;
  border: solid 1px grey;
  border-radius: 20px;
  box-shadow: 5px 5px 4px #e0e0e0;
`;

const Form = styled.form`
  width: 95%;
`;

const NameInput = styled.input`
  width: 36%;
  border: solid 1px grey;
  border-radius: 0.3em;
  overflow: hidden;
  &:focus {
    outline: none;
    border: 1px solid blue;
`;

const EmailInput = styled.input`
  width: 80%;
  border: solid 1px grey;
  border-radius: 0.3em;
  overflow: hidden;
  &:focus {
    outline: none;
    border: 1px solid blue;
`;

const Submit = styled.button`
  user-select: none;
  width: 7vw;
  background: #3f51b5;
  color: white;
  //font-family: open-sans;
  padding: 0.5% 0.5%;
  font-weight: 600;
  border: none;
  text-decoration: none;
  border-radius: 0.3em;
  transition: opacity 250ms;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    transform: translateY(3%);
  }
`;

const Confirmation = styled.div`
  position: absolute;
  right: 50vw;
  top: 50vh;
  transform: translateY(-50%) translateX(-50%);
  width: 20vw;
  height: 20vh;
  border-radius: 20px;
  border: solid 1px grey;
`;

function IntervieweeCalendar(props) {
  //const interviewee = props.interviewee;
  //const intervieweeEmail = props.email;
  const numberOfWeeks = props.weeks;

  var displayArray = props.data;

  useEffect(() => {
    setStateDates(displayArray.slice(0, 7));
    setStateWeeks(0);
  }, [displayArray]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setInterviewee(firstName);
  };

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [interviewee, setInterviewee] = useState(null);
  const [intervieweeEmail, setIntervieweeEmail] = useState(null);
  const [stateWeeks, setStateWeeks] = useState(0);
  const [stateDates, setStateDates] = useState(displayArray.slice(0, 7));
  const [submitted, setSubmitted] = useState();
  const [date, setDate] = useState();
  const [showOverview, setShowOverview] = useState();

  const registerInterviewee = (index, i) => {
    if (displayArray[index + 7 * stateWeeks].timeData[i].interviewer) {
      if (
        displayArray[index + 7 * stateWeeks].timeData[i].registered ==
        interviewee
      ) {
        displayArray[index + 7 * stateWeeks].timeData[i].registered = null;
      } else if (
        displayArray[index + 7 * stateWeeks].timeData[i].registered == null
      ) {
        for (let j = 0; j < displayArray.length; j++) {
          for (let k = 0; k < displayArray[index].timeData.length; k++) {
            if (displayArray[j].timeData[k].registered == interviewee) {
              displayArray[j].timeData[k].registered = null;
            }
          }
        }
        displayArray[index + 7 * stateWeeks].timeData[
          i
        ].registered = interviewee;
      }
      let start = stateWeeks * 7;
      let end = start + 7;
      console.log(`start:${start} , end:${end}`);
      setStateDates(displayArray.slice(start, end));
    }
  };

  const submit = () => {
    let name = firstName + "\xa0" + lastName;
    setInterviewee(name);
    console.log(name);
    console.log(interviewee);
    setSubmitted(true);
    for (let j = 0; j < displayArray.length; j++) {
      for (let k = 0; k < displayArray[j].timeData.length; k++) {
        if (displayArray[j].timeData[k].registered == interviewee) {
          displayArray[j].timeData[k].registered = true;
          displayArray[j].timeData[k].interviewee = interviewee;
          displayArray[j].timeData[k].intervieweeEmail = intervieweeEmail;
          //displayArray[j].timeData[k].interviewee.email = intervieweeEmail;
          let temp = `${displayArray[j].month} ${displayArray[j].date} ${displayArray[j].day} at ${displayArray[j].timeData[k].time}`;
          setDate(temp);
          break;
        }
        console.log(displayArray);
      }
    }
  };

  const rename = () => {
    for (let j = 0; j < displayArray.length; j++) {
      for (let k = 0; k < displayArray[0].timeData.length; k++) {
        if (displayArray[j].timeData[k].registered == interviewee) {
          displayArray[j].timeData[k].registered = null;
        }
      }
    }
    setInterviewee(null);
  };

  const increaseWeek = () => {
    setStateWeeks((stateWeeks + 1) % numberOfWeeks);
    setStateDates(
      displayArray.slice(
        7 * ((stateWeeks + 1) % numberOfWeeks),
        7 * ((stateWeeks + 1) % numberOfWeeks) + 7
      )
    );
  };
  const decreaseWeek = () => {
    setStateWeeks((stateWeeks + numberOfWeeks - 1) % numberOfWeeks);
    setStateDates(
      displayArray.slice(
        7 * ((stateWeeks + numberOfWeeks - 1) % numberOfWeeks),
        7 * ((stateWeeks + numberOfWeeks - 1) % numberOfWeeks) + 7
      )
    );
  };

  if (interviewee) {
    return (
      <Container>
        {showOverview && (
          <OverviewCalendar
            interviewee={interviewee}
            data={displayArray}
            weeks={numberOfWeeks}
          />
        )}
        {submitted ? (
          <FormWrapper>
            <div style={{ display: "flex" }}>
              <NonClickableIcon size={"1.8em"} icon={faCheckCircle} />
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>Your interview has been scheduled!</div>
                <div>{date}</div>
              </div>
            </div>
            <Submit
              onClick={() => {
                setShowOverview(true);
                setSubmitted();
              }}
            >
              Show Overview
            </Submit>
          </FormWrapper>
        ) : (
          <>
            <HeaderWrapper>
              <StyledWeek>
                <ClickableIcon
                  size="1"
                  onClick={decreaseWeek}
                  icon={faArrowLeft}
                />
                <ClickableIcon onClick={increaseWeek} icon={faArrowRight} />
                <span style={{ margin: "0 15px" }}>
                  Week {(stateWeeks % numberOfWeeks) + 1}
                </span>
                <StyledYear>
                  {"  "} {stateDates[0].year} {stateDates[0].month}
                </StyledYear>
              </StyledWeek>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ textAlign: "right" }}>
                  {`${firstName} ${lastName}`} <br />
                  {intervieweeEmail}
                </p>
                <ClickableIcon
                  style={{ fontSize: "2.5em" }}
                  icon={faEdit}
                  onClick={rename}
                />
              </div>
            </HeaderWrapper>
            <GridContainer columns={stateDates.length}>
              {stateDates.map((item, index) => {
                return (
                  <FlexContainer>
                    <StyledDays>{item.day}</StyledDays>
                    <StyledDates>{item.date}</StyledDates>
                    {item.timeData.map((subitem, i) => {
                      return (
                        <div>
                          <StyledBox
                            onClick={() => {
                              registerInterviewee(index, i);
                            }}
                          >
                            <CalendarButton2
                              time={subitem.time}
                              interviewer={subitem.interviewer}
                              interviewee={subitem.registered}
                            />
                          </StyledBox>
                        </div>
                      );
                    })}
                  </FlexContainer>
                );
              })}
            </GridContainer>
            <Submit
              style={{ marginTop: "1vh", marginLeft: "66vw" }}
              onClick={submit}
            >
              Submit
            </Submit>
          </>
        )}
      </Container>
    );
  } else {
    return (
      <FormWrapper>
        <div>
          <p
            style={{
              fontFamily: "open-sans",
              width: "100%",
              fontSize: "1.3em",
              color: "#5845cb",
              fontWeight: "700",
              textAlign: "center",
              marginTop: "5%",
              marginBottom: "5%",
            }}
          >
            Interviewee Information
          </p>
          <Form>
            <p
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Name
              <NameInput
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder="first"
              />{" "}
              <NameInput
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder="last"
              />
            </p>
            <p
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Email
              <EmailInput
                value={intervieweeEmail}
                onChange={(e) => setIntervieweeEmail(e.target.value)}
                type="email"
              />
            </p>
            <p style={{ display: "flex", justifyContent: "flex-end" }}>
              <Submit onClick={handleSubmit}>Submit</Submit>
            </p>
          </Form>
        </div>
      </FormWrapper>
    );
  }
}

export default IntervieweeCalendar;
