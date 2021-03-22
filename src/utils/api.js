import axios from "axios";
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
      console.log(res);
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
      console.log(res);
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
export function deleteUserByID(id) {
  return axios
    .delete(`/api/users/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}

export function updateUserByID(id, userObj) {
  return axios
    .post(`/api/users/${id}`, userObj)
    .then((res) => res.data)
    .catch((err) => console.log(err));
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
      return getCalendarByID(id);
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
        console.log(teamObj);
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
export function deleteTeamByID(id) {
  return getTeamByID(id)
    .then((team) => {
      const calendarsInTeam = team.data.calendars;
      return axios
        .delete(`/api/teams/${id}`)
        .then((res0) => {
          calendarsInTeam.forEach((calendarID) => {
            deleteCalendarByID(calendarID)
              .then((res) => {
                console.log(res0);
              })
              .catch((err) => console.log(err));
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

export function addUserToTeam(teamCode, uid) {
  return getAllTeams({ teamCode: teamCode })
    .then((res) => {
      var usersArray = res.data[0].users;
      if (!usersArray.includes(uid)) {
        usersArray.push(uid);
        var users = { users: usersArray };
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
      console.log(res);
      return res;
    })
    .catch((err) => console.log(err));
}
