import styled from 'styled-components';
import { useState } from 'react';

const Button = styled.button`
    border: none;
    cursor: pointer;
    font-family: helvetica;
    font-size: 15px;
    background-color: #4e77de;
    color: white;
    padding: 10px;
    padding-left: 30px;
    padding-right: 30px;
    border-radius: 5px;
    margin-top: 20px;
    margin-left: 20px;
   
    :hover {
        opacity: 0.8;
    }
`;

export const handleClick = value => () => {
    console.log(value);
}

export default function buttonClick(props) {
    return(
        <Button onClick={handleClick}>Click</Button>
    );
}
