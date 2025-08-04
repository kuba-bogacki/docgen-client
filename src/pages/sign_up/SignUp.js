import "./SignUpStyle.css";
import '../../../node_modules/animate.css/animate.css';
import textContent from "../../constans/textContent";
import style from "../../constans/overwriteMaterialUiStyle";
import ValidationService from "../../services/validationService";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import KeyIcon from '@mui/icons-material/Key';
import LockIcon from '@mui/icons-material/Lock';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import WcIcon from '@mui/icons-material/Wc';
import {Button, CircularProgress} from "@mui/material";
import {ArrowDownward} from "@mui/icons-material";
import {useState} from "react";
import AuthService from "../../services/authenticationService";
import {useNavigate} from "react-router-dom";
import Modal from "../../components/modal/Modal";
import ModalContent from "../../constans/modalContent";
import RedirectService from "../../services/redirectionService";

function SignUp() {

  const navigate = useNavigate();

  const [userFirstNameI, setUserFirstNameI] = useState("");
  const [userFirstNameII, setUserFirstNameII] = useState("");
  const [userLastNameI, setUserLastNameI] = useState("");
  const [userLastNameII, setUserLastNameII] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [userGender, setUserGender] = useState("");
  const [termsAndCondition, setTermsAndCondition] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(false);
  const [progressSendData, setProgressSendData] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const checkFirstName = (event) => {
    ValidationService.incorrectInputInfo("user-sign-up-input", !ValidationService.isLetter(event.target.value),
      0, "First name I is required");
    setUserFirstNameI(event.target.value);
  };

  const checkLastName = (event) => {
    ValidationService.incorrectInputInfo("user-sign-up-input", !ValidationService.isLetter(event.target.value),
      2, "Last name I is required");
    setUserLastNameI(event.target.value);
  };

  const checkValidEmail = (event) => {
    ValidationService.incorrectInputInfo("user-sign-up-input", !ValidationService.isEmailValid(event.target.value),
      4, "E-mail is incorrect");
    setUserEmail(event.target.value);
  };

  const checkPassword = (event) => {
    ValidationService.incorrectInputInfo("user-sign-up-input", !ValidationService.isValidPassword(event.target.value),
      5, "Password is required");
    setUserPassword(event.target.value);
  };

  const checkVerifyPassword = (event) => {
    ValidationService.incorrectInputInfo("user-sign-up-input", event.target.value !== userPassword || userPassword === "",
      6, "Passwords are different");
    setVerifyPassword(event.target.value);
  };

  const showGenders = () => {
    let genderPanel = document.getElementsByClassName("sign-up-gender-panel")[0];
    let genderAccordion = document.getElementsByClassName("sign-up-gender-accordion")[0];
    let genderArrow = document.getElementsByClassName("sign-up-gender-arrow")[0];
    if (openAccordion) {
      setOpenAccordion(false);
      genderPanel.style.display = "none";
      genderAccordion.style.height = "3rem";
      genderArrow.style.rotate = "0deg";
    } else {
      setOpenAccordion(true);
      genderPanel.style.display = "flex";
      genderAccordion.style.height = "12rem";
      genderArrow.style.rotate = "180deg";
    }
  };

  const chooseUserGender = (gender) => {
    setUserGender(gender);
  };

  const checkTermsAndCondition = () => {
    termsAndCondition ? setTermsAndCondition(false) : setTermsAndCondition(true);
  };

  const displayModal = (view) => {
    if (modalTitle === ModalContent.signUpEmailVerificationTitle) {
      setOpenModal(view);
      navigate("/");
      RedirectService.reloadPage();
    } else if (modalTitle === ModalContent.signUpRegistrationFailedTitle) {
      setOpenModal(view);
      RedirectService.reloadPage();
    } else {
      setOpenModal(view);
    }
  };

  const checkCredentialsAndSignUp = () => {
    if (userFirstNameI.trim() === "" || userLastNameI.trim() === "" || userEmail.trim() === "" ||
      userPassword.trim() === "" || userGender.trim() === "" || termsAndCondition === false) {
      setModalTitle(ModalContent.signUpParamMissingTitle);
      setModalBody(ModalContent.signUpParamMissingBody);
      displayModal(true);
    } else if (userPassword !== verifyPassword) {
      setModalTitle(ModalContent.signUpDifferentPasswordTitle);
      setModalBody(ModalContent.signUpDifferentPasswordBody);
      displayModal(true);
    } else {
      setProgressSendData(true);
      registerUser();
    }
  };

  const registerUser = () => {
    let upperCaseUserGender = userGender.toUpperCase();
    let registerRequest = {userFirstNameI, userFirstNameII, userLastNameI, userLastNameII, userEmail,
      userPassword, upperCaseUserGender, termsAndCondition}

    AuthService.signUp(registerRequest)
      .then((response) => {
        setProgressSendData(false);
        if (response.status === 201) {
          setModalTitle(ModalContent.signUpEmailVerificationTitle);
          setModalBody(ModalContent.signUpEmailVerificationBody);
        } else if (response.status === 403) {
          setModalTitle(ModalContent.signUpEmailExistTitle);
          setModalBody(ModalContent.signUpEmailExistBody);
          // let modalButtonContainer = document.getElementsByClassName("modal-actions-buttons-container")[0];
          // let resendButton = document.createAttribute(<Button sx={style.signUpButtonStyle}>Resend</Button>);
          // modalButtonContainer.appendChild(resendButton);
        } else {
          setModalTitle(ModalContent.signUpRegistrationFailedTitle);
          setModalBody(ModalContent.signUpRegistrationFailedBody + response.data);
        }
        displayModal(true);
      })
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-container-inherit">
        <div className="sign-up-component">
          <div className="sign-up-header">
            <h1>Sign up</h1>
            <hr className="sign-up-hr-line animate__animated animate__fadeInLeftBig"></hr>
          </div>
          <div className="sign-up-body">
            <form className="sign-up-form">
              <span className="icon-input-inline">
                <PersonIcon fontSize="large" className="sign-up-icon-style"/>
                <label htmlFor={userFirstNameI} className="sign-up-label-style">
                  <input className="user-sign-up-input" type="text" value={userFirstNameI} name="user-first-name-i"
                    placeholder="First name I" onChange={checkFirstName}/>
                </label>
              </span>
              <span className="icon-input-inline">
                <PersonAddAlt1Icon fontSize="large" className="sign-up-icon-style"/>
                <label htmlFor={userFirstNameII} className="sign-up-label-style">
                  <input className="user-sign-up-input" type="text" value={userFirstNameII} name="user-first-name-ii"
                    placeholder="First name II" onChange={(e) => setUserFirstNameII(e.target.value)}/>
                </label>
              </span>
              <span className="icon-input-inline">
                <PersonOutlineOutlinedIcon fontSize="large" className="sign-up-icon-style"/>
                <label htmlFor={userLastNameI} className="sign-up-label-style">
                  <input className="user-sign-up-input" type="text" value={userLastNameI} name="user-last-name-i"
                    placeholder="Last name I" onChange={checkLastName}/>
                </label>
              </span>
              <span className="icon-input-inline">
                <PersonAddAltOutlinedIcon fontSize="large" className="sign-up-icon-style"/>
                <label htmlFor={userLastNameII} className="sign-up-label-style">
                  <input className="user-sign-up-input" type="text" value={userLastNameII} name="user-last-name-ii"
                    placeholder="Last name II" onChange={(e) => setUserLastNameII(e.target.value)}/>
                </label>
              </span>
              <span className="icon-input-inline">
                <AlternateEmailIcon fontSize="large" className="sign-up-icon-style"/>
                <label htmlFor={userEmail} className="sign-up-label-style">
                  <input className="user-sign-up-input" type="email" value={userEmail} name="user-email"
                    placeholder="E-mail" onChange={checkValidEmail}/>
                </label>
              </span>
              <span className="icon-input-inline">
                <KeyIcon fontSize="large" className="sign-up-icon-style"/>
                <label htmlFor={userPassword} className="sign-up-label-style">
                  <input className="user-sign-up-input" type="password" value={userPassword} name="user-password"
                    placeholder="Password" autoComplete="current-password" onChange={checkPassword}/>
                </label>
              </span>
              <span className="icon-input-inline">
                <LockIcon fontSize="large" className="sign-up-icon-style"/>
                <label htmlFor={verifyPassword} className="sign-up-label-style">
                  <input className="user-sign-up-input" type="password" value={verifyPassword} name="verify-password"
                    placeholder="Retype password" autoComplete="current-password" onChange={checkVerifyPassword}/>
                </label>
              </span>
              <span className="icon-input-inline">
                <WcIcon fontSize="large" className="sign-up-icon-style"/>
                <div className="sign-up-gender-accordion">
                  <span className="icon-input-inline" onClick={() => showGenders()}>
                    {userGender ? <p>{userGender}</p> : <p>Choose gender</p>}
                    <ArrowDownward fontSize="small" className="sign-up-gender-arrow"/>
                  </span>
                  <div className="sign-up-gender-panel animate__animated animate__fadeInLeftBig">
                    <span className="gender-radio-input-inline-span" onClick={() => chooseUserGender("Male")}>
                      {userGender === "Male" ? <CheckBoxIcon fontSize="small"/> : <CheckBoxOutlineBlankIcon fontSize="small"/>}
                      <input className="gender-radio-input" type="radio" id="male" value="Male"
                        checked={userGender === "Male"}/>
                      <label htmlFor="male">Male</label>
                    </span>
                    <span className="gender-radio-input-inline-span" onClick={() => chooseUserGender("Female")}>
                      {userGender === "Female" ? <CheckBoxIcon fontSize="small"/> : <CheckBoxOutlineBlankIcon fontSize="small"/>}
                      <input className="gender-radio-input" type="radio" id="female" value="Female"
                        checked={userGender === "Female"}/>
                      <label htmlFor="female">Female</label>
                    </span>
                    <span className="gender-radio-input-inline-span" onClick={() => chooseUserGender("Other")}>
                      {userGender === "Other" ? <CheckBoxIcon fontSize="small"/> : <CheckBoxOutlineBlankIcon fontSize="small"/>}
                      <input className="gender-radio-input" type="radio" id="other" value="Other"
                             checked={userGender === "Other"}/>
                      <label htmlFor="other">Other</label>
                    </span>
                  </div>
                </div>
              </span>
              <span className="icon-input-inline">
                {termsAndCondition ?
                <CheckBoxIcon fontSize="large" className="sign-up-icon-style" onClick={checkTermsAndCondition}/>
                :
                <CheckBoxOutlineBlankIcon fontSize="large" className="sign-up-icon-style" onClick={checkTermsAndCondition}/>}
                <label className="sign-up-label-style">
                  <input className="user-sign-up-checkbox" type="checkbox" checked={termsAndCondition} name="terms-and-condition"/>
                  <span className="terms-and-condition-label"><h3>I agree to Terms and Condition</h3></span>
                </label>
              </span>
            </form>
            {progressSendData ?
            <CircularProgress sx={style.signUpProgressCircle}/>
            :
            <Button sx={style.loginButtonStyle} onClick={() => checkCredentialsAndSignUp()}>Sign up</Button>
            }
          </div>
          <hr className="sign-up-hr-line animate__animated animate__fadeInLeftBig"></hr>
          <div className="sign-up-instruction">
            <h4>
              Password must contain between eight and fifteen characters and at least one capital letter,
              one lower case letter, one number and one special character.
            </h4>
          </div>
        </div>
        <div className="sign-up-side-info">
          <h1>{textContent.loginPageHeader}</h1>
          <p>{textContent.loginPageText}</p>
        </div>
      </div>
      {openModal && <Modal modalTitle={modalTitle} modalBody={modalBody} displayModal={displayModal}/>}
    </div>
  );
}

export default SignUp;