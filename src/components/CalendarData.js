import React, { useEffect, useState } from "react";
import { getAllCalendars, getCalendarByID, getUserByID } from "../utils/api";
import CalendarGrid from "./CalendarGrid";

function CalendarData({ scheduleObj }) {
  const {
    author,
    event_type,
    title,
    description,
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    slotDuration,
    assignees,
    _id,
  } = scheduleObj;
  const calendarId = window.location.pathname.split("/").pop();
  const [calendarObj, setCalendarObj] = useState();
  const [transformedCalendarObj, setTransformedCalendarObj] = useState();
  const dateStartObj = new Date(dateStart);
  const dateEndObj = new Date(dateEnd);
  const dateDiff = dateEndObj - dateStartObj;
  //console.log(dateDiff);
  const timeStartParsed = new Date(timeStart);
  const timeEndParsed = new Date(timeEnd);
  const startHour = timeStartParsed.getHours();
  const finalHour = timeEndParsed.getHours();
  const startMin = 0;
  const finalMin = 0;
  var dayDiff = 1 + dateDiff / (24 * 60 * 60 * 1000);
  var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let startSplit = dateStartObj.toString();
  startSplit = startSplit.split(" ");
  let finalSplit = dateEndObj.toString();
  finalSplit = finalSplit.split(" ");
  const startIndex = days.indexOf(startSplit[0]);

  useEffect(() => {
    getCalendarByID(calendarId).then((res) =>
      console.log("----printing my STUFF", res)
    );
  }, []);

  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  //calculation functions
  function makeArrays(initialDate, dateEnd) {
    var arrayDays = new Array();
    var arrayDates = new Array();
    var arrayMonths = new Array();
    var arrayYears = new Array();
    let cDate = initialDate;
    while (cDate <= dateEnd) {
      let temp = new Date(cDate);
      temp = temp.toString();
      temp = temp.split(" ");
      arrayDays.push(temp[0]);
      arrayDates.push(temp[2]);
      arrayMonths.push(temp[1]);
      arrayYears.push(temp[3]);
      cDate = cDate.addDays(1);
    }

    return [arrayDays, arrayDates, arrayMonths, arrayYears];
  }

  function getTimeArray(initialHour, initialMin, finalHour, finalMin, length) {
    var startTime = Number(initialHour) * 60 + Number(initialMin);
    var finalTime = Number(finalHour) * 60 + Number(finalMin);
    var timeInterval = Number(length);
    var time = startTime;
    var arrayTime = new Array();
    var arrayInterviewer = new Array();
    var arrayInterviewee = new Array();

    for (time; time <= finalTime; time += timeInterval) {
      let hour = Math.floor(time / 60);
      let min = time % 60;
      if (min == 0) {
        min = "00";
      }
      arrayTime.push(hour.toString() + ":" + min.toString());
      arrayInterviewer.push(null);
      arrayInterviewee.push({ name: null, email: null });
    }
    //console.log(`arrayTime:${arrayTime}`);
    return [arrayTime, arrayInterviewer, arrayInterviewee];
  }

  function weekNum(days) {
    if (days <= 7) {
      var weekNumber = 1;
    } else {
      weekNumber = Math.ceil(days / 7);
    }
    return weekNumber;
  }

  //get interviewer name
  // var interviewer;
  // getUserByID(author).then((res) => {
  //   interviewer = res;
  // });

  //get arrays & variables
  var numberOfWeeks = weekNum(dayDiff);
  var array1 = makeArrays(dateStartObj, dateEndObj);
  var array2 = getTimeArray(
    startHour,
    startMin,
    finalHour,
    finalMin,
    slotDuration
  );
  var daysArray = array1[0];
  var datesArray = array1[1];
  var monthsArray = array1[2];
  var yearsArray = array1[3];
  var timeArray = array2[0];
  var interviewerArray = array2[1];
  var intervieweeArray = array2[2];

  var combinedObject = new Array();

  for (let i = 0; i < dayDiff; i++) {
    let temp = {};
    temp.date = datesArray[i];
    temp.day = daysArray[i];
    temp.month = monthsArray[i];
    temp.year = yearsArray[i];
    temp.timeData = [];
    for (let j = 0; j < timeArray.length; j++) {
      temp.timeData.push({
        time: timeArray[j],
        interviewer: interviewerArray[j],
        interviewee: intervieweeArray[j],
      });
    }
    combinedObject[i] = temp;
  }

  return (
    <CalendarGrid
      weeks={numberOfWeeks}
      data={combinedObject}
      // interviewer={interviewer}
    />
  );
}
export default CalendarData;

CalendarData.defaultProps = {
  startDate: new Date(),
  dateEnd: new Date(),
  dateDiff: 0,
  startHour: 10,
  startMin: 0,
  finalHour: 16,
  finalMin: 0,
};
