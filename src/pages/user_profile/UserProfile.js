import "./UserProfileStyle.css";
import {useEffect, useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import UserService from "../../services/userService";
import {IKImage} from "imagekitio-react";
import ImagekitService from "../../services/imagekitService";

function UserProfile() {

  useEffect(() => {
    if (userEmail === "") {
      getUserProfile();
    }
  });

  const [userEmail, setUserEmail] = useState("");
  const [userFirstNameI, setUserFirstNameI] = useState("");
  const [userFirstNameII, setUserFirstNameII] = useState("");
  const [userLastNameI, setUserLastNameI] = useState("");
  const [userLastNameII, setUserLastNameII] = useState("");
  const [defaultUserPicture, setDefaultUserPicture] = useState("default-user-picture.png");

  const renderProfilePicture = (pictureName) => {
    setDefaultUserPicture(pictureName);
  };

  const selectedPhotoHandler = (e) => {
    let formData = new FormData();
    formData.append('loadedImage', e.target.files[0]);

    ImagekitService.uploadProfilePhoto(formData)
      .then((response) => {
        renderProfilePicture(response);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const editParameter = (number) => {
    let userParameterInput = document.getElementsByClassName("user-profile-info-input")[number];
    let editIconElement = document.getElementsByClassName("user-profile-edit-icon")[number];
    if (userParameterInput.disabled === true) {
      userParameterInput.disabled = false
      editIconElement.classList.add("icon-rotated");
    } else {
      userParameterInput.disabled = true;
      editIconElement.classList.remove("icon-rotated");
      saveChanges();
    }
  };

  const getUserProfile = () => {
    UserService.getUserData()
      .then((response) => {
        setUserEmail(response.userEmail);
        setUserFirstNameI(response.userFirstNameI);
        setUserFirstNameII(response.userFirstNameII);
        setUserLastNameI(response.userLastNameI);
        setUserLastNameII(response.userLastNameII);
        if (response.userPhotoFileName.startsWith("profile-picture")) {
          setDefaultUserPicture(response.userPhotoFileName);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const saveChanges = () => {
    let userData = {userEmail, userFirstNameI, userFirstNameII, userLastNameI, userLastNameII};
    UserService.saveUserData(userData)
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div className="user-profile-container">
      <div className="current-user-content">
        <header className="current-user-header">
          <h1 className="animate__animated animate__fadeInRightBig">User Profile</h1>
          <hr className="current-user-hr-line animate__animated animate__fadeInLeftBig"></hr>
          <h4 className="animate__animated animate__fadeInRightBig">Make your profile more readable for other company members</h4>
        </header>
        <main className="current-user-body">
          <aside className="current-user-left-aside">
            <section className="current-user-section">
              <div className="photo-outer-container">
                  <IKImage className="user-photo-inner" urlEndpoint={ImagekitService.urlEndpoint} path={defaultUserPicture} width="90" height="90"/>
                <input id="user-photo-input" type="file" name="user-photo" onChange={(e) => selectedPhotoHandler(e)}/>
                <label htmlFor="user-photo-input" className="user-photo-uploader">Add profile photo</label>
              </div>
            </section>
            <section className="current-user-section current-user-company-section">
              <h4>Company member</h4>
              {/*{user.userCompany.map((company, index) => {*/}
              {/*  <div>*/}
              {/*    <p key={index}>{company.companyName}</p>*/}
              {/*    <p>{company.companyMembers.userRole}</p>*/}
              {/*  </div>*/}
              {/*})}*/}
            </section>
          </aside>
          <aside className="current-user-right-aside">
            <section className="current-user-section">
              <h3>First name I &nbsp;</h3>
              <input disabled={true} defaultValue={userFirstNameI} className="user-profile-info-input" value={userFirstNameI}
                onChange={(e) => setUserFirstNameI(e.target.value)} spellCheck={false}/>
                <EditIcon fontSize="small" onClick={() => editParameter(0)} className="user-profile-edit-icon"/>
            </section>
            <section className="current-user-section">
              <h3>First name II </h3>
              <input disabled={true} defaultValue={userFirstNameII} className="user-profile-info-input" value={userFirstNameII}
                onChange={(e) => setUserFirstNameII(e.target.value)} spellCheck={false}/>
                <EditIcon fontSize="small" onClick={() => editParameter(1)} className="user-profile-edit-icon"/>
            </section>
            <section className="current-user-section">
              <h3>Last name I &nbsp;</h3>
              <input disabled={true} defaultValue={userLastNameI} className="user-profile-info-input" value={userLastNameI}
                onChange={(e) => setUserLastNameI(e.target.value)} spellCheck={false}/>
                <EditIcon fontSize="small" onClick={() => editParameter(2)} className="user-profile-edit-icon"/>
            </section>
            <section className="current-user-section">
              <h3>Last name II </h3>
              <input disabled={true} defaultValue={userLastNameII} className="user-profile-info-input" value={userLastNameII}
                onChange={(e) => setUserLastNameII(e.target.value)} spellCheck={false}/>
                <EditIcon fontSize="small" onClick={() => editParameter(3)} className="user-profile-edit-icon"/>
            </section>
          </aside>
        </main>
      </div>
      <hr className="current-company-hr-line animate__animated animate__fadeInLeftBig"></hr>
    </div>
  );
}

export default UserProfile;