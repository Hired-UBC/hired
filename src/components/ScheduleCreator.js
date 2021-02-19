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
import { createCalendar } from "../utils/api";

const durationOptions = [
  { value: "30", label: "30 mins" },
  { value: "60", label: "1 hour" },
];

const ScheduleCreator = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateStart, setStartDate] = useState(new Date());
  const [dateEnd, setEndDate] = useState(new Date());
  dateStart.setHours(0, 0, 0, 0);
  dateEnd.setHours(0, 0, 0, 0);
  const [slotDuration, setSlotDuration] = useState();
  const [timeStart, setStartTime] = useState(new Date());
  const [timeEnd, setEndTime] = useState(new Date());
  const [scheduleObj, setScheduleObj] = useState();

  const handleSetDuration = (e) => {
    setSlotDuration(e);
  };

  const handleCreateSchedule = () => {
    const newScheduleObj = {
      author: "testing",
      event_type: "interview",
      title: title,
      description: description,
      dateStart: dateStart,
      dateEnd: dateEnd,
      timeStart: timeStart,
      timeEnd: timeEnd,
      slotDuration: slotDuration,
    };
    console.log(newScheduleObj);
    setScheduleObj(newScheduleObj);
    createCalendar(newScheduleObj).then((res) => console.log("!!!!!", res));
  };

  return (
    <OuterContainer>
      <MainContent>
        {!scheduleObj && (
          <form>
            <TitleInput
              placeholder="Untitled Event"
              onChange={(e) => setTitle(e.target.value)}
            ></TitleInput>
            <LongInput
              placeholder="Event description"
              onChange={(e) => setDescription(e.target.value)}
            ></LongInput>
            <DateRangePicker
              label="Date Range"
              startDate={dateStart}
              endDate={dateEnd}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
            <TimeRangePicker
              label="Daily Time Range"
              startTime={timeStart}
              endTime={timeEnd}
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
