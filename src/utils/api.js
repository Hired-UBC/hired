import axios from "axios";

export function getAllUsers() {
  return axios
    .get(`api/users`)
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

export function createCalendar(calendarObj) {
  return axios
    .post(`/api/calendars`, calendarObj)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

// // METHODS TO COMPLETE
// export function updateCalendar() {}
// export function updateCalendar() {}
