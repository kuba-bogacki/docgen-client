import axios from "axios";
import CookieService from "./cookieService";
import {useStompClient} from "react-stomp-hooks";
import LocalStorageService from "./localStorageService";

const BASE_URL = "http://localhost:8080/v1.0/notification";

const sendInvitation = (data) => {
  return axios.post(BASE_URL + "/invite", data, {
    headers : CookieService.getCookie()
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
    headers : CookieService.getCookie()
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
    headers : CookieService.getCookie()
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