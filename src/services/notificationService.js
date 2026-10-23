import axios from "axios";
import CookieService from "./cookieService";
import ApiService from "./apiService";

const BASE_URL = ApiService.buildApiUrl("/api/v1.0/notification");

const sendInvitation = (data) => {
  return axios.post(BASE_URL + "/invite", data, {
    headers : CookieService.getAccessToken()
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    })
};

const sendMembershipPetition = (data) => {
  return axios.post(BASE_URL + "/membership-petition", data, {
    headers : CookieService.getAccessToken()
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    })
};

const getUserNotification = () => {
  return axios.get(BASE_URL + "/get-user-notifications", {
    headers : CookieService.getAccessToken()
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    })
};

const NotificationService = {
  sendInvitation,
  sendMembershipPetition,
  getUserNotification
};

export default NotificationService;