import "./SignInStyle.css";
import '../../../node_modules/animate.css/animate.css';
import textContent from "../../constans/textContent";
import style from "../../constans/overwriteMaterialUiStyle";
import KeyIcon from '@mui/icons-material/Key';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AuthService from "../../services/authenticationService";
import ModalContent from "../../constans/modalContent";
import Modal from "../../components/modal/Modal";
import {Button, CircularProgress} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useStompClient, useSubscription} from "react-stomp-hooks";
import LocalStorageService from "../../services/localStorageService";
import CookieService from "../../services/cookieService";

function SignIn() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stompClient = useStompClient();
  const [queryParameters] = useSearchParams();

  useEffect(() => {
    verifyNewAccount();
    verifyNewMembership();
  }, [queryParameters]);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [progressSendData, setProgressSendData] = useState(false);

  const verifyNewAccount = () => {
    if (queryParameters.get("verify-code") !== null) {
      setModalTitle(ModalContent.signUpSuccessfullyVerificationTitle);
      setModalBody(ModalContent.signUpSuccessfullyVerificationBody);
      displayModal(true);
    }
  };

  const verifyNewMembership = () => {
    if (queryParameters.get("join-to-company") !== null) {
      setModalTitle(ModalContent.successfullyJoinToCompanyTitle);
      setModalBody(ModalContent.successfullyJoinToCompanyBody);
      displayModal(true);
    }
  };

  const updateSession = () => {
    dispatch({type: "signIn"});
  };

  const displayModal = (view) => {
    setOpenModal(view);
  };

  const goToPage = (route) => {
    navigate(route);
  };

  const getWebsocketUserPrincipal = () => {
    stompClient.publish({
      destination : "/app/get-principal-name",
      headers : CookieService.getCookie()
    });
  };

  const loginToAccount = () => {
    if (userEmail !== "" && userPassword !== "") {
      setProgressSendData(true);
      let authenticationRequest = {userEmail, userPassword};
      let authenticate;
      if (queryParameters.get("verify-code") !== null) {
        authenticate = AuthService.signInToActivateAccount(queryParameters.get("verify-code"), authenticationRequest);
      } else if (queryParameters.get("join-to-company") !== null) {
        authenticate = AuthService.signInToJoinToCompany(queryParameters.get("join-to-company"), authenticationRequest);
      } else {
        authenticate = AuthService.signIn(authenticationRequest);
      }
      authenticate
        .then(() => {
          setProgressSendData(false);
          getWebsocketUserPrincipal();
          updateSession();
          goToPage("/user-panel");
        })
        .catch((error) => {
          setProgressSendData(false);
          setModalTitle(ModalContent.signInWrongCredentialsTitle);
          setModalBody(error.response.data);
          displayModal(true);
        })
    } else {
      setModalTitle(ModalContent.signInParamMissingTitle);
      setModalBody(ModalContent.signInParamMissingBody);
      displayModal(true);
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-container-inherit">
        <div className="sign-in-component">
          <div className="sign-in-header">
            <h1>Sign in</h1>
            <hr className="sign-in-hr-line animate__animated animate__fadeInLeftBig"></hr>
          </div>
          <div className="sign-in-body">
            <form className="sign-in-form">
              <span className="icon-input-inline">
                <AlternateEmailIcon fontSize="large" className="sign-in-icon-style"/>
                <label htmlFor={userEmail} className="sign-in-label-style">
                  <input className="user-sign-in-input" type="email" value={userEmail} name="user-email"
                    placeholder="E-mail" onChange={(e) => setUserEmail(e.target.value)}/>
                </label>
              </span>
              <span className="icon-input-inline">
                <KeyIcon fontSize="large" className="sign-in-icon-style"/>
                <label htmlFor={userPassword} className="sign-in-label-style">
                  <input className="user-sign-in-input" type="password" value={userPassword} name="user-password"
                    placeholder="Password" autoComplete="current-password" onChange={(e) => setUserPassword(e.target.value)}/>
                </label>
              </span>
            </form>
            {progressSendData ?
              <CircularProgress sx={style.signUpProgressCircle}/>
              :
              <Button sx={style.loginButtonStyle} onClick={() => loginToAccount()}>Sign in</Button>
            }
          </div>
          <hr className="sign-in-hr-line animate__animated animate__fadeInLeftBig"></hr>
          <div className="sign-in-reset-password">
            <h3>Forgot your password?</h3>
            <Button sx={style.signUpButtonStyle} onClick={() => goToPage("/reset-password")}>Reset password</Button>
          </div>
          <div className="sign-in-redirect">
            <h3>You don't have an account?</h3>
            <Button sx={style.signUpButtonStyle} onClick={() => goToPage("/sign-up")}>Sign up</Button>
          </div>
        </div>
        <div className="sign-in-side-info">
          <h1>{textContent.loginPageHeader}</h1>
          <p>{textContent.loginPageText}</p>
        </div>
      </div>
      {openModal && <Modal modalTitle={modalTitle} modalBody={modalBody} displayModal={displayModal}/>}
    </div>
  );
}

export default SignIn;