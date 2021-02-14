import React, { useState, useEffect } from "react";
import CalendarButton from "./CalendarButton.js";
import Calendar from "react-calendar";
import * as GrIcons from "react-icons/gr";
import { ContactMailOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

//Styled Components
const GridContainer = styled.div`
  margin-top: 5%;
  margin-left: 5%;
  max-width: 70%;
  max-height: 700px;
  gap: 0;
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, calc(100% / 7));
  grid-template-rows: 20px, 15px;
  grid-auto-rows: 1fr;
`;

const ClickableIcon = styled(FontAwesomeIcon)`
  font-size: 1.3rem;
  cursor: pointer;
  padding: 10px;
  border-radius: 100%;
  transition: all 250ms;
  :hover {
    background: #f3f3f3;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  height: 4em;
  display: flex;
  align-items: center;
`;

const StyledDates = styled.div`
  font-size: 2em;
  font: open-sans;
  font-weight: 500;
  color: #4f4f4f;
  text-align: center;
  vertical-align: center;
  align-items: center;
  justify-contents: center;
  margin: 0 0 -1px -1px;
  border-left: solid 1px #e0e0e0;
  border-right: solid 1px #e0e0e0;
  border-bottom: solid 1px #e0e0e0;
`;

const StyledWeek = styled.h3`
  font: open-sans;
  backgound-color: blue;
  font-size: 1.5rem;
  display: flex;
  text-align: center;
  vertical-align: center;
  margin-top 5%;
  margin-left 5%;
  display: flex;
  align-items: center;
`;

const StyledYear = styled.h3`
  font-weight: 0.8em;
  text-align: center;
  vertical-align: center;
  font-size: 1.5rem;
  margin: 0;
  font: sans-serif;
`;

const StyledDays = styled.div`
  color: #4f4f4f;
  font-size: 1em;
  font: sans-serif;
  text-align: center;
  vertical-align: center;
  align-items: center;
  justify-contents: center;
`;

const StyledBox = styled.div`
  text-align: center;
  vertical-align: center;
  font-size: 1em;
  width: 100%;
  height: 70%;
`;
/*
//const

function CalendarGrid(props) {
  var dayDiff = 1 + props.dateDiff / (24 * 60 * 60 * 1000);
  var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let startSplit = props.startDate.toString();
  startSplit = startSplit.split(" ");
  let finalSplit = props.finalDate.toString();
  finalSplit = finalSplit.split(" ");
  const startIndex = days.indexOf(startSplit[0]);
  //const finalIndex = days.indexOf(finalSplit[0]);

  console.log(`day diff: ${dayDiff}`);

  var start = {
    year: startSplit[3],
    month: startSplit[1],
    day: startSplit[2],
    dayName: startSplit[0],
    startDayIndex: startIndex,
  };
  console.log(start.startDayIndex);
  var final = {
    year: finalSplit[3],
    month: finalSplit[1],
    day: finalSplit[2],
    dayName: finalSplit[0],
  };

  //calculations for loops
  if (7 - start.startDayIndex < dayDiff) {
    var numberOfWeeks = 1 + (dayDiff - 7) / 7;
    //var numberOfWeeks = 1 + (dayDiff - 7 + start.startDayIndex) / 7;
    numberOfWeeks = Math.ceil(numberOfWeeks);
  } else {
    var numberOfWeeks = 1;
  }

  var weekNumber = [];
  for (let i = 1; i <= numberOfWeeks; i++) {
    weekNumber.push(i);
  }
  console.log(`number of weeks: ${numberOfWeeks}`);

  //making time array
  const startHour = Number(props.startHour);
  const startMin = Number(props.startMin);
  const startTime = startHour * 60 + startMin;
  const finalHour = Number(props.finalHour);
  const finalMin = Number(props.finalMin);
  const finalTime = finalHour * 60 + finalMin;
  const timeInterval = Number(props.duration);
  var time = startTime;
  const timeArray = [];

  for (time; time <= finalTime; time += timeInterval) {
    let hour = Math.floor(time / 60);
    let min = time % 60;
    if (min == 0) {
      min = "00";
    }
    for (let i = 0; i < dayDiff; i++) {
      timeArray.push(hour.toString() + ":" + min.toString());
    }
  }

  //making days array
  const daysArray = [];
  let startDateData = props.startDate;
  let finalDateData = props.finalDate;

  for (let i = start.startDayIndex; i < dayDiff + start.startDayIndex; i++) {
    daysArray.push(days[i % 7]);
  }

  //makind dates array
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      let cashe = new Date(currentDate);
      cashe = currentDate.toString();
      cashe = cashe.split(" ");
      dateArray.push(cashe[2]);
      currentDate = currentDate.addDays(1);
    }
    return dateArray;
  }

  const datesArray = getDates(startDateData, finalDateData);

  console.log(`wtf?${props.startDate}`);
  console.log(`month:${start.month}`);
  console.log(`days:${daysArray}`);
  console.log(`dates:${datesArray}`);

  //makind months array
  function getMonths(startDate, stopDate) {
    var monthArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      let cashe = new Date(currentDate);
      cashe = currentDate.toString();
      cashe = cashe.split(" ");
      monthArray.push(cashe[1]);
      currentDate = currentDate.addDays(1);
    }
  }

  const monthsArray = getDates(startDateData, finalDateData);

  //conbined Object
  let combinedObject = [];

  for (let i = 0; i < datesArray.length; i++) {
    let object = {
      month: monthsArray[i],
      date: datesArray[i],
      day: daysArray[i],
      time: timeArray,
    };
    combinedObject.push(object);
  }
  console.log(`times:${combinedObject[0].time}`);
*/

function CalendarGrid(props) {
  const numberOfWeeks = props.weeks;
  // const datesArray = props.datesArray;
  // const daysArray = props.daysArray;
  // const monthsArray = props.monthsArray;
  // const yearsArray = props.yearsArray;
  // const timeArray = props.timeArray;
  // var clickedArray = props.clickArray;
  var displayArray = props.data;

  // for (let i = 0; i < datesArray.length; i++) {
  //   let temp = {};
  //   temp.date = datesArray[i];
  //   temp.day = daysArray[i];
  //   temp.month = monthsArray[i];
  //   temp.year = yearsArray[i];
  //   temp.time = {};
  //   temp.time = timeArray;
  //   temp.clicked = clickedArray;
  //   displayArray[i] = temp;
  // }
  // console.log("displayArray:");
  // console.log(displayArray);

  //const clickedArray = props.data[0].clicked;

  //console.log(combinedObject);

  // for (let items in combinedObject) {
  //   let temp = items.slice("-");
  //   yearsArray.push(temp[0]);
  //   monthsArray.push(temp[1]);
  //   datesArray.push(temp[2]);
  //   daysArray.push(temp[3]);
  // }

  // console.log(yearsArray);
  // console.log(monthsArray);
  // console.log(datesArray);
  // console.log(daysArray);
  //States
  //const [stateDate, setStateDate] = useState(0);

  useEffect(() => {
    setStateDates(displayArray.slice(0, 7));
    setStateWeeks(props.weeks);
  }, [displayArray]);

  const [stateWeeks, setStateWeeks] = useState(0);
  // const [stateDates, setStateDates] = useState(datesArray.slice(0, 7));
  // const [stateDays, setStateDays] = useState(daysArray.slice(0, 7));
  // const [stateTime, setStateTime] = useState(timeArray);
  const [stateDates, setStateDates] = useState(props.data.slice(0, 7));
  // const [stateClicked, setStateClicked] = useState(clickedArray);
  // const [isHover, setHover] = useState(false);
  console.log("stateDates:");
  console.log(stateDates);
  console.log("stateWeeks:");
  console.log(stateWeeks);
  console.log("displayArray:");
  console.log(displayArray);
  const increaseWeek = () => {
    setStateWeeks((stateWeeks + 1) % numberOfWeeks);
    setStateDates(
      displayArray.slice(
        7 * ((stateWeeks + 1) % numberOfWeeks),
        7 * ((stateWeeks + 1) % numberOfWeeks) + 7
      )
    );
    // setStateDays(
    //   daysArray.slice(
    //     7 * ((stateWeeks + 1) % numberOfWeeks),
    //     7 * ((stateWeeks + 1) % numberOfWeeks) + 7
    //   )
    // );
  };
  const decreaseWeek = () => {
    setStateWeeks((stateWeeks + numberOfWeeks - 1) % numberOfWeeks);
    setStateDates(
      displayArray.slice(
        7 * ((stateWeeks + numberOfWeeks - 1) % numberOfWeeks),
        7 * ((stateWeeks + numberOfWeeks - 1) % numberOfWeeks) + 7
      )
    );
    // setStateDays(
    //   daysArray.slice(
    //     7 * ((stateWeeks + numberOfWeeks - 1) % numberOfWeeks),
    //     7 * ((stateWeeks + numberOfWeeks - 1) % numberOfWeeks) + 7
    //   )
    // );
  };

  // const makeHover = () => {
  //   setHover(true);
  // };

  // const makeNotHover = () => {
  //   setHover(false);
  // };

  const makeClicked = (index, i) => {
    // stateDates[index].timeClicked[i].clicked.set(
    //   !stateDates[index].timeClicked[i].clicked
    // );
    // console.log(
    //   `bitch:${
    //     displayArray[7 * (stateWeeks - 1) + index].timeClicked[i].clicked
    //   }`
    // );
    // displayArray[7 * (stateWeeks-1) + index].timeClicked[i].clicked = !displayArray[
    //   index
    // ].timeClicked[i].clicked;
  };

  return (
    <>
      <HeaderWrapper>
        <StyledWeek>
          <ClickableIcon onClick={decreaseWeek} icon={faArrowLeft} />
          <ClickableIcon onClick={increaseWeek} icon={faArrowRight} />
          <span style={{ margin: "0 15px" }}>
            Week {(stateWeeks % numberOfWeeks) + 1}
          </span>
          <StyledYear>
            {"  "} {stateDates[0].year} {stateDates[0].month}
          </StyledYear>
        </StyledWeek>
      </HeaderWrapper>
      <GridContainer columns={stateDates.length}>
        {stateDates.map((item, index) => {
          return (
            <FlexContainer>
              <StyledDays>{item.day}</StyledDays>
              <StyledDates>{item.date}</StyledDates>
              {item.timeClicked.map((subitem, i) => {
                return (
                  <div>
                    <StyledBox>
                      <CalendarButton
                        time={subitem.time}
                        clicked={subitem.clicked}
                        firstName="Han"
                      />
                    </StyledBox>
                  </div>
                );
              })}
            </FlexContainer>
          );
        })}
      </GridContainer>
    </>
  );

  // console.log(`state week: ${stateWeeks}`);
  // console.log(`statedates: ${stateDates}`);
  // console.log(`stateDays: ${stateDays}`);
  // return <HeaderWrapper>Hello</HeaderWrapper>;

  // return (
  //   <HeaderWrapper>
  //     <HeaderWrapper>
  //       <StyledWeek>
  //         <span>
  //           <GrIcons.GrFormPrevious size="1.5em" onClick={decreaseWeek} />
  //         </span>
  //         <span>Week {(stateWeeks % numberOfWeeks) + 1}</span>
  //         <span>
  //           <GrIcons.GrFormNext size="1.5em" onClick={increaseWeek} />
  //         </span>
  //         <StyledYear>
  //           {"  "} {yearsArray[0]}
  //         </StyledYear>
  //       </StyledWeek>
  //     </HeaderWrapper>
  //     <GridContainer columns={stateDates.length}>
  //       {stateDates.map((item, index) => {
  //         return (
  //           <StyledDates columns={stateDates.length}>
  //             <b>{item}</b>
  //           </StyledDates>
  //         );
  //       })}
  //       {stateDays.map((item, index) => {
  //         return <StyledDays>{item}</StyledDays>;
  //       })}

  //       {timeArray.map((item, index) => {
  //         return (
  //           <StyledBox>
  //             {" "}
  //             <CalendarButton time={item} firstName="han" />
  //           </StyledBox>
  //         );
  //       })}
  //     </GridContainer>
  //   </HeaderWrapper>
  // );
}

CalendarGrid.defaultProps = {
  startDate: new Date(),
  finalDate: new Date(),
  dateDiff: 0,
  startHour: 10,
  startMin: 0,
  finalHour: 16,
  finalMin: 0,
};

export default CalendarGrid;
