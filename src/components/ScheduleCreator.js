import React, { useState } from "react";
import { Redirect } from "react-router-dom";
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
import { useHistory } from "react-router-dom";

const durationOptions = [
  { value: "15", label: "15 mins" },
  { value: "30", label: "30 mins" },
  { value: "45", label: "45 mins" },
  { value: "60", label: "1 hour" },
];

const ScheduleCreator = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateStart, setStartDate] = useState(new Date());
  const [dateEnd, setEndDate] = useState(new Date());
  dateStart.setHours(0, 0, 0, 0);
  dateEnd.setHours(0, 0, 0, 0);
  const [slotDuration, setSlotDuration] = useState("30");
  const [timeStart, setStartTime] = useState(new Date());
  const [timeEnd, setEndTime] = useState(new Date());
  const [scheduleObj, setScheduleObj] = useState();
  const history = useHistory();

  const handleSetDuration = (e) => {
    setSlotDuration(e);
  };

  const routeChange = (route) => {
    let path = `${route}`;
    history.push(path);
  };

  const handleCreateSchedule = (e) => {
    e.preventDefault();
    if (title === "") {
      alert("Please set a title!");
      return;
    }
    const newScheduleObj = {
      author: "602f67abbad7387464244968",
      event_type: "interview",
      title: title,
      description: description,
      dateStart: dateStart,
      dateEnd: dateEnd,
      timeStart: timeStart,
      timeEnd: timeEnd,
      slotDuration: slotDuration,
    };
    createCalendar(newScheduleObj).then((res) => {
      setScheduleObj(res);
      routeChange(`new-schedule/${res._id}`);
    });
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
            <PrimaryButton
              icon={faPlus}
              onClick={(e) => handleCreateSchedule(e)}
            >
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
