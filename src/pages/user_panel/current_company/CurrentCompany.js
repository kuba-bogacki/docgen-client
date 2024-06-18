import "./CurrentCompanyStyle.css";
import {useOutletContext, useParams} from "react-router-dom";
import {useEffect} from "react";
import CompanyService from "../../../services/companyService";
import LocalStorageService from "../../../services/localStorageService";

function CurrentCompany() {

  const params = useParams();
  const [currentCompany, setCurrentCompany] = useOutletContext();

  useEffect(() => {
    loadCurrentCompany(params.companyId);
  }, []);

  const loadCurrentCompany = (companyId) => {
    LocalStorageService.loadCurrentCompany(companyId);
    CompanyService.getCompanyByCompanyId(companyId)
      .then((response) => {
        setCurrentCompany(response);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const formatPostalCode = (postalCode) => {
    return postalCode.substring(0, 2) + "-" + postalCode.substring(3);
  };

  const formatShareCapital = (shareCapital) => {
    return parseFloat(shareCapital).toLocaleString('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
    });
  }

  return (
    <div className="current-company-container">
      {currentCompany &&
        <>
          <header className="current-company-header">
            <h1>{currentCompany.companyName}</h1>
          </header>
          <hr className="current-company-hr-line animate__animated animate__fadeInLeftBig"></hr>
          <main className="current-company-body">
            <h3>Some information about current company</h3>
            <section className="current-company-section">
              <div className="current-company-card">
                <h5>Krs number: {currentCompany.companyKrsNumber}</h5>
                <h5>Regon number: {currentCompany.companyRegonNumber}</h5>
                <h5>Nip number: {currentCompany.companyNipNumber}</h5>
                <h5>Registration date: {currentCompany.companyRegistrationDate}</h5>
              </div>
              <div className="current-company-card">
                <h5>
                  {currentCompany.companyAddressDto.addressLocalNumber} {currentCompany.companyAddressDto.addressStreetName} {currentCompany.companyAddressDto.addressStreetNumber} St.
                </h5>
                <h5>
                  {formatPostalCode(currentCompany.companyAddressDto.addressPostalCode)} {currentCompany.companyAddressDto.addressCity}
                </h5>
                <h5>Company share capital: {formatShareCapital(currentCompany.companyShareCapital)}</h5>
              </div>
            </section>
          </main>
          <hr className="current-company-hr-line animate__animated animate__fadeInLeftBig"></hr>
        </>
      }
    </div>
  );
}

export default CurrentCompany;