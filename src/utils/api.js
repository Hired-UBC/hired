import axios from "axios";
import { isThisHour } from "date-fns/esm";
import { generateRandomHex } from "./helpers";

// ----------------------------------------
// --------- USER RELATED METHODS ---------
// ----------------------------------------

/* i.e if paramObj = {teamIDS: "1234"}
 * then the equivalent axios GET request is: axios.get(`api/users?teamIDs=1234`)
 * This should get all users that have a teamIDs value of 1234
 */
export function getAllUsers(paramObj) {
  return axios
    .get(`/api/users`, { params: paramObj })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}

export function addNewUser(user) {
  return axios
    .post(`/api/users`, user)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export function getUserByID(id) {
  return axios
    .get(`/api/users/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}

export function getUsersByIDArray(idArray) {
  return axios
    .post(`/api/users/in`, idArray)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}

// TODO: delete user from the teams that they are in
// done but idk how to test because we never call this
export function deleteUserByID(id) {
  return getUserByID(id)
    .then((user) => {
      let teamIDs = user.data.teamIDs;
      teamIDs.forEach(teamID => {
        getTeamByID(teamID)
          .then((team) => {
            const idx = team.data.users.indexOf(id);
            team.data.users.splice(idx, 1);
            updateTeamByID(teamID, team.data)
              .then((res) => {})
          })
      })
      return axios
      .delete(`/api/users/${id}`)
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
    })
}

export function updateUserByID(id, userObj) {
  return axios
    .post(`/api/users/${id}`, userObj)
    .then((res) => {
      if (id === JSON.parse(localStorage.getItem("userObj"))._id) {
        localStorage.setItem("userObj", JSON.stringify(res.data));
      }
      return res.data;
    })
    .catch((err) => console.log(err));
}

export function deleteSlotsInCalendar(id) {
  return getCalendarByID(id)
    .then((cal) => {
      const users = cal.assignees;
      return getUsersByIDArray(users)
        .then((userObjs) => {
          return userObjs.data.forEach(user => {
            const toRemoveIdx = [];
            user.interviewIDs.forEach(function(event, idx) {
              if (event.calendarID === id) {
                toRemoveIdx.push(idx);
              }
            }, user.interviewIDs);
            toRemoveIdx.reverse();
            toRemoveIdx.forEach(idx => {
              user.interviewIDs.splice(idx, 1);
            })
            updateUserByID(user._id, user)
              .then((res) => {
            })
          })
        })
    })
}

export function updateUsersRemoveUpcomingEvent(eventToRemove, usersIDArray) {
  usersIDArray.forEach((userID => {
    return getUserByID(userID)
      .then((userObj) => {
        var idx = -1;
        userObj.data.interviewIDs.forEach(slot => {
          if (slot.slotID === eventToRemove.slotID) {
            idx = userObj.data.interviewIDs.indexOf(slot);
          }
        })
        if (idx !== -1) {
          userObj.data.interviewIDs.splice(idx, 1);
        }
        return updateUserByID(userObj.data._id, userObj.data)
          .then((res) => {
            return res;
          })
      })
  }))
}

export function updateUsersAddUpcomingEvent(upcomingEvent, usersIDArray) {
  return usersIDArray.forEach((userID => {
    return getUserByID(userID)
      .then((userObj) => {
        const listSlots = userObj.data.interviewIDs;
        const toAdd = new Date(upcomingEvent.date);

        if (listSlots.length === 0) {
          listSlots.push(upcomingEvent);
        } else if (toAdd.getTime() > new Date(listSlots[listSlots.length-1].date).getTime()) {
          listSlots.push(upcomingEvent);
        } else {
          for(let i = 0; i < listSlots.length; i++) {
            const compare = new Date(listSlots[i].date);
            if (toAdd.getTime() < compare.getTime()) {
              const before = listSlots.slice(0, i);
              before.push(upcomingEvent);
              const after = listSlots.slice(i, listSlots.length);
              userObj.data.interviewIDs = before.concat(after);
              break;
            } 
          }
        }
        
        return updateUserByID(userObj.data._id, userObj.data)
          .then((res) => {
            return res;
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }))
}

// --------------------------------------------
// --------- CALENDAR RELATED METHODS ---------
// --------------------------------------------

export function getAllCalendars(paramObj) {
  return axios
    .get(`/api/calendars`, { params: paramObj })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}

export function createCalendar(calendarObj) {
  return axios
    .post(`/api/calendars`, calendarObj)
    .then((res) => {
      const calendarID = res.data._id;
      return getTeamByID(res.data.teamID)
        .then((team) => {
          team.data.calendars.push(calendarID);
          return updateTeamByID(team.data._id, team.data)
            .then(() => {
              return res.data;
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

export function deleteCalendarByID(id) {
  return getCalendarByID(id)
    .then((calendar) => {
      const teamId = calendar.teamID;
      return deleteSlotsInCalendar(id)  
        .then((res0) => {
          return axios
          .delete(`/api/calendars/${id}`)
          .then((res) => {
            return getTeamByID(teamId)
              .then((team) => {
                if (team.data !== undefined && team.data !== null) {
                  const removeIndex = team.data.calendars.indexOf(id);
                  if (removeIndex > -1) {
                    team.data.calendars.splice(removeIndex, 1);
                  }
                  return updateTeamByID(team.data._id, team.data)
                    .then(() => {
                      return res;
                    })
                    .catch((err) => console.log(err));
                } else {
                  return res;
                }
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

export function getCalendarByID(id) {
  return axios
    .get(`/api/calendars/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.response);
      console.log(err.request);
      console.log(err.message);
    });
}

