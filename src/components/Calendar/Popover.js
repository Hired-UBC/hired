import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  paddding: 0.6em;
  max-width: 20%;
  //translate: -50%, -50%;
  display: flex;
  justify-contents: flex;
  background-color: white;
  flex-direction: column;
  border: solid 1px gray;
  z-index: 1000;
  shadow: 3px 1px 2px 0px;
`;

const InlineWrapper = styled.div`
  display: inline-box;
`;
const Item1 = styled.span`
  font-size: 1em;
  margin: 2%;
  grid-column: 1/3;
  background-color: ;
`;

const Item2 = styled.span`
  font-size: 1em;
  margin: 2%;
  grid-column: 1/3;
  background-color: ;
`;

const Names = styled.div``;

//   &:first-child {
//     grid-column: 1/3;
//     background-color: blue;
//   }

//   &:second-child {
//     grid-column: 4/5;
//     background-color: red;
//   }
// `;

const Header = styled.h1`
  display: flex;
`;

function Popover(props) {
  return ReactDOM.createPortal(
    <>
      <Wrapper>
        <InlineWrapper>
          <Item1>{props.clicked ? "Slot Selected" : "Not Selected"}</Item1>
          <Item2>something</Item2>
        </InlineWrapper>

        <div>{props.firstName}</div>
        <div>{props.lastName}</div>
      </Wrapper>
    </>,
    document.getElementById("portal")
  );
}

Popover.defaultProps = {};

export default Popover;
