import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import * as AiIcons from "react-icons/ai";
import { CopyToClipboard } from "react-copy-to-clipboard";
import emailjs from "emailjs-com";

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
  color: #5845cb;
`;

const Title2 = styled.div`
  padding: 0.3em;
  padding-left: 0;
  font-size: 2em;
  font-weight: 600;
  margin-bottom: 2%;
`;

const FlexWrapper = styled.div`
  margin-top: 1%;
  padding: 0.3em 0;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 70%;
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

const Recipients = styled.span`
  padding 0.3% 1%;
  display: flex;
  justify-content: space-around;
  margin: 0.3%
  background-color: ${(props) => (props.color ? "#4f4f4f" : "#5845cb")}
`;

const Email = styled.span`
  font-size: 1.2em;
  font-weight: 600;
  margin: 0% 5%;
  color: ${(props) => (props.isEmail ? "#5845cb" : "#4f4f4f")};
  text-decoration: ${(props) => (props.isEmail ? "underline" : "")};

  &:active {
    transform: translateY(2%);
  }
`;

const DirectLink = styled.span`
  font-size: 1.2em;
  font-weight: 500;
  margin: 0% 5%;
  color: ${(props) => (props.isEmail ? "#4f4f4f" : "#5845cb")};
  text-decoration: ${(props) => (props.isEmail ? "" : "underline")};

  &:active {
    transform: translateY(2%);
  }
`;

const Copy = styled.span`
  font-weight: 600;
  padding: 1% 2%;
  font-family: open-sans, sans-serif;
  color: white;
  background-color: #5845cb;
  justify-content: center;
  align-item: center;
  border-radius: 0.3em;
  box-shadow: 0.1em 0.1em 0em #e0e0e0;
  visibility: ${(props) => (props.visibility ? "hidden" : "visible")};
  transition: hover 250ms;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    transform: translateY(3%);
    background-color: #4835bb;
    opacity: 1;
  }
`;

const Submit = styled.button`
  margin-top: 10px;
  font-family: open-sans, sans-serif;
  font-weight: 550;
  font-size: 1.1em;
  width: 115px;
  padding: 1% 2%;
  color: white;
  background-color: #5845cb;
  justify-content: center;
  align-item: center;
  border: none;
  border-radius: 0.3em;
  box-shadow: 0.1em 0.1em 0em #e0e0e0;
  visibility: ${(props) => (props.visibility ? "hidden" : "visible")};
  transition: hover 250ms;

  &:focus {
    border: none;
  }

  &:hover {
    opacity: 0.7;
  }

  &:active {
    background-color: #4835bb;
    opacity: 1;
    border: none;
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

const EmailGrid = styled.div`
  display: grid;
  row-auto-template: auto;
  column-auto-template: auto;
`;

const EmailBox = styled.textarea`
  font-family: open-sans, sans-serif;
  padding: 1em 1em;
  margin-top: 1%;
  width: 98%;
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

const AddressBox = styled.span`
  padding: 0.2% 1%;
  display: inline-block;
  font-family: open-sans, sans-serif;
  background-color: #aeaeae;
  color: black;
  border-radius: 0.3em;
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
  background-color: #5845cb;
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

const Fadeout = keyframes`
0%{
  opacity: 1;
}

70%{
  opacity: 0;
}

