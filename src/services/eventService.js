import axios from "axios";
import CookieService from "./cookieService";
import LocalStorageService from "./localStorageService";
import ApiService from "./apiService";

const BASE_URL = ApiService.buildApiUrl("/api/v1.0/event");

const getCompanyEventsByDate = (date) => {
  let companyId = LocalStorageService.getCurrentCompany();
  return axios.get(BASE_URL + `/get/${companyId}/${date}`, {
    headers : CookieService.getAccessToken()
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    })
};

const getAllCompanyEvents = () => {
  let companyId = LocalStorageService.getCurrentCompany();
  return axios.get(BASE_URL + `/get-all/${companyId}`, {
    headers : CookieService.getAccessToken()
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    })
};

const saveNewEvent = (eventData) => {
  return axios.post(BASE_URL + `/create`, eventData, {
    headers : CookieService.getAccessToken()
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    })
};

const deleteEvent = (eventId) => {
  return axios.delete(BASE_URL + `/delete/${eventId}`, {
    headers : CookieService.getAccessToken()
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    })
};

const EventService = {
  getCompanyEventsByDate,
  getAllCompanyEvents,
  saveNewEvent,
  deleteEvent
};

export default EventService;