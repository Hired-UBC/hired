import React, { useState } from "react";
import {
  OuterContainer,
  MainContent,
  InputField,
  LongInput,
  TitleInput,
  PrimaryButton,
  DateRangePicker,
  StyledSelectDropdown,
  TimeRangePicker,
} from "./SharedComponents";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CalendarData from "./CalendarData";

const durationOptions = [
  { value: "30", label: "30 mins" },
  { value: "60", label: "1 hour" },
];

const ScheduleCreator = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  const [slotDuration, setSlotDuration] = useState();
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [scheduleObj, setScheduleObj] = useState();

  const handleSetDuration = (e) => {
    setSlotDuration(e);
  };

  const handleCreateSchedule = () => {
    const newScheduleObj = {
      startDate: startDate,
      finalDate: endDate,
      dateDiff: endDate - startDate,
      startHour: startTime.getHours(),
      startMin: 0,
      finalHour: endTime.getHours(),
      finalMin: 0,
      duration: slotDuration,
    };
    setScheduleObj(newScheduleObj);
  };

  return (
    <OuterContainer>
      <MainContent>
        {!scheduleObj && (
          <form>
            <TitleInput placeholder="Untitled Event"></TitleInput>
            <LongInput placeholder="Event description"></LongInput>
            <InputField label="Label" placeholder="Placeholder" />
            <DateRangePicker
              label="Date Range"
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
            <TimeRangePicker
              label="Daily Time Range"
              startTime={startTime}
              endTime={endTime}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
            />
            <StyledSelectDropdown
              onSelect={handleSetDuration}
              label="Slot Duration"
              options={durationOptions}
            />
            <PrimaryButton icon={faPlus} onClick={handleCreateSchedule}>
              Create Schedule
            </PrimaryButton>
          </form>
        )}
        {scheduleObj && <CalendarData scheduleObj={scheduleObj} />}
      </MainContent>
    </OuterContainer>
  );
};

export default ScheduleCreator;
