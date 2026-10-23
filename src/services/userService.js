import axios from "axios";
import CookieService from "./cookieService";
import LocalStorageService from "./localStorageService";
import ApiService from "./apiService";

const BASE_URL = ApiService.buildApiUrl("/api/v1.0/authentication");

const getUserData = () => {
  return axios.get(BASE_URL + "/user", {
    headers : CookieService.getAccessToken()
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
    headers : CookieService.getAccessToken()
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
    headers : CookieService.getAccessToken()
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    })
};

const sendResetLink = (userData) => {
  // TODO: all swallowing statuses (not errors, e.g. response with status 401, 403, 504) need to be handled properly
  return axios.post(BASE_URL + "/send-email-to-reset-password", userData)
    .then((response) => {
      if (response.status === 200) {
        return response;
      }
    })
    .catch((error) => {
      return error.response.data;
    })
};

const resetPassword = (verificationCode, authenticationRequest) => {
  return axios.post(BASE_URL + `/reset-password/${verificationCode}`, authenticationRequest)
    .then((response) => {
      if (response.status === 200) {
        return response;
      }
    })
    .catch((error) => {
      return error.response.data;
    })
};

const UserService = {
  getUserData,
  saveUserData,
  findUserToInvite,
  sendResetLink,
  resetPassword
};

export default UserService;