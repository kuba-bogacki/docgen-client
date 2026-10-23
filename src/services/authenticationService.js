import axios from "axios";
import CookieService from "./cookieService";
import ApiService from "./apiService";

const BASE_URL = ApiService.buildApiUrl("/api/v1.0/authentication");

const signInToActivateAccount = (verificationCode, authenticationRequest) => {
  return axios.post(BASE_URL + `/verify/${verificationCode}`, authenticationRequest)
    .then((response) => {
      if (response.status === 200) {
        CookieService.setCookie(response.data);
      }
      return response;
    });
};

const signInToJoinToCompany = (companyId, authenticationRequest) => {
  return axios.post(BASE_URL + `/confirm-membership/${companyId}`, authenticationRequest)
    .then((response) => {
      if (response.status === 200) {
        CookieService.setCookie(response.data);
      }
      return response;
    });
};

const signIn = (authenticationRequest) => {
  return axios.post(BASE_URL + "/login", authenticationRequest)
    .then((response) => {
      if (response.status === 200) {
        CookieService.setCookie(response.data);
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

const signOut = () => {
  return axios.patch(BASE_URL + "/logout", {}, {
    headers : CookieService.getAccessToken()
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    })
};

const AuthService = {
  signInToJoinToCompany,
  signInToActivateAccount,
  signUp,
  signIn,
  signOut
};

export default AuthService;