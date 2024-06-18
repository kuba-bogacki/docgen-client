import "./SendInvitationStyle.css";
import style from "../../../constans/overwriteMaterialUiStyle";
import {Button, CircularProgress} from "@mui/material";
import {useState} from "react";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ValidationService from "../../../services/validationService";
import UserService from "../../../services/userService";
import NotificationService from "../../../services/notificationService";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ModalContent from "../../../constans/modalContent";
import Modal from "../../../components/modal/Modal";
import LocalStorageService from "../../../services/localStorageService";

function SendInvitation() {

  const [emailAddress, setEmailAddress] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [progressData, setProgressData] = useState(false);
  const [invitationSend, setInvitationSend] = useState(<></>);

  const checkValidEmail = (event) => {
    ValidationService.incorrectInputInfo("email-invitation-input", !ValidationService.isEmailValid(event.target.value),
      0, "E-mail is incorrect");
    setEmailAddress(event.target.value);
  };

  const sendInvitation = (userEmail) => {
    setProgressData(true);
    let data = {
      userEmail : userEmail,
      companyId : LocalStorageService.getCurrentCompany()
    };
    NotificationService.sendInvitation(data)
      .then((response) => {
        if (response.status === 200) {
          setProgressData(false);
          setModalTitle(ModalContent.userSuccessfullyInvitationTitle);
          setModalBody(ModalContent.userSuccessfullyInvitationBody);
          displayModal(true);
        } else {
          setProgressData(false);
          setModalTitle(ModalContent.userFailureInvitationTitle);
          setModalBody(ModalContent.userFailureInvitationBody);
          displayModal(true);
        }
      });
  };

  const displayModal = (view) => {
    setOpenModal(view);
  };

  const findUserToInvite = () => {
    UserService.findUserToInvite(emailAddress)
      .then((response) => {
        if (response.status === 200) {
          setInvitationSend(
            <div className="send-invitation-response">
              <span className="icon-input-inline">
                <QuestionAnswerIcon fontSize="large"/>
                <h3 className="send-invitation-sizing-style">{response.data.userFirstNameI} {response.data.userLastNameI}</h3>
                {progressData ?
                  <CircularProgress sx={style.invitationUpProgressCircle}/>
                  :
                  <Button sx={style.loginButtonStyle} onClick={() => sendInvitation(emailAddress)}>Invite</Button>
                }
              </span>
            </div>
          );
        } else if (response.status === 208) {
          setInvitationSend(
            <div className="send-invitation-response">
              <h3>
                User <em>{emailAddress}</em> is already belong to your company. It's not necessary to send invitation one more time.
              </h3>
            </div>
          );
        } else if (response.status === 404) {
          setInvitationSend(
            <div className="send-invitation-response">
              <h3>
                Searching failed. We were unable to find {emailAddress} in our database. User have to register first.
              </h3>
            </div>
          );
        }
      });
  };

  return (
    <div className="send-invitation-container">
      <header className="send-invitation-header">
        <h1>Send Invitation</h1>
        <hr className="send-invitation-hr-line animate__animated animate__fadeInLeftBig"></hr>
      </header>
      <main className="send-invitation-body">
        <h3>Please provide e-mail address of person you want to send an invitation</h3>
        <form className="send-invitation-form">
          <span className="icon-input-inline">
            <ContactMailIcon fontSize="large"/>
            <label htmlFor={emailAddress} className="send-invitation-sizing-style">
              <input className="email-invitation-input" type="email" value={emailAddress} name="email-address"
                 placeholder="E-mail address" onChange={checkValidEmail}/>
            </label>
            <Button sx={style.signUpButtonStyle} onClick={() => findUserToInvite()}>Find</Button>
          </span>
        </form>
        <hr className="send-invitation-hr-line animate__animated animate__fadeInLeftBig"></hr>
        {invitationSend}
      </main>
      {openModal && <Modal modalTitle={modalTitle} modalBody={modalBody} displayModal={displayModal}/>}
    </div>
  );
}

export default SendInvitation;