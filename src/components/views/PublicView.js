import React, { useEffect, useState } from "react";
import { getCalendarByID } from "../../utils/api";
import InfoPanel from "../Calendar/InfoPanel";
import {
  Divider,
  ErrorBanner,
  InputField,
  MainContent,
  OuterContainer,
  PrimaryButton,
  TextButton,
} from "../SharedComponents";
import styled from "styled-components";
import { Modal } from "@material-ui/core";
import InterviewerView from "./InterviewerView";

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
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [missingInfo, setMissingInfo] = useState(false);
  const calendarId = window.location.pathname.split("/").pop();

  useEffect(() => {
    getCalendarByID(calendarId).then((res) => setCalendar(res));
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    if (!fullName || !email) {
      setMissingInfo(true);
      return;
    }
    setMissingInfo(false);
    setModal(false);
  };

  return (
    <>
      {!calendar && <p>Loading...</p>}
      {calendar && (
        <OuterContainer offset={250}>
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
                    <PrimaryButton type="submit">Next</PrimaryButton>
                  </form>
                </div>
              </ModalContainer>
            </div>
          </Modal>
        </OuterContainer>
      )}
    </>
  );
};

export default PublicView;
