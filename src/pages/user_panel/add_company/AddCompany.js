import "./AddCompanyStyle.css";
import style from "../../../constans/overwriteMaterialUiStyle";
import {Button} from "@mui/material";
import {useState} from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ValidationService from "../../../services/validationService";
import CompanyService from "../../../services/companyService";
import Modal from "../../../components/modal/Modal";
import ModalContent from "../../../constans/modalContent";
import UtilityService from "../../../services/utilityService";
import {useNavigate} from "react-router-dom";
import RedirectService from "../../../services/redirectionService";

function AddCompany() {

  const navigate = useNavigate();

  const [krsNumber, setKrsNumber] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [existingCompanyComponent, setExistingCompanyComponent] = useState(<></>);

  const checkKrsNumber = (event) => {
    ValidationService.incorrectInputInfo("krs-number-input", !ValidationService.isKrsValid(event.target.value),
      0, "Krs number is incorrect");
    setKrsNumber(event.target.value);
  };

  const displayModal = (view) => {
    if (modalTitle === ModalContent.successVerifyCompanyDataTitle) {
      setOpenModal(view);
      navigate("/user-panel");
      // RedirectService.reloadPage();
    } else {
      setOpenModal(view);
    }
  };

  const findCompanyByKrsNumber = () => {
    CompanyService.getCompanyDataFromKrsApi(krsNumber)
      .then((response) => {
        if (response !== "Not a limited liability company") {
          setExistingCompanyComponent(
            <div className="add-company-response">
              <span className="icon-input-inline">
                <QuestionAnswerIcon fontSize="large"/>
                <h3 className="add-company-sizing-style">{response.companyName}</h3>
                <Button sx={style.loginButtonStyle} onClick={() => createNewCompany(response)}>Create</Button>
              </span>
            </div>
          );
        } else if (response === "Not a limited liability company") {
          setExistingCompanyComponent(
            <div className="add-company-response">
              <span className="icon-input-inline">
                <h3>
                  We apologize but our product support only a limited liability company. We do not accept other types.
                </h3>
              </span>
            </div>
          );
        }
      })
      .catch((error) => {
        console.log(error);
        setExistingCompanyComponent(
          <div className="add-company-response">
            <span className="icon-input-inline">
              <h3>
                We couldn't find company with provide KRS number. We can't fill the sheet with proper data using network.
                Please provide correct number or try again a few moments later.
              </h3>
            </span>
          </div>
        );
      })
    };

  const createNewCompany = (companyDto) => {
    CompanyService.checkIfCompanyAlreadyExist(companyDto.companyKrsNumber)
      .then((response) => {
        if (response === true) {
          setModalTitle(ModalContent.companyAlreadyExistTitle);
          setModalBody(ModalContent.companyAlreadyExistBody);
          displayModal(true);
        } else {
          confirmCompanyData(companyDto);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const confirmCompanyData = (companyDto) => {
    CompanyService.saveCompany(companyDto)
      .then((response) => {
        setModalTitle(ModalContent.successVerifyCompanyDataTitle);
        setModalBody(UtilityService.modalCompanyDataDisplay(response));
        displayModal(true);
      })
      .catch((error) => {
        console.log(error);
        setModalTitle(ModalContent.failureSavingCompanyDataTitle);
        setModalBody(ModalContent.failureSavingCompanyDataBody);
        displayModal(true);
      })
  };

  return (
    <div className="add-company-container">
      <div className="add-company-header">
        <h1>Add Company</h1>
        <hr className="add-company-hr-line animate__animated animate__fadeInLeftBig"></hr>
      </div>
      <div className="add-company-body">
        <h3>Please provide KRS number of company you want to add as a member</h3>
        <form className="add-company-form">
          <span className="icon-input-inline">
            <BadgeIcon fontSize="large"/>
            <label htmlFor={krsNumber} className="add-company-sizing-style">
              <input className="krs-number-input" type="number" value={krsNumber} name="krs-number" placeholder="Krs number"
                onChange={checkKrsNumber}/>
            </label>
            <Button sx={style.signUpButtonStyle} onClick={() => findCompanyByKrsNumber()}>Find</Button>
          </span>
        </form>
        <hr className="add-company-hr-line animate__animated animate__fadeInLeftBig"></hr>
        {existingCompanyComponent}
      </div>
      {openModal && <Modal modalTitle={modalTitle} modalBody={modalBody} displayModal={displayModal}/>}
    </div>
  );
}

export default AddCompany;