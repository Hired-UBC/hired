import React, { useState, useEffect } from "react";
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
  NumericalInput,
} from "./SharedComponents";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import InterviewerCalendar from "./InterviewerCalendar";
import { createCalendar, addNewSlot, getTeamByID, updateTeamByID } from "../utils/api";
import { useHistory } from "react-router-dom";

const durationOptions = [
  { value: "15", label: "15 mins" },
  { value: "30", label: "30 mins" },
  { value: "45", label: "45 mins" },
  { value: "60", label: "1 hour" },
];

const ScheduleCreator = ({ user }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateStart, setStartDate] = useState(new Date());
  const [dateEnd, setEndDate] = useState(new Date());
  dateStart.setHours(0, 0, 0, 0);
  dateEnd.setHours(0, 0, 0, 0);
  const [slotDuration, setSlotDuration] = useState("30");
  const [timeStart, setStartTime] = useState(new Date());
  const [timeEnd, setEndTime] = useState(new Date());
  timeStart.setHours(8, 0, 0, 0);
  timeEnd.setHours(20, 0, 0, 0);
  const [scheduleObj, setScheduleObj] = useState();
  const [numAssignees, setNumAssigness] = useState(1);
  const [teamObj, setTeamObj] = useState();
  const history = useHistory();
  const teamId = window.location.pathname.split("/").pop();

  const handleSetDuration = (e) => {
    setSlotDuration(e);
  };

  const generateSlots = () => {
    var numDays = 1 + (dateEnd - dateStart) / (24 * 60 * 60 * 1000);
    var startTimeInMinutes = timeStart.getHours() * 60 + timeStart.getMinutes();
    var endTimeInMinutes = timeEnd.getHours() * 60 + timeEnd.getMinutes();
    var numSlots = (endTimeInMinutes - startTimeInMinutes) / slotDuration;

    var allSlots = new Array();

    for (let i = 0; i < numDays; i++) {
      var currentDate = new Date(dateStart).setDate(dateStart.getDate() + i);

      var slots = new Array();
      console.log(startTimeInMinutes);
      console.log(endTimeInMinutes);
      for (let k = 0; k <= numSlots; k++) {
        var kHour = Math.floor((startTimeInMinutes + k * slotDuration) / 60);
        var kMin = (startTimeInMinutes + k * slotDuration) % 60;
        var slotTime = new Date(currentDate).setHours(kHour, kMin);

        console.log(kHour + "  " + kMin);
        const currentTimeSlot = {
          time: new Date(slotTime),
          interviewees: [],
          intervieweeEmails: [],
          interviewers: [],
        };
        slots.push(currentTimeSlot);
      }

      const slotsInCurrentDay = {
        date: currentDate,
        timeSlots: slots,
      };

      console.log(slotsInCurrentDay);
      allSlots[i] = slotsInCurrentDay;
    }

    return allSlots;
  };

  useEffect(() => {
    console.log(teamId);
    getTeamByID(teamId).then((res) => {
      setTeamObj(res.data);
      console.log(teamObj);
    });
  }, []);

  const handleCreateSchedule = (e) => {
    e.preventDefault();
    if (slotDuration.length === 0 || title.length === 0 || description.length === 0) {
      alert("Not all fields are filled out");
      return;
    }

    // TODO - Need to add team attribute to this object
    const newScheduleObj = {
      author: user._id,
      event_type: "interview",
      title: title,
      description: description,
      numAssignees: numAssignees,
      dateStart: dateStart,
      dateEnd: dateEnd,
      timeStart: timeStart,
      timeEnd: timeEnd,
      slotDuration: slotDuration,
      slotsInDay: generateSlots(),
    };
    createCalendar(newScheduleObj).then((res) => {
      teamObj.calendars.push(res._id);
      updateTeamByID(teamObj._id, teamObj).then((res) => {
        setTeamObj(res);
        console.log(res);
      });
      console.log(res);
      setScheduleObj(res);
      history.push(`/calendar/${res._id}`);
    });
  };

  return (
    <OuterContainer>
      <MainContent>
        {!scheduleObj && (
          <form style={{ maxWidth: "300px" }}>
            <TitleInput
              placeholder='Untitled Event'
              onChange={(e) => setTitle(e.target.value)}></TitleInput>
            <LongInput
              placeholder='Event description'
              onChange={(e) => setDescription(e.target.value)}></LongInput>
            <NumericalInput
              onChange={(e) => setNumAssigness(e.target.value)}
              updateValue={setNumAssigness}
              value={numAssignees}
              label='Interviewers per slot'>
              {"Hey"}
            </NumericalInput>
            <DateRangePicker
              label='Date Range'
              startDate={dateStart}
              endDate={dateEnd}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
            <TimeRangePicker
              label='Daily Time Range'
              startTime={timeStart}
              endTime={timeEnd}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
            />
            <StyledSelectDropdown
              onSelect={handleSetDuration}
              label='Slot Duration'
              options={durationOptions}
            />
            <PrimaryButton icon={faPlus} onClick={(e) => handleCreateSchedule(e)}>
              Create Schedule
            </PrimaryButton>
          </form>
        )}
      </MainContent>
    </OuterContainer>
  );
};

export default ScheduleCreator;
