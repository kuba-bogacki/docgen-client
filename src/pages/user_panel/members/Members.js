import "./MembersStyle.css";
import {useEffect, useState} from "react";
import CompanyService from "../../../services/companyService";
import LocalStorageService from "../../../services/localStorageService";
import {IKImage} from "imagekitio-react";
import ImagekitService from "../../../services/imagekitService";

function Members() {

  const [membersLoaded, setMembersLoaded] = useState(false);
  const [companyMembers, setCompanyMembers] = useState([]);

  useEffect(() => {
    if (membersLoaded === false) {
      getCurrentCompany();
    }
  });

  const getCurrentCompany = () => {
    CompanyService.getCompanyMembersByCompanyId(LocalStorageService.getCurrentCompany())
      .then((response) => {
        setCompanyMembers(response);
        setMembersLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const renderProfilePicture = (pictureName) => {
    return pictureName === null ? "default-user-picture.png" : pictureName;
  };

  return (
    <div className="members-container">
      <header className="members-header">
        <h1>Members</h1>
      </header>
      <hr className="members-hr-line animate__animated animate__fadeInLeftBig"></hr>
      <main className="members-body">
        <h3>List of members in current company</h3>
        {companyMembers.map((member, index) =>
          <div className="member-body-block" key={index}>
            <div className="members-card">
              <h5>{member.userFirstNameI} {member.userFirstNameII}</h5>
              <h5>{member.userLastNameI} {member.userLastNameII}</h5>
              <h5>{member.userEmail}</h5>
            </div>
            <div className="member-photo-outer-container">
              <IKImage className="member-photo-inner" urlEndpoint={ImagekitService.urlEndpoint} path={renderProfilePicture(member.userPhotoFileName)} width="90" height="90"/>
            </div>
          </div>
        )}
      </main>
      <hr className="members-hr-line animate__animated animate__fadeInLeftBig"></hr>
    </div>
  );
}

export default Members;