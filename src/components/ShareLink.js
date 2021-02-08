import React, { useState } from "react";
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
  font: open-sans;
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
  color: ${(props) => (props.color ? "#5845cb" : "#4f4f4f")};
  text-decoration: ${(props) => (props.deco ? "underline" : "")};
`;

const DirectLink = styled.span`
  font-size: 1.2em;
  font-weight: 500;
  margin: 0% 5%;
  color: ${(props) => (props.color ? "#4f4f4f" : "#5845cb")};
  text-decoration: ${(props) => (props.deco ? "" : "underline")};
`;

const Copy = styled.span`
  font-weight: 600;
  padding: 1% 2%;
  font: open-sans;
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
  font-family: open-sans sans-serif;
  font-weight: 600;
  width: 10%;
  padding: 1% 2%;
  font: open-sans;
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
  font: open-sans;
  background-color: #aeaeae;
  color: black;
  border-radius: 0.3em;
`;

const SubWrapper3 = styled.div`
  display: flex;
  //justify-content: flex-end;
  align-item: center;
`;

const Noti = styled.span`
  font: open-sans;
  font-weight: 700;
  font-size: 1.2em;
`;

const Reci = styled.span`
  font: open-sans;
  font-weight: 450;
  font-size: 1.1em;
`;

const AddEmailBox = styled.div`
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
  width: 30%;
  height: 40%;
  box-shadow: 0.3em 0.3em 0.1em #e0e0e0;
  border: solid 2px #4f4f4f;
  border-radius: 0.5em;
`;

const IconBox = styled.div`
  position: relative;
  left: 46%;
  top: 2%;
  margin-bottom: 1em;
  width: 2em;
  height: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1em;
  transition: background-color 250ms;

  &:hover {
    background-color: #f3f3f3;
  }
`;

const Inst = styled.div`
  font-size: 1.2em;
  font-weight: 500;
  width: 90%;
  height: 10%;
  margin-left: 5%;
`;

const Input = styled(InputBox)`
  height: 50%;
  width: 81%;
  font-size: 1.2em;
  padding: 3% 3%;
  line-height: normal;
  font: open-sans;
  outline-style: none;
  transition border 250ms;
  &:focus {
    outline: none;
    border: 1px solid blue;
  }
`;

const CopiedConfirm = styled.div`
  visibility: ${(props) => (props.visibility ? "visible" : "hidden")};
  font-size: 0.8em;
  font-weight: 500;
  animation: Fadeout 1000ms;
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
  const [content, setContent] = useState(`Dear Han

please exercise...

Direct Link: ${props.directLink}`);

  //functional states
  const [recipients, setRecepients] = useState(props.recipients);
  const [isEmail, setIsEmail] = useState(true);
  const [directLink, setLink] = useState(props.directLink);
  const [linkCopied, setLinkCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [recipientsEmail, setRecipientEmail] = useState(props.recipientsEmail);

  //Email function
  function sendEmail(e) {
    e.preventDefault();

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
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`to: ${to}
    from: ${from}
    subject: ${subject}
    email: ${content}`);
  };

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

  const CopyLink = () => {
    setLinkCopied(true);
  };

  const CopyEmail = () => {
    setEmailCopied(true);
  };

  console.log(isEmail);

  if (isEmail) {
    //using Email
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
              <Email onClick={makeEmail} color={isEmail} deco={isEmail}>
                Email
              </Email>
              <DirectLink
                onClick={makeDirectLink}
                color={isEmail}
                deco={isEmail}
              >
                Direck Link
              </DirectLink>
            </SubWrapper2>
            <Form onSubmit={sendEmail}>
              <FlexWrapper>
                <span>To</span>
                <InputBox name="to" value={to} onChange={handleToChange} />
              </FlexWrapper>
              <FlexWrapper>
                <span>From</span>
                <InputBox
                  type="email"
                  name="from"
                  value={from}
                  onChange={handleFromChange}
                ></InputBox>
              </FlexWrapper>
              <FlexWrapper>
                <span>Subject</span>
                <InputBox
                  type="text"
                  name="subject"
                  value={subject}
                  onChange={handleSubjectChange}
                ></InputBox>
              </FlexWrapper>
              <EmailBox
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
              <Email onClick={makeEmail} color={isEmail} deco={isEmail}>
                Email
              </Email>
              <DirectLink
                onClick={makeDirectLink}
                color={isEmail}
                deco={isEmail}
              >
                Direct Link
              </DirectLink>
            </SubWrapper2>
            <FlexWrapper>
              <CopyToClipboard onClick={CopyLink} text={directLink}>
                <Copy onClick={CopyLink} visibility={isEmail}>
                  Copy
                </Copy>
              </CopyToClipboard>

              <LinkBox>{directLink}</LinkBox>
            </FlexWrapper>
            <CopiedConfirm visibility={linkCopied}>
              Link copied to clipboard!
            </CopiedConfirm>
            <FlexWrapper>
              <CopyToClipboard onClick={CopyEmail} text={recipientsEmail}>
                <Copy onClick={CopyEmail}> Copy</Copy>
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
  recipients: ["IGEN330", "Han", "Niko", "abc@gmail.com"],
  directLink: "www.google.com",
  interviewerEmail: "IgenTeamHired@gmail.com",
  recipientsEmail: [
    "ubchanyu@gmail.com",
    "ubcniko@gmail.com",
    "ubcjenny@gmail.com",
    "ubckaylee@gmail.com",
    "ubcabdullah@gmail.com",
    "ubcmika@gmail.com",
    "asdfasfdsafsfdsfdsfsdkjfhdslkjfhsl@alkdsjh",
  ],
};

export default ShareLink;
