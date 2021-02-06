import React from "react";
import CalendarGrid from "./Calendar";

function CalendarData(props) {
  var dayDiff = 1 + props.dateDiff / (24 * 60 * 60 * 1000);
  var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let startSplit = props.startDate.toString();
  startSplit = startSplit.split(" ");
  let finalSplit = props.finalDate.toString();
  finalSplit = finalSplit.split(" ");
  const startIndex = days.indexOf(startSplit[0]);

  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  //calculation functions
  function makeArrays(initialDate, finalDate) {
    var arrayDays = new Array();
    var arrayDates = new Array();
    var arrayMonths = new Array();
    var arrayYears = new Array();
    let cDate = initialDate;
    while (cDate <= finalDate) {
      let temp = new Date(cDate);
      temp = temp.toString();
      temp = temp.split(" ");
      arrayDays.push(temp[0]);
      arrayDates.push(temp[2]);
      arrayMonths.push(temp[1]);
      arrayYears.push(temp[3]);
      cDate = cDate.addDays(1);
    }
    // for (let cDate = initialDate; cDate <= finalDate; cDate.addDays(1)) {
    //   let temp = cDate.toString();
    //   temp = temp.split(" ");
    //   arrayDays.push(temp[0]);
    //   arrayDates.push(temp[2]);
    //   arrayMonths.push(temp[1]);
    //   arrayYears.push(temp[3]);
    // }
    return [arrayDays, arrayDates, arrayMonths, arrayYears];
  }

  function getTimeArray(initialHour, initialMin, finalHour, finalMin, length) {
    var startTime = Number(initialHour) * 60 + Number(initialMin);
    var finalTime = Number(finalHour) * 60 + Number(finalMin);
    var timeInterval = Number(length);
    var time = startTime;
    var arrayTime = new Array();
    var arrayClick = new Array();

    for (time; time <= finalTime; time += timeInterval) {
      let hour = Math.floor(time / 60);
      let min = time % 60;
      if (min == 0) {
        min = "00";
      }
      arrayTime.push(hour.toString() + ":" + min.toString());
      arrayClick.push(false);
    }
    console.log(`arrayTime:${arrayTime}`);
    return [arrayTime, arrayClick];
  }

  function weekNum(days) {
    if (days <= 7) {
      var weekNumber = 1;
    } else {
      weekNumber = Math.ceil(days / 7);
    }
    return weekNumber;
  }

  //get arrays & variables
  var numberOfWeeks = weekNum(dayDiff);
  var array1 = makeArrays(props.startDate, props.finalDate);
  var array2 = getTimeArray(
    props.startHour,
    props.startMin,
    props.finalHour,
    props.finalMin,
    props.duration
  );
  var daysArray = array1[0];
  var datesArray = array1[1];
  var monthsArray = array1[2];
  var yearsArray = array1[3];
  var timeArray = array2[0];
  var clickArray = array2[1];

  //print those bitches
  //   console.log(array1[0]);
  //   console.log(array1[1]);
  //   console.log(array1[2]);
  //   console.log(array1[3]);
  //   console.log(daysArray[0]);
  //   console.log(datesArray);
  //   console.log(monthsArray);
  //   console.log(yearsArray);

  //create combined object
  //   function makeObject(days, dates, months, years) {
  //     for (let i = 0; (i = dayDiff); i++) {
  //       var tempYears = years[i];
  //       var tempMonths = months[i];
  //       var tempDates = dates[i];
  //       var tempDays = days[i];
  //       var temporary =
  //         tempYears + "-" + tempMonths + "-" + tempDates + "-" + tempDays;
  //       temporary = temporary.toString();
  //       var object = {};
  //       object = {
  //         [temporary]: { time: timeArray, clicked: clickArray },
  //       };
  //     }
  //     return object;
  //   }

  var combinedObject = new Array();

  for (let i = 0; i < dayDiff; i++) {
    let temp = {};
    temp.date = datesArray[i];
    temp.day = daysArray[i];
    temp.month = monthsArray[i];
    temp.year = yearsArray[i];
    temp.time = {};
    temp.time = timeArray;
    temp.clicked = clickArray;
    combinedObject[i] = temp;

    // var temp =
    //   yearsArray[i] +
    //   "-" +
    //   monthsArray[i] +
    //   "-" +
    //   datesArray[i] +
    //   "-" +
    //   daysArray[i];

    // var tempYears = yearsArray[i];
    // tempYears = tempYears.toString();
    // var tempMonths = monthsArray[i];
    // tempMonths = tempMonths.toString();
    // var tempDates = datesArray[i];
    // tempDates = tempDates.toString();
    // var tempDays = daysArray[i];
    // tempDays = tempDays.toString();
    // var temp = tempYears + "-" + tempMonths + "-" + tempDates + "-" + tempDays;

    // var tempYears = yearsArray[i];
    // var tempMonths = monthsArray[i];
    // var tempDates = datesArray[i];
    // var tempDays = daysArray[i];
    // var temporary =
    //   tempYears + "-" + tempMonths + "-" + tempDates + "-" + tempDays;
    // //temp = temp.toString();

    // console.log(temporary);
    // console.log(combinedObject);
  }
  //   combinedObject = makeObject(daysArray, datesArray, monthsArray, yearsArray);
  console.log("combinedObject:");
  console.log(combinedObject);

  return (
    <CalendarGrid
      weeks={numberOfWeeks}
      data={combinedObject}
      // daysArray={daysArray}
      // datesArray={datesArray}
      // monthsArray={monthsArray}
      // yearsArray={yearsArray}
      // timeArray={timeArray}
      // clickArray={clickArray}
    />
  );
}
export default CalendarData;

CalendarData.defaultProps = {
  startDate: new Date(),
  finalDate: new Date(),
  dateDiff: 0,
  startHour: 10,
  startMin: 0,
  finalHour: 16,
  finalMin: 0,
};
