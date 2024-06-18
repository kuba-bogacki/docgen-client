import "./ResetPasswordStyle.css";
import '../../../node_modules/animate.css/animate.css';
import style from "../../constans/overwriteMaterialUiStyle";
import textContent from "../../constans/textContent";
import ValidationService from "../../services/validationService";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import {Button, CircularProgress} from "@mui/material";
import {useState} from "react";
import Modal from "../../components/modal/Modal";
import AuthService from "../../services/authenticationService";
import ModalContent from "../../constans/modalContent";

function ResetPassword() {

  const [userEmail, setUserEmail] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [progressSendData, setProgressSendData] = useState(false);

  const checkValidEmail = (event) => {
    ValidationService.incorrectInputInfo("user-reset-input", !ValidationService.isEmailValid(event.target.value),
      0, "E-mail is incorrect");
    setUserEmail(event.target.value);
  };

  const displayModal = (view) => {
    setOpenModal(view);
  };

  const sendEmailToResetPassword = () => {
    setProgressSendData(true);
    let userData = new FormData();
    userData.append("userEmail", userEmail);
    AuthService.sendResetLink(userData)
      .then(() => {
        setProgressSendData(false);
        setModalTitle(ModalContent.successSendResetEmailTitle);
        setModalBody(ModalContent.successSendResetEmailBody);
        displayModal(true);
      })
      .catch((error) => {
        setProgressSendData(false);
        setModalTitle(ModalContent.failureSendResetEmailTitle);
        setModalBody(ModalContent.failureSendResetEmailBody + error.response.data);
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
                <AlternateEmailIcon fontSize="large" className="reset-icon-style"/>
                <label htmlFor={userEmail} className="reset-label-style">
                  <input className="user-reset-input" type="email" value={userEmail} name="user-email"
                    placeholder="E-mail" onChange={checkValidEmail}/>
                </label>
              </span>
            </form>
            {progressSendData ?
              <CircularProgress sx={style.signUpProgressCircle}/>
              :
              <Button sx={style.loginButtonStyle} onClick={() => sendEmailToResetPassword()}>Send e-mail</Button>
            }
          </div>
          <hr className="reset-hr-line animate__animated animate__fadeInLeftBig"></hr>
          <div className="reset-instruction">
            <h4>
              Provide your e-mail address and click button to reset your password.
              We send you an e-mail with link. Please check your e-mail box.
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

export default ResetPassword;