import Cookies from "universal-cookie";
import jwt from "jwt-decode";

const cookie = new Cookies();

const COOKIE_OPTIONS = {
  path: '/',
  sameSite: 'lax'
};

const getSanitizedCookie = (tokenName) => {
  const rawValue = cookie.get(tokenName);
  return !rawValue ? null : String(rawValue).split(';')[0].trim();
};

const setCookie = (authenticationResponse) => {
  const accessToken = authenticationResponse.jwtToken;
  const refreshToken = authenticationResponse.refreshToken;

  if (accessToken) {
    cookie.set("accessToken", accessToken, {
      ...COOKIE_OPTIONS,
      expires: new Date(jwt(accessToken).exp * 1000)
    });
  }

  if (refreshToken) {
    cookie.set("refreshToken", refreshToken, {
      ...COOKIE_OPTIONS,
      expires: new Date(jwt(refreshToken).exp * 1000)
    });
  }
};

const getToken = (tokenName) => {
  const sanitizedTokenValue = getSanitizedCookie(tokenName);
  return !sanitizedTokenValue ? null : {'Authorization': 'Bearer ' + sanitizedTokenValue};
};

const getAccessToken = () => {
  return getToken("accessToken");
};

const getRefreshToken = () => {
  return getToken("refreshToken");
};

const getTokenExpiration = (tokenName) => {
  const sanitizedTokenValue = getSanitizedCookie(tokenName);
  return !sanitizedTokenValue ? null : new Date(jwt(sanitizedTokenValue).exp * 1000);
};

const getJwtTokenExpiration = () => {
  return getTokenExpiration("accessToken");
};

const getRefreshTokenExpiration = () => {
  return getTokenExpiration("refreshToken");
};

const removeCookie = () => {
  cookie.remove("accessToken", COOKIE_OPTIONS);
  cookie.remove("refreshToken", COOKIE_OPTIONS);
};

const isLogIn = () => {
  return Boolean(getSanitizedCookie("accessToken") && getSanitizedCookie("refreshToken"));
};

const CookieService = {
  setCookie,
  getAccessToken,
  getRefreshToken,
  removeCookie,
  isLogIn,
  getJwtTokenExpiration,
  getRefreshTokenExpiration
};

export default CookieService;