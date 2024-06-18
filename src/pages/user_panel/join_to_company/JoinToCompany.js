import "./JoinToCompanyStyle.css";
import style from "../../../constans/overwriteMaterialUiStyle";
import {useState} from "react";
import {Button} from "@mui/material";
import BadgeIcon from '@mui/icons-material/Badge';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ValidationService from "../../../services/validationService";
import ModalContent from "../../../constans/modalContent";
import CompanyService from "../../../services/companyService";
import NotificationService from "../../../services/notificationService";
import NotificationContent from "../../../constans/notificationContent";
import UtilityService from "../../../services/utilityService";
import Modal from "../../../components/modal/Modal";
import LocalStorageService from "../../../services/localStorageService";
import {useStompClient} from "react-stomp-hooks";
import CookieService from "../../../services/cookieService";

function JoinToCompany() {

  const stompClient = useStompClient();

  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [krsNumber, setKrsNumber] = useState("");
  const [existingCompanyComponent, setExistingCompanyComponent] = useState(<></>);

  const checkKrsNumber = (event) => {
    ValidationService.incorrectInputInfo("krs-number-input", !ValidationService.isKrsValid(event.target.value),
      0, "Krs number is incorrect");
    setKrsNumber(event.target.value);
  };

  const findCompanyInDatabase = () => {
    CompanyService.getCompanyByCompanyKrsNumber(krsNumber)
      .then((response) => {
        if (response.status === 200) {
          setExistingCompanyComponent(
            <div className="join-to-company-response">
              <span className="icon-input-inline">
                <QuestionAnswerIcon fontSize="large"/>
                <h3 className="join-to-company-sizing-style">{response.data.companyName}</h3>
                <Button sx={style.loginButtonStyle} onClick={() => sendInvitationRequest(response.data.companyId)}>Send</Button>
              </span>
            </div>
          );
        } else {
          setExistingCompanyComponent(
            <div className="join-to-company-response">
              <span className="icon-input-inline">
                <h3>
                  We couldn't find company with provide KRS number. Please provide correct number or create new company
                  under your account.
                </h3>
              </span>
            </div>
          );
        }
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const sendInvitationRequest = (companyId) => {
    let data = {
      companyId : companyId,
      notificationMessage : NotificationContent.membershipRequestMessage,
      notificationType : NotificationContent.membershipRequestType
    };

    stompClient.publish({
      destination : "/app/broadcast",
      body : JSON.stringify(data),
      headers : CookieService.getCookie()
    });

    // NotificationService.sendMembershipPetition(data);
    // console.log(rer);
      // .then((response) => {
      //   if (response.status === 200) {
          setModalTitle(ModalContent.successfullyMembershipPetitionTitle);
          setModalBody(ModalContent.successfullyMembershipPetitionBody);
          displayModal(true);

    // }
      // })
      // .catch(() => {
      //   setModalTitle(ModalContent.failureMembershipPetitionTitle);
      //   setModalBody(ModalContent.failureMembershipPetitionBody);
      //   displayModal(true);
      // })
  };

  const displayModal = (view) => {
    setOpenModal(view);
  };

  return (
    <div className="join-to-company-container">
      <div className="join-to-company-header">
        <h1>Join To Company</h1>
        <hr className="join-to-company-hr-line animate__animated animate__fadeInLeftBig"></hr>
      </div>
      <div className="join-to-company-body">
        <h3>Please provide KRS number of company you want to send invitation request</h3>
        <form className="join-to-company-form">
          <span className="icon-input-inline">
            <BadgeIcon fontSize="large"/>
            <label htmlFor={krsNumber} className="join-to-company-sizing-style">
              <input className="krs-number-input" type="number" value={krsNumber} name="krs-number" placeholder="Krs number"
                onChange={checkKrsNumber}/>
            </label>
            <Button sx={style.signUpButtonStyle} onClick={() => findCompanyInDatabase()}>Find</Button>
          </span>
        </form>
        <hr className="join-to-company-hr-line animate__animated animate__fadeInLeftBig"></hr>
        {existingCompanyComponent}
      </div>
      {openModal && <Modal modalTitle={modalTitle} modalBody={modalBody} displayModal={displayModal}/>}
    </div>
  );
}

export default JoinToCompany;