const loadCurrentCompany = (companyId) => {
  localStorage.setItem("currentCompany", JSON.stringify(companyId));
};

const getCurrentCompany = () => {
  return localStorage.getItem("currentCompany");
};

const removeCurrentCompany = () => {
  localStorage.removeItem("currentCompany");
};

const loadCurrentUser = (userId) => {
  localStorage.setItem("currentUser", JSON.stringify(userId));
};

const getCurrentUser = () => {
  return localStorage.getItem("currentUser");
};

const removeCurrentUser = () => {
  localStorage.removeItem("currentUser");
};

const logIn = (isLoggedIn) => {
  localStorage.setItem("loggedIn", JSON.stringify(isLoggedIn));
};

const logOut = () => {
  localStorage.removeItem("loggedIn");
};

const isLoggedIn = () => {
  return JSON.parse(localStorage.getItem("loggedIn")) !== undefined && JSON.parse(localStorage.getItem("loggedIn")) === true;
};

const LocalStorageService = {
  loadCurrentCompany,
  getCurrentCompany,
  removeCurrentCompany,
  loadCurrentUser,
  getCurrentUser,
  removeCurrentUser,
  logIn,
  logOut,
  isLoggedIn
}

export default LocalStorageService;