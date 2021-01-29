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

export function findUserByEmail(email) {
  return axios
    .get('api/users')
    .then((res) => {
      this.props.res
        .forEach(user => {
          if (user===email) {
            return user;
          }
        })    
    })
    .catch((err) => console.log(err));
}
