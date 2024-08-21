import "./NavbarStyle.css";
import '../../../node_modules/animate.css/animate.css';
import COMPANY_LOGO from "../../resources/images/navbar/transparent_logo.png";
import style from "../../constans/overwriteMaterialUiStyle";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {HashLink} from "react-router-hash-link";
import {Button} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import CookieService from "../../services/cookieService";
import Notification from "./notification/Notification";
import {useSubscription} from "react-stomp-hooks";
import LocalStorageService from "../../services/localStorageService";
import {useNavigate} from "react-router-dom";
import RedirectService from "../../services/redirectionService";

function Navbar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const session = useSelector(state => state.sessionActive);

  useEffect(() => {
    updateSession();
    if (session.sessionActive) {
      const intervalId = setInterval(() => {
        if (CookieService.getCookie() === null) {
          LocalStorageService.logOut();
          navigate("/");
          RedirectService.reloadPage();
        }
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, [session.sessionActive]);

  useSubscription("/user/queue/refresh-token", (refreshToken) => {
    CookieService.setCookie(refreshToken.body);
  });

  const [previousScrollPosition, setPreviousScrollPosition] = useState(window.scrollY);
  const [buttonClassName, setButtonClassName] = useState("fas fa-bars");
  const [menuListClassName, setMenuListClassName] = useState("navbar-menu-list");
  const [userListClassName, setUserListClassName] = useState("navbar-user-list");
  const [openMenuIcon, setOpenMenuIcon] = useState(true);
  const [openUserIcon, setOpenUserIcon] = useState(true);

  window.onscroll = () => {
    let currentScrollPosition = window.scrollY;
    let navbar = document.getElementsByClassName("navbar-container")[0];
    if (previousScrollPosition > currentScrollPosition) {
      navbar.style.top = "0rem";
    } else {
      navbar.style.top = "-6rem";
    }
    setPreviousScrollPosition(currentScrollPosition);
  };

  const openMenuList = () => {
    buttonClassName === "fas fa-bars" ?
      setButtonClassName("fas fa-times") : setButtonClassName("fas fa-bars");
    menuListClassName === "navbar-menu-list active" ?
      setMenuListClassName("navbar-menu-list") : setMenuListClassName("navbar-menu-list active");
    if (menuListClassName === "navbar-menu-list") {
      setUserListClassName("navbar-user-list");
      setOpenUserIcon(true);
    }
    openMenuIcon ? setOpenMenuIcon(false) : setOpenMenuIcon(true);
  };

  const openUserList = () => {
    buttonClassName === "fas fa-bars" ?
      setButtonClassName("fas fa-times") : setButtonClassName("fas fa-bars");
    userListClassName === "navbar-user-list active" ?
      setUserListClassName("navbar-user-list") : setUserListClassName("navbar-user-list active");
    if (userListClassName === "navbar-user-list") {
      setMenuListClassName("navbar-menu-list");
      setOpenMenuIcon(true);
    }
    openUserIcon ? setOpenUserIcon(false) : setOpenUserIcon(true);
  };

  const closeMenuAndUserList = (sessionState) => {
    setOpenUserIcon(true);
    setOpenMenuIcon(true);
    setUserListClassName("navbar-user-list");
    setMenuListClassName("navbar-menu-list");
    if (sessionState === "signOut") {
      dispatch({type: sessionState});
      CookieService.removeCookie();
      LocalStorageService.logOut();
    }
  };

  const updateSession = () => {
    if (CookieService.getCookie() !== null) {
      dispatch({type: "signIn"});
    } else if (CookieService.getCookie() === null) {
      dispatch({type: "signOut"});
    }
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-container-item">
        <div className="menu-icons">
          <Button className={buttonClassName} variant="contained" size="large" onClick={openMenuList} style={style.navbarButtonStyle}>
            {openMenuIcon ? <MenuIcon/> : <CloseIcon/>}</Button>
        </div>
        <ul className={menuListClassName}>
          <li><HashLink smooth to="/#section-one" onClick={() => closeMenuAndUserList("signIn")}>Home</HashLink></li>
          <li><HashLink smooth to="/#about" onClick={() => closeMenuAndUserList("signIn")}>About</HashLink></li>
          <li><HashLink smooth to="/#service" onClick={() => closeMenuAndUserList("signIn")}>Services</HashLink></li>
          <li><HashLink smooth to="/#price" onClick={() => closeMenuAndUserList("signIn")}>Price</HashLink></li>
        </ul>
      </div>
      <div className="navbar-container-item">
        <h1 className="company-logo animate__animated animate__flipInX">
          <img src={COMPANY_LOGO} alt="Company Logo" width="220px"/>
        </h1>
      </div>
      <div className="navbar-container-item">
        <div className="menu-icons">
          <Button className={buttonClassName} variant="contained" size="large" onClick={openUserList} style={style.navbarButtonStyle}>
            {openUserIcon ? <AccountCircleIcon/> : <CloseIcon/>}
          </Button>
        </div>
        <ul className={userListClassName}>
          {/*<li><SearchBar/></li>*/}
          {session.sessionActive ?
            <>
              <li><HashLink smooth to="/user-panel" onClick={() => closeMenuAndUserList("signIn")}>Company</HashLink></li>
              <li><HashLink smooth to="/user-profile" onClick={() => closeMenuAndUserList("signIn")}>Profile</HashLink></li>
              <li><HashLink smooth to="/" onClick={() => closeMenuAndUserList("signOut")}>Sign out</HashLink></li>
              <Notification/>
            </>
            :
            <>
              <li><HashLink smooth to="/sign-in" onClick={() => closeMenuAndUserList("signIn")}>Sign in</HashLink></li>
              <li><HashLink smooth to="/sign-up" onClick={() => closeMenuAndUserList("signIn")}>Sign up</HashLink></li>
            </>}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;