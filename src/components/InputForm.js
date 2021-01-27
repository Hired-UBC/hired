import styled from 'styled-components';
import { useState } from 'react';

const BackPanel = styled.div`
    background-color: #f5f5f5;
    padding: 20px;
    border-color: #c7c7c7;
    border-radius: 10px;
    border-width: 4px;
    width: 400px;
    height: 400px;
    margin: 10px;
`;

const EventTitle = styled.input`
    border:none;
    background-color: #f5f5f5;
    font-size: 25px;
    font-family: Helvetica, sans-serif;
    color: #4e4e4e;
    :focus {
        outline:none;
    }
`;

const Description = styled.textarea`
    font-family: Helvetica, sans-serif;
    font-size: 13px;
    border-color: #d1d1d1;
    border-width: 1.75px;
    border-radius: 5px;
    font-color: red;
    resize:none;
    height: 150px;
    width: 380px;
    padding: 10px;
    margin-bottom:15px;
`;

const LineBreak = styled.hr`
    border: 0;
    height: 0;
    border-top: 1.75px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`; 

const Label = styled.label`
    color: #4e4e4e;
    font-family: Helvetica, sans-serif;
    font-size: 15px;
    margin-right: 10px;
`;
const InputBox = styled.input`
    width: 40px;
    border-radius: 5px;
    border-width: 1.75px;
    border-color: solid;
`;

const Dropdown = styled.select`
    width: 80px;
    border-radius: 5px;
`;

const SubmitButton = styled.input`
    width: 80px;
    height: 30px;
    font-family: Helvetica, sans-serif;
    background-color: #4e77de;
    color: white;
    border: none;
    border-radius: 6px;
`;

export const useInput = initialValue => {
    const[value,setValue] = useState(initialValue);

    return {
        value,
        setValue,
        reset: () => setValue(""),
        bind: {
            value,
            onChange: event => {
                setValue(event.target.value);
            }
        }
    };
};

export default function NameForm(props) {
    const{value:TimeZone, bind:bindTimeZone, reset:resetTimeZone} = useInput('');
    const{value:EventName, bind:bindEventName, reset:resetEventName} = useInput('');
    const{value:EventDescription, bind:bindEventDescription, reset:resetEventDescription} = useInput('');
    const{value:Date1, bind:bindDate1, reset:resetDate1} = useInput('');
    const{value:Date2, bind:bindDate2, reset:resetDate2} = useInput('');
    const{value:Time1, bind:bindTime1, reset:resetTime1} = useInput('number');
    const{value:Time2, bind:bindTime2, reset:resetTime2} = useInput('number');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(
            `\n
            Event Name: ${EventName}\n
            Event Description: ${EventDescription}\n
            Date Range: ${Date1} to ${Date2}\n
            Time Range: ${Time1} to ${Time2}\n
            Time Zone: ${TimeZone}
        `);
        resetEventName();
        resetEventDescription();
        resetDate1();
        resetDate2();
        resetTime1();
        resetTime2();
        resetTimeZone();
    }

   return(
    <BackPanel>
        <form onSubmit={handleSubmit}>
            <EventTitle type="text" name="Event Name" placeholder = "Event Name" {...bindEventName} />
            <br></br>
            <LineBreak></LineBreak>
            <Description 
                placeholder="Description of Event" {...bindEventDescription}>
            </Description>
            <br></br>
            <Label>Date Range</Label>
            
            <InputBox type="text" name="Date1" {...bindDate1} />
            <h8> - </h8>
            <InputBox type = "" name="Date2" {...bindDate2} />
            <br></br>
            <br></br>
            <Label>Time Range</Label>
            
            <InputBox type="number" name="Time1" {...bindTime1} />
            <h8> - </h8>
            <InputBox type = "number" name="Time2" {...bindTime2} />
            <br></br>
            <br></br>
            <Label>Time Zone</Label>
            <Dropdown {...bindTimeZone}>
                    <option value="empty"></option>
                    <option value="PST">PST</option>
                    <option value="AST">AST</option>
                    <option value="CST">CST</option>
                    <option value="EST">EST</option>
                    <option value="NST">NST</option>
                    <option value="AST">AST</option>
            </Dropdown>
            <br></br>
            <br></br>
            <SubmitButton type="submit" value="Submit" />
        </form>
    </BackPanel>
);
  }

