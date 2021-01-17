import styled from 'styled-components';
import { useState } from 'react';

// This is using something called styled components
// For example, I'm creating a "MyContainer" component below which is
// quite literally just a div with some styles applied to it.
// ** These components are NOT accessible outside this file
const MyContainer = styled.div`
    background-color: #E6E6E6;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    height: 150px;
`;

// Styled components work for ANY HTML tag.
// For example, a button!
const Button = styled.button`
    border: none;
    cursor: pointer;
    background-color: #3f51b5;
    color: white;
    padding: 10px;
    border-radius: 5px;
    margin-right: 10px;
    :hover {
        opacity: 0.7;
    }
`;

// Below is our functional component
// You don't have to worry about a "this" keyword, binding, or any of that

const ExampleComponent = (props) => {
    // The line of code below sets a state variable called count, which we initialize to the value 0
    // We use setCount to make changes to the count variable.
    // You cannot directly do something like count = 3, as count is a CONST
    // You must do setCount(3)
    const [count, setCount] = useState(0);
    const title = props.title;
    return(
        <MyContainer>
            <p>{title}</p>
            <h3>I'm the Example Component!</h3>
            <p>The count variable is: {count}</p>
            <Button onClick={() => setCount(count + 1)}>Increase Count</Button>
            <Button onClick={() => setCount(count - 1)}>Decrease Count</Button>
        </MyContainer>
    )
}

export default ExampleComponent;