import react from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  width: 50%;
  min-width: 400px;
  height: 60%;
  margin: 0 auto;
  text-align: center;
  box-shadow: 10px 10px 15px 7px #c2c2c2;
  position: absolute;
  left: 25%;
  top: 20%;
  border-radius: 10px;
  font-family: sans-serif;
`;

//this come from a global thing
const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  font-family: sans-serif;
  position: relative;
  top: 20%;
`;

//this should also come from a global thing
const Content = styled.h3`
  font-size: 1.5em;
  text-align: center;
  font-family: sans-serif;
  position: relative;
  top: 20%;
`;

//this should also also come from a global thing
const Button = styled.button`
    font-size: 1em;
    margin: 1em;
    padding: 0.5em 1em;
    border: 2px solid;
    border-radius: 3px;
    text-align: center;
    position:relative;
    top:20%;
    margin: auto
    font-family: sans-serif;
`;

function ConfirmationModal(props) {
  return (
    <Wrapper>
      <Title>{props.interviewInfo.title}</Title>
      <Content>Date: {props.interviewInfo.date}</Content>
      <Content>Time: {props.interviewInfo.time}</Content>
      <Button>Continue</Button>
    </Wrapper>
  );
}

export default ConfirmationModal;
