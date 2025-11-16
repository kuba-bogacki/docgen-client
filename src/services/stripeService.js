import axios from "axios";
import CookieService from "./cookieService";

const publicKey = "pk_test_51M5vFXInCCqlMcYIbxZSd7LiGoISWfJGCkvmABnaGcX4k31miShkqxQYUanq9VTlSM5Id4Z9H753NYJxtlTnuZV000fsmfDZXb";
const BASE_URL = "http://localhost:8080/v1.0/authentication";

const runStripePaymentSession = (paymentData) => {
  return axios.post(BASE_URL + "/run-payment-session", paymentData, {
    headers : CookieService.getCookie()
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error.response.data);
    })
};

const StripeService = {
  publicKey,
  runStripePaymentSession
};

export default StripeService;