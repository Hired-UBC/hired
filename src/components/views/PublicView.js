import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getCalendarByID, updateCalendarByID } from "../../utils/api";
import InfoPanel from "../Calendar/InfoPanel";
import {
  Divider,
  ErrorBanner,
  InputField,
  MainContent,
  OuterContainer,
  PrimaryButton,
  theme,
} from "../SharedComponents";
import styled from "styled-components";
import { Modal } from "@material-ui/core";
import { FullScreenModal } from "../Modals";

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 5px;
  padding: 30px;
  max-width: 400px;
`;

const ColouredText = styled.span`
  color: ${theme.color.primary};
`;

const PublicView = () => {
  const [calendar, setCalendar] = useState();
  const [modal, setModal] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [missingInfo, setMissingInfo] = useState(false);
  const [invalidUrl, setInvalidUrl] = useState(false);
  const [signedUpForInterview, setSignedUpForInterview] = useState(false);
  const history = useHistory();
  const calendarId = window.location.pathname.split("/").pop();

  var emailValidator = require("email-validator");

  useEffect(() => {
    getCalendarByID(calendarId)
      .then((res) => {
        if (res === undefined) {
          setInvalidUrl(true);
        }
        setCalendar(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClose = (event) => {
    event.preventDefault();
    setValidEmail(true);
    setMissingInfo(false);
    if (!fullName || !email) {
      setMissingInfo(true);
      return;
    } else if (!emailValidator.validate(email)) {
      setValidEmail(false);
      return;
    }

    const newApplicant = {
      name: fullName,
      email: email,
      signedUpForInterview: signedUpForInterview,
    }

    // checks db to see if there is an applicant corresponding to email entered into modal
    // if applicants exists, changes applicant to reflect entered fullName
    // else create new applicant and enter into db
    if (calendar.applicants.findIndex(element => element.email === email) != -1) {
      console.log("applicant email already in system - updating applicant name if necessary");
      const loc = calendar.applicants.findIndex(element => element.email === email);
      calendar.applicants[loc].name = fullName;

      updateCalendarByID(calendarId, calendar)
      .then((res) => {
        setCalendar(res);
        const locExistingApplicant = res.applicants[loc];
        console.log(locExistingApplicant.name + " : " + locExistingApplicant.email + " has been updated in calendar in db");
      })
      .catch((err) => console.log(err));
    } 
    
    else {
      console.log("applicant email not in system yet");
      calendar.applicants.push(newApplicant)

      updateCalendarByID(calendarId, calendar)
      .then((res) => {
        setCalendar(res);
        const locNewApplicant = res.applicants[res.applicants.length - 1];
        console.log(locNewApplicant.name + " : " + locNewApplicant.email + " has been added to calendar in db");
      })
      .catch((err) => console.log(err));
    }

    setValidEmail(true);
    setMissingInfo(false);
    setModal(false);
  };

  return (
    <>
      {!calendar && !invalidUrl && <p>Loading...</p>}
      <OuterContainer offset={invalidUrl ? 0 : 250}>
        {calendar && (
          <>
            <InfoPanel calendar={calendar} />
            <MainContent>Calendar info here</MainContent>
            <FullScreenModal open={modal} onClose={handleClose}>
              <div>
                <form onSubmit={handleClose}>
                  <span> You're invited to</span>
                  <h4>
                    <ColouredText>{calendar.title}</ColouredText>
                  </h4>
                  <p>{calendar.description}</p>
                  <Divider className="my-4" />
                  <InputField
                    label="What's your name?"
                    placeholder="Your full name"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <InputField
                    label="What's your email?"
                    placeholder="Your email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {missingInfo && <ErrorBanner margin="0 0 20px 0">You're missing some information!</ErrorBanner>}
                  {!validEmail && <ErrorBanner margin="0 0 20px 0">Not a valid email format!</ErrorBanner>}
                  <PrimaryButton type="submit">Next</PrimaryButton>
                </form>
              </div>
            </FullScreenModal>
          </>
        )}
        {invalidUrl && <div>This invite link has expired or doesn't exist.</div>}
      </OuterContainer>
    </>
  );
};

export default PublicView;
