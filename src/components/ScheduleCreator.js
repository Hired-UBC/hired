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

const durationOptions = [
  { value: "30", label: "30 mins" },
  { value: "60", label: "1 hour" },
];

const ScheduleCreator = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [slotDuration, setSlotDuration] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  return (
    <OuterContainer>
      <MainContent>
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
            onSelect={setSlotDuration}
            label="Slot Duration"
            options={durationOptions}
          />

          <PrimaryButton icon={faPlus} onClick={null}>
            Create Schedule
          </PrimaryButton>
        </form>
      </MainContent>
    </OuterContainer>
  );
};

export default ScheduleCreator;
