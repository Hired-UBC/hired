import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import * as AiIcons from "react-icons/ai";
import { CopyToClipboard } from "react-copy-to-clipboard";
import emailjs from "emailjs-com";
import { InputField, MainContent, OuterContainer, PrimaryButton, TextButton, theme } from "./SharedComponents";
import { getCalendarByID } from "../utils/api";

// 2 columns
const Container = styled.div`
  padding-top: 5%;
  display: flex;
  justify-content: center;
  align-item: start;
`;

const ProjectTitle = styled.div`
  font-family: open-sans, sans-serif;
  font-size: 1.5em;
  font-weight: 400;
  color: ${theme.color.primary};
`;

const Title2 = styled.div`
  padding: 0.3em;
  padding-left: 0;
  font-size: 2em;
  font-weight: 600;
  margin-bottom: 2%;
`;

const FlexWrapper = styled.div`
  width: 70%;
  margin-top: 1%;
  padding: 0.3em 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SubWrapper2 = styled.div`
  padding 0.5em 0em;
  display: flex;
  justify-content: flex-start;
  align-item: center;
  margin-top: 2%;
  margin-bottom: 1%;
`;

const Email = styled.span`
  font-size: 1.2em;
  font-weight: 600;
  margin: 0% 5%;
  color: ${(props) => (props.isEmail ? `${theme.color.primary}` : "#4f4f4f")};
  text-decoration: ${(props) => (props.isEmail ? "underline" : "")};

  &:active {
    transform: translateY(2%);
  }
`;

const DirectLink = styled.span`
  font-size: 1.2em;
  font-weight: 500;
  margin: 0% 5%;
  color: ${(props) => (props.isEmail ? "#4f4f4f" : `${theme.color.primary}`)};
  text-decoration: ${(props) => (props.isEmail ? "" : "underline")};

  &:active {
    transform: translateY(2%);
  }
`;

const InputBox = styled.input`
  overflow: auto;
  padding: 0.5% 1%;
  height: fit-content;
  width: 86%;
  display: flex;
  justify-content: flex-start;
  color: black;
  border: solid 1px #e0e0e0;
  border-radius: 0.3em;
  font-size: 1.1em;
  font-weight: 500;

  &:focus {
    outline: none;
    border: 1px solid blue;
  }
`;

const EmailBox = styled.textarea`
  font-family: open-sans, sans-serif;
  padding: 1em 1em;
  margin-top: 1%;
  width: 100%;
  height: 16em;
  border: solid 1px #e0e0e0;
  border-radius: 0.3em;
  font-size: 1.1em;

  &: focus {
    outline: none;
    border: 1px solid blue;
  }
`;

const LinkBox = styled.span`
  padding: 0.5% 1%;
  height: fit-content;
  width: 86%;
  display: flex;
  justify-content: flex-start;
  color: black;
  border: solid 1px #e0e0e0;
  border-radius: 0.3em;
  font-size: 1.1em;
  font-weight: 500; ;
`;

const IconBox = styled.span`
  display: flex;
  width: 30px;
  height: 30px;
  border-radius: 1em;
  justify-content: center;
  align-items: center;
  transition: background-color 250ms;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const SubWrapper3 = styled.div`
  padding-top: 10px;
  width: 95%;
  display: flex;
  justify-content: flex-end;
  align-item: center;
`;

const ModalText = styled.div`
  font-size: 1.2em;
  font-weight: 600;
  font-family: open-sans sans-serif;
  margin-top: 20px;
`;

const Noti = styled.span`
  font-family: open-sans, sans-serif;
  font-weight: 700;
  font-size: 1.2em;
`;

const Reci = styled.span`
  font-family: open-sans, sans-serif;
  font-weight: 450;
  font-size: 1.1em;
`;

const Modal = styled.div`
  visibility: ${(props) => (props.visibility ? "visible" : "hidden")};
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  width: 400px;
  height: 200px;
  box-shadow: 0.3em 0.3em 0.1em #e0e0e0;
  border: solid 2px #4f4f4f;
  border-radius: 0.5em;
`;

const ModalWrapper = styled.div`
  visibility: ${(props) => (props.isSent && props.modal ? "visible" : "hidden")};
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const Invisible = styled.div`
  visibility: hidden;
  width: 0px;
  height: 0px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const CopiedConfirm = styled.div`
  visibility: ${(props) => (props.visibility ? "visible" : "hidden")};
  font-size: 0.8em;
  font-weight: 500;
  animation: Fadeout 1000ms;
`;

