import axios from "axios";
import CookieService from "./cookieService";
import UtilityService from "./utilityService";

const companyType = "SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ";
const BASE_URL = "http://localhost:8080/v1.0/company";

const fetchCompanyData = (responseData) => {
  return {
    companyName: UtilityService.companyName(responseData.odpis.dane.dzial1.danePodmiotu.nazwa),
    companyKrsNumber: responseData.odpis.naglowekA.numerKRS,
    companyRegonNumber: responseData.odpis.dane.dzial1.danePodmiotu.identyfikatory.regon,
    companyNipNumber: responseData.odpis.dane.dzial1.danePodmiotu.identyfikatory.nip,
    companyRegistrationDate: responseData.odpis.naglowekA.dataRejestracjiWKRS,
    companyAddressDto: {
      addressStreetName: responseData.odpis.dane.dzial1.siedzibaIAdres.adres.ulica === undefined ?
        null : UtilityService.parseStreetName(responseData.odpis.dane.dzial1.siedzibaIAdres.adres.ulica),
      addressStreetNumber: responseData.odpis.dane.dzial1.siedzibaIAdres.adres.nrDomu,
      addressLocalNumber: responseData.odpis.dane.dzial1.siedzibaIAdres.adres.nrLokalu === undefined ?
        null : responseData.odpis.dane.dzial1.siedzibaIAdres.adres.nrLokalu,
      addressPostalCode: responseData.odpis.dane.dzial1.siedzibaIAdres.adres.kodPocztowy,
      addressCity: UtilityService.customCompanyData(responseData.odpis.dane.dzial1.siedzibaIAdres.adres.miejscowosc)
    },
    companyShareCapital: UtilityService.parseShareCapital(responseData.odpis.dane.dzial1.kapital.wysokoscKapitaluZakladowego.wartosc),
    // companyMembers : UtilityService.fetchCompanyMembers(responseData.odpis.dane.dzial2.reprezentacja.sklad)
  };
};

const getCompanyDataFromKrsApi = (krsNumber) => {
  return axios.get(`https://api-krs.ms.gov.pl/api/krs/OdpisAktualny/${krsNumber}?rejestr=P&format=json`)
    .then((response) => {
      if (response.data.odpis.dane.dzial1.danePodmiotu.formaPrawna === companyType) {
        return fetchCompanyData(response.data);
      } else {
        return "Not a limited liability company";
      }
    })
    .catch((error) => {
      return error.response.data;
    });
};

const checkIfCompanyAlreadyExist = (companyKrsNumber) => {
  return axios.get(BASE_URL + `/exist/${companyKrsNumber}`, {
    headers : CookieService.getCookie()
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

const saveCompany = (companyDto) => {
  return axios.post(BASE_URL + "/create", companyDto, {
    headers : CookieService.getCookie()
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

const getCurrentUserCompanies = () => {
  return axios.get(BASE_URL + "/current-user-companies", {
    headers : CookieService.getCookie()
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    })
};

const getCompanyByCompanyId = (companyId) => {
  return axios.get(BASE_URL + `/details/${companyId}`, {
    headers : CookieService.getCookie()
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    })
};

const getCompanyByCompanyKrsNumber = (krsNumber) => {
  return axios.get(BASE_URL + `/get-by-krs/${krsNumber}`, {
    headers : CookieService.getCookie()
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    })
};

const getCompanyMembersByCompanyId = (companyId) => {
  return axios.get(BASE_URL + `/members-details/${companyId}`, {
    headers : CookieService.getCookie()
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    })
};

const CompanyService = {
  getCompanyDataFromKrsApi,
  checkIfCompanyAlreadyExist,
  saveCompany,
  getCurrentUserCompanies,
  getCompanyByCompanyId,
  getCompanyByCompanyKrsNumber,
  getCompanyMembersByCompanyId
};

export default CompanyService;