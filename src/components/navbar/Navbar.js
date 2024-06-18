import "./NavbarStyle.css";
import '../../../node_modules/animate.css/animate.css';
import COMPANY_LOGO from "../../resources/images/navbar/transparent_logo.png";
import style from "../../constans/overwriteMaterialUiStyle";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuIcon from '@mui/icons-material/Menu';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import CloseIcon from '@mui/icons-material/Close';
import {HashLink} from "react-router-hash-link";
import {Badge, Button, IconButton, Menu, MenuItem} from "@mui/material";
import React, {useEffect, useState} from "react";
import SearchBar from "./search_bar/SearchBar";
import {useDispatch, useSelector} from "react-redux";
import CookieService from "../../services/cookieService";
import AuthService from "../../services/authenticationService";
import {StompSessionProvider, useStompClient} from "react-stomp-hooks";
import Notification from "./notification/Notification";
import SockJsClient from "react-stomp";

function Navbar() {

  const dispatch = useDispatch();
  const session = useSelector(state => state.sessionActive);

  useEffect(() => {
    updateSession();
  }, [session.sessionActive]);

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
      AuthService.signOut();
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
              {/*<li><HashLink smooth to="/user-profile" onClick={() => closeMenuAndUserList("signIn")}>*/}
              {/*  <AccountBoxIcon fontSize="large" sx={style.navbarUserIcon}/>*/}
              {/*</HashLink></li>*/}
              {/*<Button onClick={publishMessage}> Send message </Button>*/}
              {/*<StompSessionProvider url={"http://localhost:8080/user-notification"}>*/}
              {/*<SockJsClient*/}
              {/*  url={SOCKET_URL}*/}
              {/*  topics={['/topic/reply']}*/}
              {/*  onConnect={onConnected}*/}
              {/*  onDisconnect={console.log("Disconnected!")}*/}
              {/*  onMessage={msg => onMessageReceived("Hello world")}*/}
              {/*  debug={true}*/}
              {/*>*/}

              {/*</SockJsClient>*/}
              {/*<div>{message}</div>*/}
              <Notification/>
              {/*</StompSessionProvider>*/}
              {/*<IconButton variant="contained" size="large" onClick={showNotifications} style={style.navbarButtonStyle}>*/}
              {/*  <Badge badgeContent={3} color="primary"><MarkunreadIcon/></Badge>*/}
              {/*</IconButton>*/}
              {/*<Menu open={openNotification} onClose={closeNotification} anchorOrigin={style.notificationAnchor}*/}
              {/*  marginThreshold={60} sx={style.notificationModal}>*/}
              {/*  <MenuItem sx={style.notificationItem} dense={false}>*/}
              {/*    <p><strong>John Paul</strong> with e-mail <strong>john@gmail.com</strong> want to join to <strong>Fca sp. z o.o.</strong></p>*/}
              {/*    <div className="membership-confirmation-buttons">*/}
              {/*      <Button sx={style.membershipButton} variant="outlined" size="small" onClick={() => confirmMembership()}>Confirm</Button>*/}
              {/*      <Button sx={style.membershipButton} variant="outlined" size="small" onClick={() => rejectMembership()}>Reject</Button>*/}
              {/*    </div>*/}
              {/*  </MenuItem>*/}
              {/*</Menu>*/}
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