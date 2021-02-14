import { AlternateEmailTwoTone } from "@material-ui/icons";
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

<<<<<<< HEAD
export function findUserByEmail(email) {
  return axios
    .get('api/users')
    .then((res) => {
      this.props.res
        .forEach(user => {
          if (user.email===email) {
            return user;
          }
        })
        return null;    
    })
    .catch((err) => console.log(err));
}
=======
export function createCalendar(calendarObj) {
  return axios
    .post(`/api/calendars`, calendarObj)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

// // METHODS TO COMPLETE
// export function updateCalendar() {}
// export function updateCalendar() {}
>>>>>>> c997627b2f482999b8009db544fcb99799bd5981
