import axios from "axios";
import CookieService from "./cookieService";

const BASE_URL = "http://localhost:8080/v1.0/authentication";

const signInToActivateAccount = (verificationCode, authenticationRequest) => {
  return axios.post(BASE_URL + `/verify/${verificationCode}`, authenticationRequest)
    .then((response) => {
      if (response.status === 200) {
        CookieService.setCookie(response.data.jwtToken);
      }
      return response;
    });
};

const signInToJoinToCompany = (companyId, authenticationRequest) => {
  return axios.post(BASE_URL + `/confirm-membership/${companyId}`, authenticationRequest)
    .then((response) => {
      if (response.status === 200) {
        CookieService.setCookie(response.data.jwtToken);
      }
      return response;
    });
};

const signIn = (authenticationRequest) => {
  return axios.post(BASE_URL + "/login", authenticationRequest)
    .then((response) => {
      if (response.status === 200) {
        CookieService.setCookie(response.data.jwtToken);
      }
      return response;
    })
    .catch((error) => {
      return error.response;
    })
};

const signUp = (registerRequest) => {
  return axios.post(BASE_URL + "/create", registerRequest)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    })
};

const sendResetLink = (userData) => {
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

const AuthService = {
  signInToJoinToCompany,
  signInToActivateAccount,
  sendResetLink,
  resetPassword,
  signUp,
  signIn
};

export default AuthService;