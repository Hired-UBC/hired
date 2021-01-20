
import './kj.css';
import React from 'react';
import ReactDOM from 'react-dom';

//DESCRIPTION BOX
class DescriptionBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { description: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.description });
  }

  handleSubmit(event) {
    alert("A description was submitted:" + this.state.description);
    event.preventDefault();
  }
  render() {
    return (
      <form>
        <textarea
          name="description"
          rows="10"
          cols="30"
          placeholder="Description of Event"
        >
          <input type="text" description={this.state.description}>
          </input>
        </textarea>
      </form>
    );
  }
}

//DROPDOWN FOR TIMEZONE
class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value_drop: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value_drop});
  }

  handleSubmit(event) {
    alert('Your Time zone is ' + this.state.value_drop);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit = {this.handleSubmit}>
        <select>
          <input 
            name = "timezone" 
            type = "text" 
            value_drop = {this.state.value_drop} 
            onChange = {this.handleChange} />
          <option value="empty"></option>
          <option value="PST">PST</option>
          <option value="EST">EST</option>
          <option value="CST">CST</option>
        </select>
      </form>
    );
  }
}

//INPUTFORM FOR EVENT TITLE
class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A value was submitted:" + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          className = 'title'
          value={this.state.value}
          onChange={this.handleChange}
          placeholder = "Event Name"
        />
      </form>
    );
  }
}
//Submit <input type="Submit" value="Submit" />

//INPUT FOR DATE
class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A date was submitted:" + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

//INPUT FOR TIME
class TimeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'number' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A time was submitted:" + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='number'
          value={this.state.value}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default function InfoForm() {
  return(
    <div>
        <InputForm />
        <hr></hr>
        <DescriptionBox />
        <h3>Dates</h3>
          <div name='dateinput' className = 'rowC'>
            <DateInput />
              <text className = 'space'>To
                </text>
              <text className = 'space' />
            <DateInput />
          </div>
          
        <h3>Time Range</h3>
          <div name='timeinput' className = 'rowC'>
              <TimeInput />
                <text className = 'space'>To
                  </text>
                <text className = 'space' />
              <TimeInput />
            </div>
        <h3>Time Zone</h3>
        <DropDown />
        <br></br>
        <form onSubmit = "console.log(description)">
          <input type="Submit" value="Submit" />
        </form>
        
      </div>
  );
}
