import React, { useState } from "react";
import styled from "styled-components";
import * as AiIcons from "react-icons/ai";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
  padding: 0.3em 0;
  display: inline-flex;
  justify-content: space-between;
  align-items: start;
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
  background-color: ${(props) => props.color}
`;

const Email = styled.span`
  font-size: 1.2em;
  font-weight: 600;
  margin: 0% 5%;
  color: ${(props) => props.color};
  text-decoration: ${(props) => props.deco};
`;

const DirectLink = styled.span`
  font-size: 1.2em;
  font-weight: 500;
  margin: 0% 5%;
  color: ${(props) => props.color};
  text-decoration: ${(props) => props.deco};
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
  visibility: ${(props) => props.visibility};

  &:active {
    transform: translateY(3%);
    background-color: #4835bb;
  }
`;

const Box = styled.span`
  padding: 0.5% 1%;
  width: 86%;
  display: flex;
  justify-content: flex-start;
  color: black;
  border: solid 1px #e0e0e0;
  border-radius: 0.3em;
  font-size: 1.1em;
  font-weight: 500;
`;

const LinkBox = styled.span`
  padding: 0.35em;
`;

const EmailBox = styled.span`
  padding: 0.5% 2%;
  display: inline-block;
  font: open-sans;
  background-color: #aeaeae;
  color: black;
  border-radius: 0.3em;
`;

const SubWrapper3 = styled.div`
  display: flex;
  justify-content: flex-end;
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
  visibility: ${(props) => props.visibility};
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
  margin-right: 5%;
  padding: 1em 0.2em;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Inst = styled.div`
  font-size: 1.2em;
  font-weight: 500;
  width: 90%;
  height: 10%;
  margin-left: 5%;
`;

const Input = styled.textarea`
  height: 44%;
  width: 81%;
  font-size: 1.2em;
  padding: 3% 3%;
  line-height: normal;
  font: open-sans;
  outline-style: none;
`;

const CopiedConfirm = styled.div`
  visibility: ${(props) => props.visibility};
  font-size: 0.8em;
  font-weight: 500;
`;

function ShareLink(props) {
  const [recipients, setRecepients] = useState(props.recipients);
  const [isEmail, setIsEmail] = useState(true);
  const [directLink, setLink] = useState(props.directLink);
  const [isCopied, setIsCopied] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState(null);
  const [addEmail, setAddEmail] = useState(false);

  const makeRecipients = () => {};
  const makeEmail = () => {
    setIsEmail(true);
  };

  const makeDirectLink = () => {
    setIsEmail(false);
  };

  const openAddEmail = () => {
    setAddEmail(true);
  };

  const closeAddEmail = () => {
    setAddEmail(false);
  };

  const Copied = () => {
    setIsCopied(true);
  };

  console.log(isEmail);

  if (isEmail && recipientEmail) {
    return (
      <>
        {/* <GrayBG visibility={addEmail ? "visible" : "hidden"}> */}
        <AddEmailBox visibility={addEmail ? "visible" : "hidden"}>
          <IconBox>
            <AiIcons.AiOutlineClose size="1.6em" onClick={closeAddEmail} />
          </IconBox>
          <Inst>Enter the email addresses separated with commas</Inst>
          <Input></Input>
        </AddEmailBox>
        {/* </GrayBG> */}
        <Container>
          <Wrapper>
            <ProjectTitle>{props.projectTitle}</ProjectTitle>
            <Title2>Invite Applicants</Title2>
            <FlexWrapper>
              <Reci>Recipients</Reci>
              <Box>
                {recipients.map((recipient, index) => {
                  return <Recipients>{recipient}</Recipients>;
                })}
              </Box>
            </FlexWrapper>
            <SubWrapper2>
              <Noti>Notify by</Noti>
              <Email
                onClick={makeEmail}
                color={isEmail ? "#5845cb" : "#4f4f4f"}
                deco={isEmail ? "underline" : ""}
              >
                Email
              </Email>
              <DirectLink
                onClick={makeDirectLink}
                color={isEmail ? "#4f4f4f" : "#5845cb"}
                deco={isEmail ? "" : "underline"}
              >
                Direck Link
              </DirectLink>
            </SubWrapper2>
            <FlexWrapper>
              <Copy visibility={isEmail ? "hidden" : "visible"}>Copy</Copy>
              <Box>
                <EmailBox>EMAIL (to be alterned with state)</EmailBox>
              </Box>
            </FlexWrapper>
            <SubWrapper3>
              <Copy onClick={openAddEmail}>Add</Copy>
            </SubWrapper3>
          </Wrapper>
        </Container>
      </>
    );
  } else if (isEmail && recipientEmail == null) {
    //Using email, no email state
    return (
      <>
        {/* <GrayBG visibility={addEmail ? "visible" : "hidden"}> */}
        <AddEmailBox visibility={addEmail ? "visible" : "hidden"}>
          <IconBox>
            <AiIcons.AiOutlineClose size="1.6em" onClick={closeAddEmail} />
          </IconBox>
          <Inst>Enter the email addresses separated with commas</Inst>
          <Input></Input>
        </AddEmailBox>
        {/* </GrayBG> */}
        <Container>
          <Wrapper>
            <ProjectTitle>{props.projectTitle}</ProjectTitle>
            <Title2>Invite Applicants</Title2>
            <FlexWrapper>
              <Reci>Recipients</Reci>
              <Box>
                {recipients.map((recipient, index) => {
                  return <Recipients>{recipient}</Recipients>;
                })}
              </Box>
            </FlexWrapper>
            <SubWrapper2>
              <Noti>Notify by</Noti>
              <Email
                onClick={makeEmail}
                color={isEmail ? "#5845cb" : "#4f4f4f"}
                deco={isEmail ? "underline" : ""}
              >
                Email
              </Email>
              <DirectLink
                onClick={makeDirectLink}
                color={isEmail ? "#4f4f4f" : "#5845cb"}
                deco={isEmail ? "" : "underline"}
              >
                Direck Link
              </DirectLink>
            </SubWrapper2>
            <FlexWrapper>
              <Copy visibility={isEmail ? "hidden" : "visible"}>Copy</Copy>
              <Box>
                <EmailBox onClick={openAddEmail}>Please Enter Email</EmailBox>
              </Box>
            </FlexWrapper>
            <SubWrapper3>
              <Copy onClick={openAddEmail}>Add</Copy>
            </SubWrapper3>
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
              <Box>
                {recipients.map((recipient, index) => {
                  return <Recipients>{recipient}</Recipients>;
                })}
              </Box>
            </FlexWrapper>
            <SubWrapper2>
              <Noti>Notify by</Noti>
              <Email
                onClick={makeEmail}
                color={isEmail ? "#5845cb" : "#4f4f4f"}
                deco={isEmail ? "underline" : ""}
              >
                Email
              </Email>
              <DirectLink
                onClick={makeDirectLink}
                color={isEmail ? "#4f4f4f" : "#5845cb"}
                deco={isEmail ? "" : "underline"}
              >
                Direck Link
              </DirectLink>
            </SubWrapper2>
            <FlexWrapper>
              <CopyToClipboard onClick={Copied} text={directLink}>
                <Copy
                  onClick={Copied}
                  visibility={isEmail ? "hidden" : "visible"}
                >
                  Copy
                </Copy>
              </CopyToClipboard>
              <Box>
                <LinkBox>{directLink}</LinkBox>
              </Box>
            </FlexWrapper>
            <CopiedConfirm visibility={isCopied ? "visible" : "hidden"}>
              Link copied to clipboard!
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
};

export default ShareLink;