100$ {
  opacity: 0;
}
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function ShareLink(props) {
  //form states
  const [to, setTo] = useState(props.recipientsEmail);
  const [from, setFrom] = useState(props.interviewerEmail);
  const [subject, setSubject] = useState(
    `Interview Schedule for ${props.projectTitle}`
  );
  const [content, setContent] = useState(`Dear Line break 

please work...

Direct Link: ${props.directLink}`);

  //functional states
  const [recipients, setRecepients] = useState(props.recipients);
  const [isEmail, setIsEmail] = useState(true);
  const [directLink, setLink] = useState(props.directLink);
  const [linkCopied, setLinkCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [recipientsEmail, setRecipientEmail] = useState(props.recipientsEmail);
  const [modal, setModal] = useState(false);
  const [recipientNum, setRecipientNum] = useState(recipientsEmail.length);

  //Email function

  function sendEmail(e) {
    e.preventDefault();
    showModal();

    emailjs
      .sendForm(
        "service_2dc41mm",
        "template_6rr2iu6",
        e.target,
        "user_XTmaRu8fRxA3TPjZlGSm1"
      )
      .then(
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

  // const handleSubmit = () => {
  //   var emailContent = content;
  //   emailContent = emailContent.split("\n");
  //   return (
  //     <Form visibility="hidden" id="autoSubmit" onSubmit={sendEmail}>
  //       <InputBox name="to" value={to} />
  //       <InputBox name="from" value={from} />
  //       <InputBox name="subject" value={subject} />
  //       <EmailBox name="content" value={content} />
  //     </Form>
  //   );
  // };

  const handleToChange = (event) => {
    // let temp = event.target.value
    // temp = temp.split(",")
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
    setRecipientNum(recipientsEmail.length);
  };

  console.log(isEmail);

  if (isEmail) {
    //using Email
    return (
      <>
        <Modal visibility={modal}>
          <SubWrapper3>
            <IconBox>
              <AiIcons.AiOutlineClose
                color="#4f4f4f"
                size="1.5em"
                onClick={hideModal}
              />
            </IconBox>
          </SubWrapper3>
          <ModalText>
            Email has been sent to{" "}
            <span style={{ color: "#5845cb" }}>{recipientNum}</span>{" "}
            {recipientNum == 1 ? "person" : "people"}.
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
          <StyledLink to={{ pathname: "/" }}>Confirm</StyledLink>
        </Modal>
        <Container>
          <Wrapper>
            <ProjectTitle>{props.projectTitle}</ProjectTitle>
            <Title2>Invite Applicants</Title2>
            <FlexWrapper>
              <Reci>Recipients</Reci>
              <InputBox value={recipients}>
                {/* {recipients.map((recipient, index) => {
                  return <Recipients>{recipient}</Recipients>;
                })} */}
              </InputBox>
            </FlexWrapper>
            <SubWrapper2>
              <Noti>Notify by</Noti>
              <Email onClick={makeEmail} isEmail={isEmail}>
                Email
              </Email>
              <DirectLink onClick={makeDirectLink} isEmail={isEmail}>
                Direct Link
              </DirectLink>
            </SubWrapper2>
            <Form onSubmit={sendEmail}>
              <FlexWrapper>
                <span>To</span>
                <InputBox
                  placeholder="Please enter recipients emails"
                  name="to"
                  value={to}
                  onChange={handleToChange}
                />
              </FlexWrapper>
              <FlexWrapper>
                <span>From</span>
                <InputBox
                  placeholder="Please enter your email"
                  type="email"
                  name="from"
                  value={from}
                  onChange={handleFromChange}
                ></InputBox>
              </FlexWrapper>
              <FlexWrapper>
                <span>Subject</span>
                <InputBox
                  placeholder="Email Subject"
                  type="text"
                  name="subject"
                  value={subject}
                  onChange={handleSubjectChange}
                ></InputBox>
              </FlexWrapper>
              <EmailBox
                placeholder="email content"
                cols="30"
                rows="8"
                name="content"
                value={content}
                onChange={handleEmailChange}
              />
              <Submit type="submit">Send</Submit>
            </Form>
          </Wrapper>
        </Container>
      </>
    );
  } else {
    //using direct link
    return (
      <>
        <Container>
          <Wrapper>
            <ProjectTitle>{props.projectTitle}</ProjectTitle>
            <Title2>Invite Applicants</Title2>
            <FlexWrapper>
              <Reci>Recipients</Reci>
              <InputBox value={recipients}>
                {/* {recipients.map((recipient, index) => {
                  return <Recipients>{recipient}</Recipients>;
                })} */}
              </InputBox>
            </FlexWrapper>
            <SubWrapper2>
              <Noti>Notify by</Noti>
              <Email onClick={makeEmail} isEmail={isEmail}>
                Email
              </Email>
              <DirectLink onClick={makeDirectLink} isEmail={isEmail}>
                Direct Link
              </DirectLink>
            </SubWrapper2>
            <FlexWrapper>
              <CopyToClipboard onClick={copyLink} text={directLink}>
                <Copy onClick={copyLink} visibility={isEmail}>
                  Copy
                </Copy>
              </CopyToClipboard>

              <LinkBox>{directLink}</LinkBox>
            </FlexWrapper>
            <CopiedConfirm visibility={linkCopied}>
              Link copied to clipboard!
            </CopiedConfirm>
            <FlexWrapper>
              <CopyToClipboard onClick={copyEmail} text={recipientsEmail}>
                <Copy onClick={copyEmail}> Copy</Copy>
              </CopyToClipboard>
              <InputBox value={recipientsEmail}></InputBox>
            </FlexWrapper>
            <CopiedConfirm visibility={emailCopied}>
              Email copied to clipboard!
            </CopiedConfirm>
          </Wrapper>
        </Container>
      </>
    );
  }
}

ShareLink.defaultProps = {
  projectTitle: "Title",
  recipients: ["IGEN330", "Han", "abc@gmail.com"],
  directLink: "www.google.com",
  interviewerEmail: "IgenTeamHired@gmail.com",
  recipientsEmail: ["ubchanyu@gmail.com"],
};

export default ShareLink;
