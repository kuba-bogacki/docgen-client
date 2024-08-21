const loadCurrentCompany = (companyId) => {
  localStorage.setItem("currentCompany", JSON.stringify(companyId));
};

const getCurrentCompany = () => {
  let currentCompanyId = localStorage.getItem("currentCompany");
  return currentCompanyId.substring(1, currentCompanyId.length - 1)
};

const removeCurrentCompany = () => {
  localStorage.removeItem("currentCompany");
};

const loadCurrentUser = (userId) => {
  localStorage.setItem("currentUser", JSON.stringify(userId));
};

const getCurrentUser = () => {
  let currentUserId = localStorage.getItem("currentUser");
  return currentUserId.substring(1, currentUserId.length - 1)
};

const removeCurrentUser = () => {
  localStorage.removeItem("currentUser");
};

const logIn = (isLoggedIn) => {
  localStorage.setItem("loggedIn", JSON.stringify(isLoggedIn));
};

const logOut = () => {
  localStorage.removeItem("currentCompany");
  localStorage.removeItem("currentUser");
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