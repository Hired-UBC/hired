import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Form from "react-bootstrap/Tab";
import Button from "react-bootstrap/Tab";
import CalendarButton from "./components/Calendar/CalendarButton.js";
import CalendarGrid from "./components/Calendar/Calendar_Old";
import CalendarData from "./components/Calendar/CalendarData";
import Calendar from "react-calendar";
import Popover from "./components/Calendar/Popover";
import "react-calendar/dist/Calendar.css";

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());
  startDate.setHours(0, 0, 0, 0);
  finalDate.setHours(0, 0, 0, 0);
  const makeStartDate = (startDate) => setStartDate(startDate);
  const makeFinalDate = (finalDate) => setFinalDate(finalDate);

  return (
    <>
      {/* <Popover clicked={true} firstName="Han" lastName="Yu" /> */}
      {/* <CalendarButton
        active={true}
        clicked={false}
        time="10:00"
        firstName="Han"
        lastName="Yu"
      /> */}
      <div>
        <Calendar onChange={makeStartDate} value={startDate} />
      </div>
      <div>
        <Calendar onChange={makeFinalDate} value={finalDate} />
      </div>
      {startDate.toString()}
      {finalDate.toString()}
      {finalDate - startDate}
      <CalendarData
        startDate={startDate}
        finalDate={finalDate}
        dateDiff={finalDate - startDate}
        startHour={10}
        startMin={0}
        finalHour={16}
        finalMin={30}
        duration={30}
      />
    </>
  );
}

export default App;
