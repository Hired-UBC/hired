import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
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
  margin-top: 1%;
  padding: 0.3em 0;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  border: solid 1px black;
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

const Box = styled.span`
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
`;

const EmailGrid = styled.div`
  display: grid;
  row-auto-template: auto;
  column-auto-template: auto;
`;

const EmailBox = styled.textarea`
  padding: 1em 1em;
  margin-top: 1%;
  width: 100%;
  height: 50%;
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

const Input = styled.textarea`
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

function ShareLink(props) {
  const [recipients, setRecepients] = useState(props.recipients);
  const [isEmail, setIsEmail] = useState(true);
  const [directLink, setLink] = useState(props.directLink);
  const [linkCopied, setLinkCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [recipientsEmail, setRecipientEmail] = useState(props.recipientsEmail);
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

  const CopyLink = () => {
    setLinkCopied(true);
  };

  const CopyEmail = () => {
    setEmailCopied(true);
  };

  console.log(isEmail);

  if (isEmail) {
    return (
      <>
        {/* <GrayBG visibility={addEmail ? "visible" : "hidden"}> */}
        {/* <AddEmailBox visibility={addEmail}>
          <IconBox>
            <AiIcons.AiOutlineClose size="1.6em" onClick={closeAddEmail} />
          </IconBox>
          <Inst>Enter the email addresses separated with commas</Inst>
          <Input></Input>
        </AddEmailBox> */}
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
            <FlexWrapper>
              <span>To</span>
              <Box>
                {/* <AddressBox>EMAIL (to be alterned with state)</AddressBox> */}
              </Box>
            </FlexWrapper>
            <FlexWrapper>
              <span>From</span>
              <Box></Box>
            </FlexWrapper>
            <FlexWrapper>
              <span>Subject</span>
              <Box></Box>
            </FlexWrapper>

            <EmailBox></EmailBox>
          </Wrapper>
        </Container>
      </>
    );
  }
  // else if (isEmail && recipientEmail == null) {
  //   //Using email, no email state
  //   return (
  //     <>
  //       {/* <GrayBG visibility={addEmail ? "visible" : "hidden"}> */}
  //       <AddEmailBox visibility={addEmail}>
  //         <IconBox>
  //           <AiIcons.AiOutlineClose size="1.6em" onClick={closeAddEmail} />
  //         </IconBox>
  //         <Inst>Enter the email addresses separated with commas</Inst>
  //         <Input></Input>
  //       </AddEmailBox>
  //       {/* </GrayBG> */}
  //       <Container>
  //         <Wrapper>
  //           <ProjectTitle>{props.projectTitle}</ProjectTitle>
  //           <Title2>Invite Applicants</Title2>
  //           <FlexWrapper>
  //             <Reci>Recipients</Reci>
  //             <Box>
  //               {recipients.map((recipient, index) => {
  //                 return <Recipients>{recipient}</Recipients>;
  //               })}
  //             </Box>
  //           </FlexWrapper>
  //           <SubWrapper2>
  //             <Noti>Notify by</Noti>
  //             <Email onClick={makeEmail} color={isEmail} deco={isEmail}>
  //               Email
  //             </Email>
  //             <DirectLink
  //               onClick={makeDirectLink}
  //               color={isEmail}
  //               deco={isEmail}
  //             >
  //               Direct Link
  //             </DirectLink>
  //           </SubWrapper2>
  //           <FlexWrapper>
  //             <Copy visibility={isEmail}>Copy</Copy>
  //             <Box>
  //               <AddressBox onClick={openAddEmail}>
  //                 Please Enter Email
  //               </AddressBox>
  //             </Box>
  //           </FlexWrapper>
  //           <SubWrapper3>
  //             <Copy onClick={openAddEmail}>Add</Copy>
  //           </SubWrapper3>
  //         </Wrapper>
  //       </Container>
  //     </>
  //   );
  // }
  else {
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
              <Box>
                {recipientsEmail.map((email, index) => {
                  return <AddressBox>{email},&nbsp;</AddressBox>;
                })}
              </Box>
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
