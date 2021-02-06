import React from "react";
import CalendarData from "./Calendar/CalendarData";
import { OuterContainer, MainContent } from "./SharedComponents";

const ScheduleEditor = () => {
  return (
    <OuterContainer>
      <MainContent>
        <CalendarData
          startDate={new Date()}
          finalDate={new Date()}
          dateDiff={0}
          startHour={10}
          startMin={0}
          finalHour={16}
          finalMin={0}
        />
      </MainContent>
    </OuterContainer>
  );
};

export default ScheduleEditor;
