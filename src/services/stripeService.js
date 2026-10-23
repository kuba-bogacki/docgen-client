import axios from "axios";
import CookieService from "./cookieService";
import ApiService from "./apiService";

const publicKey = "pk_test_51M5vFXInCCqlMcYIbxZSd7LiGoISWfJGCkvmABnaGcX4k31miShkqxQYUanq9VTlSM5Id4Z9H753NYJxtlTnuZV000fsmfDZXb";
const BASE_URL = ApiService.buildApiUrl("/api/v1.0/authentication");

const createStripePaymentSession = (paymentDto) => {
  return axios.post(BASE_URL + "/create-payment", paymentDto, {
    headers : CookieService.getAccessToken()
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error.response.data);
    })
};

const cancelStripePaymentSession = (paymentIntentId) => {
  return axios.delete(BASE_URL + `/cancel-payment/${paymentIntentId}`, {
    headers : CookieService.getAccessToken()
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error.response.data);
    })
};

const updateUserMembership = (membership) => {
  return axios.put(BASE_URL + "/update-user-membership", {membership: membership}, {
    headers : CookieService.getAccessToken()
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error.response);
    })
};

const StripeService = {
  publicKey,
  createStripePaymentSession,
  cancelStripePaymentSession,
  updateUserMembership
};

export default StripeService;