export function updateCalendarByID(id, calendarObj) {
  return axios
    .post(`/api/calendars/${id}`, calendarObj)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.response);
      console.log(err.request);
      console.log(err.message);
    });
}

export function getCalendarsByIDArray(idArray) {
  return axios
    .post(`/api/calendars/in`, idArray)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}

// --------------------------------------------
// --------- SLOTS RELATED METHODS ---------
// --------------------------------------------
export function getAllSlots(paramObj) {
  return axios
    .get(`/api/slots`, { params: paramObj })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}

export function addNewSlot(slotObj) {
  return axios
    .post(`/api/slots`, slotObj)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.response);
      console.log(err.request);
      console.log(err.message);
    });
}

export function getSlotByID(id) {
  return axios
    .get(`/api/slots/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}

export function deleteSlotByID(id) {
  return axios
    .delete(`/api/slots/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}

export function updateSlotByID(id, slotObj) {
  return axios
    .post(`/api/slots/${id}`, slotObj)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

// --------------------------------------------
// --------- TEAMS RELATED METHODS ---------
// --------------------------------------------

export function getAllTeams(paramObj) {
  return axios
    .get(`/api/teams`, { params: paramObj })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}

export function createTeam(teamObj) {
  const checkValidity = (code) => {
    return getAllTeams({ teamCode: code }).then((res) => {
      if (res.data.length === 0) {
        console.log("A code that works: ", code);
        teamObj.teamCode = code;
        return axios
          .post(`/api/teams`, teamObj)
          .then((res) => res.data)
          .catch((err) => console.log(err));
      } else {
        console.log("Doesn't work");
        checkValidity(generateRandomHex(8));
      }
    });
  };

  return checkValidity(generateRandomHex(8));
}

export function getTeamByID(id) {
  return axios
    .get(`/api/teams/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}

export function updateTeamByID(id, teamObj) {
  return axios
    .post(`/api/teams/${id}`, teamObj)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

// Deletes all corresponding calendars when team gets deleted
// TODO: delete TeamID from related userObj
// done but still needs to be tested
export function deleteTeamByID(id) {
  return getTeamByID(id)
    .then((team) => {
      const calendarsInTeam = team.data.calendars;
      const assigneesInTeam = team.data.assignees;
      const teamID = team._id;
      return axios
        .delete(`/api/teams/${id}`)
        .then((res0) => {
          calendarsInTeam.forEach((calendarID) => {
            deleteCalendarByID(calendarID)
              .then((res) => {
              })
              .catch((err) => console.log(err));
          });
          getUsersByIDArray(assigneesInTeam).then((res1) => {
            const toDelete = res1.data;
            toDelete.forEach(userObj => {
              const idx = userObj.teamIDs.indexOf(teamID);
              if (idx !== -1) {
                userObj.teamIDs.splice(idx, 1);
                updateUserByID(userObj._id, userObj);
              }
            })
          })
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

// updates userObj to include teamObj._id to teamIDs
export function addUserToTeam(teamCode, uid) {
  return getAllTeams({ teamCode: teamCode })
    .then((res) => {
      var usersArray = res.data[0].users;
      if (!usersArray.includes(uid)) {
        usersArray.push(uid);
        var users = { users: usersArray };
        getUserByID(uid).then((res0) => {
          res0.data.teamIDs.push(res.data[0]._id);
          updateUserByID(uid, res0.data).then(() => {})
        })
        return updateTeamByID(res.data[0]._id, { users: usersArray })
          .then((res) => {
            return res;
          })
          .catch((err) => console.log(err));
      } else {
        // TODO - Return an actual error code, not just a number LOL
        return 409;
      }
    })
    .catch((err) => console.log(err));
}

export function getUserTeamsByID(id) {
  return axios
    .post(`/api/teams/by-user/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}
