import React, { useState } from "react";
import {
  OuterContainer,
  MainContent,
  InputField,
  LongInput,
  TitleInput,
  PrimaryButton,
  DateRangePicker,
} from "./SharedComponents";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./date-picker.css";

const ScheduleCreator = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <OuterContainer>
      <MainContent>
        <form>
          <TitleInput placeholder="Untitled Event"></TitleInput>
          <LongInput placeholder="Event description"></LongInput>
          <InputField label="Label" placeholder="Placeholder" />
          <DateRangePicker
            label="Dates"
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
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
