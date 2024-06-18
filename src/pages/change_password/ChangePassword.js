import "../reset_password/ResetPasswordStyle.css";
import textContent from "../../constans/textContent";
import ValidationService from "../../services/validationService";
import style from "../../constans/overwriteMaterialUiStyle";
import KeyIcon from "@mui/icons-material/Key";
import LockIcon from "@mui/icons-material/Lock";
import {Button, CircularProgress} from "@mui/material";
import {useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import Modal from "../../components/modal/Modal";
import AuthService from "../../services/authenticationService";
import ModalContent from "../../constans/modalContent";
import RedirectService from "../../services/redirectionService";

function ChangePassword() {

  const [queryParameters] = useSearchParams();
  const navigate = useNavigate();

  const [userPassword, setUserPassword] = useState("");
  const [verifyNewPassword, setVerifyNewPassword] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [progressSendData, setProgressSendData] = useState(false);

  const checkPassword = (event) => {
    ValidationService.incorrectInputInfo("user-reset-input", !ValidationService.isValidPassword(event.target.value),
      0, "Password is required");
    setUserPassword(event.target.value);
  };

  const checkVerifyPassword = (event) => {
    ValidationService.incorrectInputInfo("user-reset-input", event.target.value !== userPassword || userPassword === "",
      1, "Passwords are different");
    setVerifyNewPassword(event.target.value);
  };

  const displayModal = (view) => {
    if (modalTitle === ModalContent.successResetPasswordTitle) {
      setOpenModal(view);
      navigate("/");
      RedirectService.reloadPage();
    } else {
      setOpenModal(view);
    }
  };

  const setNewUserPassword = () => {
    setProgressSendData(true);
    let userEmail = queryParameters.get("user-email");
    let authenticationRequest = {userEmail, userPassword};
    AuthService.resetPassword(queryParameters.get("user-verification-code"), authenticationRequest)
      .then(() => {
        setProgressSendData(false);
        setModalTitle(ModalContent.successResetPasswordTitle);
        setModalBody(ModalContent.successResetPasswordBody);
        displayModal(true);
      })
      .catch((error) => {
        setProgressSendData(false);
        setModalTitle(ModalContent.failureResetPasswordTitle);
        setModalBody(ModalContent.failureResetPasswordBody + error.response.data);
        displayModal(true);
      })
  };

  return (
    <div className="reset-container">
      <div className="reset-container-inherit">
        <div className="reset-component">
          <div className="reset-header">
            <h1>Reset password</h1>
            <hr className="reset-hr-line animate__animated animate__fadeInLeftBig"></hr>
          </div>
          <div className="reset-body">
            <form className="reset-form">
              <span className="icon-input-inline">
                <KeyIcon fontSize="large" className="reset-icon-style"/>
                <label htmlFor={userPassword} className="reset-label-style">
                  <input className="user-reset-input" type="password" value={userPassword} name="new-user-password"
                    placeholder="Password" autoComplete="current-password" onChange={checkPassword}/>
                </label>
              </span>
              <span className="icon-input-inline">
                <LockIcon fontSize="large" className="reset-icon-style"/>
                <label htmlFor={verifyNewPassword} className="reset-label-style">
                  <input className="user-reset-input" type="password" value={verifyNewPassword} name="verify-new-password"
                    placeholder="Retype password" autoComplete="current-password" onChange={checkVerifyPassword}/>
                </label>
              </span>
            </form>
            {progressSendData ?
              <CircularProgress sx={style.signUpProgressCircle}/>
              :
              <Button sx={style.loginButtonStyle} onClick={() => setNewUserPassword()}>Change password</Button>
            }
          </div>
          <hr className="reset-hr-line animate__animated animate__fadeInLeftBig"></hr>
          <div className="reset-instruction">
            <h4>
              Please provide new password and retype it. From this moment it will be your current password.
            </h4>
          </div>
        </div>
        <div className="reset-side-info">
          <h1>{textContent.loginPageHeader}</h1>
          <p>{textContent.loginPageText}</p>
        </div>
      </div>
      {openModal && <Modal modalTitle={modalTitle} modalBody={modalBody} displayModal={displayModal}/>}
    </div>
  );
}

export default ChangePassword;