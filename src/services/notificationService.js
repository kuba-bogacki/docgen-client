import axios from "axios";
import CookieService from "./cookieService";
import {useStompClient} from "react-stomp-hooks";

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

const NotificationService = {
  sendInvitation,
  sendMembershipPetition
};

export default NotificationService;