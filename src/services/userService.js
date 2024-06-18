import axios from "axios";
import CookieService from "./cookieService";
import LocalStorageService from "./localStorageService";

const BASE_URL = "http://localhost:8080/v1.0/authentication";

const getUserData = () => {
  return axios.get(BASE_URL + "/user", {
    headers : CookieService.getCookie()
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    })
};

const saveUserData = (userData) => {
  return axios.put(BASE_URL + "/user", userData, {
    headers : CookieService.getCookie()
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    })
};

const findUserToInvite = (userEmail) => {
  let companyId = LocalStorageService.getCurrentCompany();
  return axios.post(BASE_URL + `/company-member/${userEmail}`, companyId, {
    headers : CookieService.getCookie()
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    })
};

const UserService = {
  getUserData,
  saveUserData,
  findUserToInvite
};

export default UserService;