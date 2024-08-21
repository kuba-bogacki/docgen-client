import Cookies from "universal-cookie";
import jwt from "jwt-decode";

const cookie = new Cookies();

const setCookie = (jwtResponseToken) => {
  const decoded = jwt(jwtResponseToken);
  cookie.set("jwtAuthenticationToken", jwtResponseToken, {expires : new Date(decoded.exp * 1000)});
};

const getCookie = () => {
  if (cookie.get("jwtAuthenticationToken") === undefined) {
    return null;
  } else {
    return {'Authorization': 'Bearer ' + cookie.get("jwtAuthenticationToken")};
  }
};

const getCookieExpiration = () => {
  if (cookie.get("jwtAuthenticationToken") === undefined) {
    return null;
  } else {
    return new Date(jwt(cookie.get("jwtAuthenticationToken")).exp * 1000);
  }
};

const removeCookie = () => {
  cookie.remove("jwtAuthenticationToken");
};

const isLogIn = () => {
  return cookie.get("jwtAuthenticationToken") !== undefined;
};

const CookieService = {
  setCookie,
  getCookie,
  removeCookie,
  isLogIn,
  getCookieExpiration
};

export default CookieService;