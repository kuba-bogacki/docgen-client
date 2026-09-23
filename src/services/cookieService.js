import Cookies from "universal-cookie";
import jwt from "jwt-decode";

const cookie = new Cookies();

const setCookie = (authenticationResponse) => {
  const jwtToken = authenticationResponse.jwtToken;
  const refreshToken = authenticationResponse.refreshToken;
  cookie.set("jwtAuthenticationToken", jwtToken, {
    expires : new Date(jwt(jwtToken).exp * 1000)
  });
  cookie.set("jwtRefreshToken", refreshToken, {
    expires : new Date(jwt(refreshToken).exp * 1000)
  });
};

const getJwtToken = () => {
  return getToken("jwtAuthenticationToken");
};

const getRefreshToken = () => {
  return getToken("jwtRefreshToken");
};

const getToken = (tokenName) => {
  if (cookie.get(tokenName) === undefined) {
    return null;
  } else {
    return {'Authorization': 'Bearer ' + cookie.get(tokenName)};
  }
};

const getJwtTokenExpiration = () => {
  return getTokenExpiration("jwtAuthenticationToken");
};

const getRefreshTokenExpiration = () => {
  return getTokenExpiration("jwtRefreshToken");
};

const getTokenExpiration = (tokenName) => {
  if (cookie.get(tokenName) === undefined) {
    return null;
  } else {
    return new Date(jwt(cookie.get(tokenName)).exp * 1000);
  }
};

const removeCookie = () => {
  cookie.remove("jwtAuthenticationToken");
  cookie.remove("jwtRefreshToken");
};

const isLogIn = () => {
  return cookie.get("jwtAuthenticationToken") !== undefined && cookie.get("jwtRefreshToken") !== undefined;
};

const CookieService = {
  setCookie,
  getJwtToken,
  getRefreshToken,
  removeCookie,
  isLogIn,
  getJwtTokenExpiration,
  getRefreshTokenExpiration
};

export default CookieService;