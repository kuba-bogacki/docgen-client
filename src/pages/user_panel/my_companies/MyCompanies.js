import "./MyCompaniesStyle.css";
import {NavLink} from "react-router-dom";
import style from "../../../constans/overwriteMaterialUiStyle";
import {useEffect, useState} from "react";
import CompanyService from "../../../services/companyService";

function MyCompanies() {

  useEffect(() => {
    if (companyLoaded === false) {
      getAllCurrentUserCompanies();
    }
  });

  const [companyLoaded, setCompanyLoaded] = useState(false);
  const [companyArray, setCompanyArray] = useState([]);
  const [existingCompaniesComponent, setExistingCompaniesComponent] = useState(<></>);

  const getAllCurrentUserCompanies = () => {
    CompanyService.getCurrentUserCompanies()
      .then((response) => {
        setCompanyArray(response);
        setCompanyLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  return (
    <div className="my-companies-container">
      <div className="my-companies-header">
        <h1>My Companies</h1>
      </div>
      <hr className="my-companies-hr-line animate__animated animate__fadeInLeftBig"></hr>
        {companyArray.length === 0 ?
          <div className="my-companies-body">
            <h3>You don't have any company linked with your account</h3>
          </div>
          :
          <div className="my-companies-body">
            {companyArray.map((company, index) =>
              <NavLink to={`/user-panel/${company.companyId}`} style={style.nonDecoratedLink} key={index}>
                <div className="my-companies-card">
                  <h3>{company.companyName}</h3>
                </div>
              </NavLink>
            )}
          </div>
        }
      <hr className="my-companies-hr-line animate__animated animate__fadeInLeftBig"></hr>
    </div>
  );
}

export default MyCompanies;