const StyledLink = styled(Link)`
  font-weight: 600;
  padding: 1% 2%;
  font-family: open-sans, sans-serif;
  color: white;
  background-color: ${theme.color.primary};
  justify-content: center;
  align-item: center;
  border-radius: 0.3em;
  box-shadow: 0.1em 0.1em 0em #e0e0e0;
  transition: hover 250ms;
  text-decoration: none;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    transform: translateY(3%);
    background-color: #4835bb;
    opacity: 1;
  }
`;

const Form = styled.form`
  width: 100%;
`;

function ShareLink(props) {
  //functional states
  const [recipients, setRecepients] = useState(props.recipients);
  const [isEmail, setIsEmail] = useState(true);
  const [directLink, setLink] = useState(`letsplanet.app/calendar-share/${window.location.href.split("/").pop()}`);
  const [_id, setId] = useState(window.location.href.split("/").pop());
  const [linkCopied, setLinkCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [recipientsEmail, setRecipientEmail] = useState();
  const [modal, setModal] = useState(false);
  const [recipientNum, setRecipientNum] = useState();
  const [isSent, setIsSent] = useState(false);
  const [title, setTitle] = useState();
  const [userObj, setUserObj] = useState(JSON.parse(localStorage.getItem("userObj")));

  //form states
  const [to, setTo] = useState("");
  const [from, setFrom] = useState(userObj.email);
  const [subject, setSubject] = useState(`Interview Schedule for ${props.projectTitle}`);
  const [content, setContent] = useState(`Hello!

  You have been invited to the interview of ${title}.
  Click the link below to schedule your interview.
  
  Direct Link: ${directLink}`);

  //Email function
  const rearrangeForm = () => {
    let temp = content.replace(/(?:\r\n|\r|\n)/g, "<br>");
    setContent(temp);
  };

  const preventRenew = (e) => {
    e.preventDefault();
    renewRecipientNum();
    showModal();
    rearrangeForm();
  };

  const returnForm = () => {
    let temp = content.replace(/<br\s*[\/]?>/gi, "\n");
    setContent(temp);
  };

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm("service_2dc41mm", "template_6rr2iu6", e.target, "user_XTmaRu8fRxA3TPjZlGSm1").then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
    console.log(content);
  }

  //form functions
  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  const handleFromChange = (event) => {
    setFrom(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleEmailChange = (event) => {
    setContent(event.target.value);
  };

  //Other functions

  const makeEmail = () => {
    setIsEmail(true);
  };

  const makeDirectLink = () => {
    setIsEmail(false);
  };

  const copyLink = () => {
    setLinkCopied(true);
  };

  const copyEmail = () => {
    setEmailCopied(true);
  };

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const renewRecipientNum = () => {
    let temp = to.toString();
    if (temp === "") {
      setRecipientNum(0);
    } else {
      temp = temp.split("," && ` `);
      temp = temp.length;
      console.log(temp);
      setRecipientNum(temp);
    }
  };

  useEffect(() => {
    getCalendarByID(_id).then((res) => {
      console.log(res.title);
      setTitle(res.title);
      setContent(`Hello!

You have been invited to the interview of ${res.title}.
Click the link below to schedule your interview.

Direct Link: <a href=${directLink}>${directLink}</a>`);
      setSubject(`Interview Schedule for ${res.title}`);
    });
  }, []);

  return (
    <>
      <Modal visibility={modal}>
        <Form id="autoSubmitForm" onSubmit={sendEmail}>
          <Invisible>
            <InputBox name="to" value={to} />
            <InputBox name="from" value={from} />
            <InputBox name="subject" value={subject} />
            <EmailBox name="content" value={content} />
          </Invisible> 
          <ModalWrapper isSent={!isSent} modal={modal}>
            <SubWrapper3>
              <IconBox>
                <AiIcons.AiOutlineClose
                  color="#4f4f4f"
                  size="1.5em"
                  onClick={() => {
                    hideModal();
                    returnForm();
                  }}
                />
              </IconBox>
            </SubWrapper3>
            <ModalText>
              Do you want to send the invitation to
              <p>
                <span style={{ color: `${theme.color.primary}` }}>{recipientNum}</span>{" "}
                {recipientNum === 1 ? "person" : "people"}
              </p>
            </ModalText>
            <ButtonWrapper>
              <PrimaryButton
                onClick={() => {
                  setIsSent(true);
                }}
                type="submit"
              >
                Send
              </PrimaryButton>
              <TextButton
                onClick={(e) => {
                  e.preventDefault();
                  hideModal();
                  returnForm();
                }}
              >
                Cancel
              </TextButton>
            </ButtonWrapper>
          </ModalWrapper>
        </Form>
        <ModalWrapper isSent={isSent} modal={modal}>
          <SubWrapper3>
            <IconBox>
              <AiIcons.AiOutlineClose
                color="#4f4f4f"
                size="1.5em"
                onClick={() => {
                  hideModal();
                  returnForm();
                  setIsSent(false);
                }}
              />
            </IconBox>
          </SubWrapper3>
          <ModalText>
            Email has been sent to <span style={{ color: `${theme.color.primary}` }}>{recipientNum}</span>{" "}
            {recipientNum === 1 ? "person" : "people"}.
          </ModalText>

          <div
            style={{
              fontSize: "1em",
              fontFamily: "open-sans sans-serif",
              marginTop: "15px",
              marginBottom: "10px",
            }}
          >
            Confirm and return Home
          </div>
          <StyledLink to={{ pathname: "/home" }}>Confirm</StyledLink>
        </ModalWrapper>
      </Modal>
      <OuterContainer>
        <MainContent>
          <Wrapper>
            {/* <ProjectTitle>{props.projectTitle}</ProjectTitle> */}
            <Title2>Invite Applicants</Title2>
            {/* <InputField value={recipients} label="Recipients">
              {recipients.map((recipient, index) => {
                  return <Recipients>{recipient}</Recipients>;
                })}
            </InputField> */}
            <SubWrapper2>
              <Noti>Notify by</Noti>
              <Email onClick={makeEmail} isEmail={isEmail}>
                Email
              </Email>
              <DirectLink onClick={makeDirectLink} isEmail={isEmail}>
                Direct Link
              </DirectLink>
            </SubWrapper2>
            {!isEmail && (
              <>
                <FlexWrapper>
                  <CopyToClipboard onClick={copyLink} text={directLink}>
                    <PrimaryButton onClick={copyLink} visibility={isEmail}>
                      Copy
                    </PrimaryButton>
                  </CopyToClipboard>

                  <LinkBox>{directLink}</LinkBox>
                </FlexWrapper>
                <CopiedConfirm visibility={linkCopied}>Link copied to clipboard!</CopiedConfirm>
                {/* <FlexWrapper>
                  <CopyToClipboard onClick={copyEmail} text={recipientsEmail}>
                    <PrimaryButton onClick={copyEmail}> Copy</PrimaryButton>
                  </CopyToClipboard>
                  <InputField style={{ width: "86%" }} value={recipientsEmail}></InputField>
                </FlexWrapper>
                <CopiedConfirm visibility={emailCopied}>Email copied to clipboard!</CopiedConfirm> */}
              </>
            )}
            {isEmail && (
              <Form style={{ width: "70%" }} onSubmit={preventRenew}>
                <InputField
                  placeholder="Please enter recipients emails separated with 'comma' or 'space' or both 'comma and space'"
                  label="To"
                  name="to"
                  value={to}
                  onChange={handleToChange}
                />
                <InputField
                  placeholder="Please enter your email"
                  label="From"
                  type="email"
                  name="from"
                  value={from}
                  onChange={handleFromChange}
                />
                <InputField
                  placeholder="Email Subject"
                  label="Subject"
                  type="text"
                  name="subject"
                  value={subject}
                  onChange={handleSubjectChange}
                />
                <EmailBox
                  placeholder="email content"
                  cols="30"
                  rows="8"
                  name="content"
                  value={content}
                  onChange={handleEmailChange}
                />
                <PrimaryButton type="submit">Send</PrimaryButton>
              </Form>
            )}
          </Wrapper>
        </MainContent>
      </OuterContainer>
    </>
  );
}

ShareLink.defaultProps = {
  projectTitle: "Title",
  recipients: ["IGEN330", "Han", "abc@gmail.com"],
  directLink: "www.letsplanet.app/calendar-share/603aadbe897ce738ba08f418",
  interviewerEmail: "IgenTeamPlanet@gmail.com",
  recipientsEmail: ["ubchanyu@gmail.com"],
};

export default ShareLink;
