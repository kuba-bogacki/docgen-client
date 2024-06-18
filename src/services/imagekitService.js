import axios from "axios";
import CookieService from "./cookieService";

const publicKey = "public_bM8atLKI6NBIJe6fYt23sBBIzTs=";
const urlEndpoint = "https://ik.imagekit.io/forcompany/user-profile-pictures";
const authenticationEndpoint = "http://localhost:8080/validate";

const BASE_URL = "http://localhost:8080/v1.0/authentication";

const uploadProfilePhoto = (formData) => {
  return axios.post(BASE_URL + "/photo", formData, {
    headers : CookieService.getCookie()
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    })
};

const ImagekitService = {
  publicKey,
  urlEndpoint,
  authenticationEndpoint,
  uploadProfilePhoto
};

export default ImagekitService;