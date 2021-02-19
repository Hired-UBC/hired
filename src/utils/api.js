import axios from "axios";

// ----------------------------------------
// --------- USER RELATED METHODS ---------

/* i.e if paramObj = {teamIDS: "1234"}
 * then the equivalent axios GET request is: axios.get(`api/users?teamIDs=1234`)
 * This should get all users that have a teamIDs value of 1234
 */
export function getAllUsers(paramObj) {
  return axios
    .get(`api/users`, { params: paramObj })
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
    .get(`api/users/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}

export function deleteUserByID(id) {
  return axios
    .delete(`api/users/${id}`)
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

export function createCalendar(calendarObj) {
  return axios
    .post(`/api/calendars`, calendarObj)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}
