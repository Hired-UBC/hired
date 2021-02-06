import React from "react";
import Calendar from "./CalendarGrid";
import { OuterContainer, MainContent } from "./SharedComponents";

const ScheduleEditor = () => {
  return (
    <OuterContainer>
      <MainContent>
        <Calendar
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
