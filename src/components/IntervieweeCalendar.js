import React, { useState, useEffect } from "react";
import CalendarButton2 from "./CalendarButton2.js";
import Calendar from "react-calendar";
import * as GrIcons from "react-icons/gr";
import { ContactMailOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

//Styled Components
const Container = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const GridContainer = styled.div`
  margin-top: 5%;
  margin-left: 5%;
  max-width: 70%;
  max-height: 700px;
  gap: 0;
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, calc(100% / 7));
  grid-template-rows: 20px, 15px;
  grid-auto-rows: 1fr;
`;

const ClickableIcon = styled(FontAwesomeIcon)`
  font-size: 1.3rem;
  cursor: pointer;
  padding: 10px;
  border-radius: 100%;
  transition: all 250ms;
  :hover {
    background: #f3f3f3;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  height: 4em;
  display: flex;
  align-items: center;
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

const StyledWeek = styled.h3`
  font: open-sans;
  backgound-color: blue;
  font-size: 1.5rem;
  display: flex;
  text-align: center;
  vertical-align: center;
  margin-top 5%;
  margin-left 5%;
  display: flex;
  align-items: center;
`;

const StyledYear = styled.h3`
  font-weight: 0.8em;
  text-align: center;
  vertical-align: center;
  font-size: 1.5rem;
  margin: 0;
  font: sans-serif;
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
  background: #3f51b5;
  color: white;
  //font-family: open-sans;
  padding: 1% 3%;
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

function CalendarGrid(props) {
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
    setInterviewee(`${firstName} ${lastName}`);
  };

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [interviewee, setInterviewee] = useState(null);
  const [intervieweeEmail, setIntervieweeEmail] = useState(null);
  const [stateWeeks, setStateWeeks] = useState(0);
  const [stateDates, setStateDates] = useState(displayArray.slice(0, 7));

  console.log("interviewee displayArray:");
  console.log(displayArray);

  const registerInterviewee = (index, i) => {
    if (displayArray[index + 7 * stateWeeks].timeData[i].interviewer) {
      if (displayArray[index + 7 * stateWeeks].timeData[i].interviewee.name) {
        displayArray[index + 7 * stateWeeks].timeData[
          i
        ].interviewee.name = null;
      } else {
        for (let j = 0; j < displayArray.length; j++) {
          for (let k = 0; k < displayArray[index].timeData.length; k++) {
            displayArray[j].timeData[k].interviewee.name = null;
          }
        }
        displayArray[index + 7 * stateWeeks].timeData[
          i
        ].interviewee.name = interviewee;
        displayArray[index + 7 * stateWeeks].timeData[
          i
        ].interviewee.email = intervieweeEmail;
      }
      let start = stateWeeks * 7;
      let end = start + 7;
      console.log(`start:${start} , end:${end}`);
      setStateDates(displayArray.slice(start, end));
    }
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
      <>
        <Container>
          <HeaderWrapper>
            <StyledWeek>
              <ClickableIcon onClick={decreaseWeek} icon={faArrowLeft} />
              <ClickableIcon onClick={increaseWeek} icon={faArrowRight} />
              <span style={{ margin: "0 15px" }}>
                Week {(stateWeeks % numberOfWeeks) + 1}
              </span>
              <StyledYear>
                {"  "} {stateDates[0].year} {stateDates[0].month}
              </StyledYear>
            </StyledWeek>
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
                            interviewee={subitem.interviewee.name}
                          />
                        </StyledBox>
                      </div>
                    );
                  })}
                </FlexContainer>
              );
            })}
          </GridContainer>
        </Container>
      </>
    );
  } else {
    return (
      <FormWrapper>
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
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              placeholder="first"
            />{" "}
            <NameInput
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
              onChange={(e) => setIntervieweeEmail(e.target.value)}
              type="email"
            />
          </p>
          <p style={{ display: "flex", justifyContent: "flex-end" }}>
            <Submit onClick={handleSubmit}>Submit</Submit>
          </p>
        </Form>
      </FormWrapper>
    );
  }
}

CalendarGrid.defaultProps = {
  interviewer: "Han Yu",
  interviewee: "Niko",
  email: "ubchanyu@gmail.com",
};

export default CalendarGrid;
