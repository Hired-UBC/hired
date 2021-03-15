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
} from "../SharedComponents";
import styled from "styled-components";
import { Modal } from "@material-ui/core";

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
  color: #5845cb;
`;

const PublicView = () => {
  const [calendar, setCalendar] = useState();
  const [modal, setModal] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [missingInfo, setMissingInfo] = useState(false);
  const [invalidUrl, setInvalidUrl] = useState(false);
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

    console.log("updating calendar");
    if (calendar.applicants.find(element => element.email === email) == undefined) {
      const newApplicant = {
        name: fullName,
        email: email,
      }
      console.log("applicant email not in system yet");
      setCalendar(calendar.applicants.push(newApplicant));
      console.log(calendar);
      console.log(calendarId);
      updateCalendarByID(calendarId, calendar)
      .then((res) => {
        setCalendar(res);
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
            <Modal open={modal} onClose={handleClose}>
              <div className="d-flex align-items-center justify-content-center w-100 h-100">
                <ModalContainer>
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
                      {missingInfo && (
                        <ErrorBanner margin="0 0 20px 0">
                          You're missing some information!
                        </ErrorBanner>
                      )}
                      {!validEmail && (
                        <ErrorBanner margin="0 0 20px 0">
                          Not a valid email format!
                        </ErrorBanner>
                      )}
                      <PrimaryButton type="submit">Next</PrimaryButton>
                    </form>
                  </div>
                </ModalContainer>
              </div>
            </Modal>
          </>
        )}
        {invalidUrl && (
          <div>This invite link has expired or doesn't exist.</div>
        )}
      </OuterContainer>
    </>
  );
};

export default PublicView;
