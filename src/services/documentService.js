import LocalStorageService from "./localStorageService";
import CookieService from "./cookieService";
import axios from "axios";
import ApiService from "./apiService";

const BASE_URL = ApiService.buildApiUrl("/api/v1.0/document");

const createNewFinancialStatement = (documentData) => {
  return axios.post(BASE_URL + `/create-financial-statement`, documentData, {
    headers : CookieService.getAccessToken()
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    })
};

const getAllCompanyDocuments = () => {
  let companyId = LocalStorageService.getCurrentCompany();
  return axios.get(BASE_URL + `/get-all/${companyId}`, {
    headers : CookieService.getAccessToken()
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    })
};

const getDetailedCompanyDocument = (documentId) => {
  return axios.get(BASE_URL + `/${documentId}`, {
    headers : CookieService.getAccessToken()
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    })
};

const deleteCompanyDocument = (documentId) => {
  return axios.delete(BASE_URL + `/${documentId}`, {
    headers : CookieService.getAccessToken()
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    })
};

const DocumentService = {
  createNewFinancialStatement,
  getAllCompanyDocuments,
  getDetailedCompanyDocument,
  deleteCompanyDocument
};

export default DocumentService;