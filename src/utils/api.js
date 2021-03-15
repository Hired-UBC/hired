import axios from "axios";

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
      return res;
    })
    .catch((err) => console.log(err));
}

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
    .then((res) => res.data)
    .catch((err) => console.log(err)
  );
}


export function deleteCalendarByID(id) {
  return axios
    .delete(`/api/calendars/${id}`)
    .then((res) => {
      return res;
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
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err.response);
      console.log(err.request);
      console.log(err.message);
    });
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
