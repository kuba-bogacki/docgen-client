import "./NotificationStyle.css";
import React, {useState} from "react";
import {useStompClient, useSubscription} from "react-stomp-hooks";
import {Badge, Button, IconButton, Menu, MenuItem} from "@mui/material";
import style from "../../../constans/overwriteMaterialUiStyle";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import NotificationService from "../../../services/notificationService";
import CookieService from "../../../services/cookieService";
import LocalStorageService from "../../../services/localStorageService";
import CompanyService from "../../../services/companyService";

function Notification() {

  const stompClient = useStompClient();

  const [notifications, setNotifications] = useState([]);
  const [openNotification, setOpenNotification] = useState(false);

  useSubscription(`/topic/replay/${LocalStorageService.getCurrentCompany()}`, (newNotification) => {
    console.log(newNotification.body);
    setNotifications(notificationArray => [...notificationArray, newNotification.body]);
  });

  // const publishMessage = () => {
  //   stompClient.publish({destination: '/app/broadcast', body: 'testtest', headers : CookieService.getCookie()})
  //   console.log(notifications);
  // }

  const updateBadge = () => {
    return notifications.length;
  };

  const showNotifications = () => {
    openNotification === false ? setOpenNotification(true) : setOpenNotification(false);
  };

  const closeNotification = () => {
    setOpenNotification(false);
  };

  const confirmMembership = () => {
    // publishMessage();
    closeNotification();
  };

  const rejectMembership = () => {
    closeNotification();
  };

  return (
    <div className="notification-container">
      <IconButton variant="contained" size="large" onClick={showNotifications} style={style.navbarButtonStyle}>
        <Badge badgeContent={updateBadge()} color="primary"><MarkunreadIcon/></Badge>
      </IconButton>
      <Menu open={openNotification} onClose={closeNotification} anchorOrigin={style.notificationAnchor}
            marginThreshold={60} sx={style.notificationModal}>
        {notifications.map((notification, index) =>
          <MenuItem sx={style.notificationItem} dense={false} key={index}>
            <p><strong>{notification}</strong></p>
            <div className="membership-confirmation-buttons">
              <Button sx={style.membershipButton} variant="outlined" size="small" onClick={() => confirmMembership()}>Confirm</Button>
              <Button sx={style.membershipButton} variant="outlined" size="small" onClick={() => rejectMembership()}>Reject</Button>
            </div>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}

export default Notification;