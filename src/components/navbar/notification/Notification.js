import "./NotificationStyle.css";
import React, {useEffect, useState} from "react";
import {useStompClient, useSubscription} from "react-stomp-hooks";
import {Badge, Button, IconButton, Menu, MenuItem} from "@mui/material";
import style from "../../../constans/overwriteMaterialUiStyle";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import CookieService from "../../../services/cookieService";
import NotificationService from "../../../services/notificationService";
import NotificationContent from "../../../constans/notificationContent";

function Notification() {

  const stompClient = useStompClient();

  const [notifications, setNotifications] = useState([]);
  const [openNotification, setOpenNotification] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    getNotifications();
  }, []);

  useSubscription("/user/queue/membership-petition", (newNotification) => {
    setNotifications(notificationArray => [...notificationArray, JSON.parse(newNotification.body)]);
  });

  useSubscription("/user/queue/event-info", (newNotification) => {
    setNotifications(notificationArray => [...notificationArray, JSON.parse(newNotification.body)]);
  });

  const getNotifications = () => {
    NotificationService.getUserNotification()
      .then((response) => {
        let notificationArray = [];
        response.data.forEach((notification) => {
          notificationArray.push(notification);
        });
        setNotifications(notificationArray);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateBadge = () => {
    return notifications.length;
  };

  const showNotifications = (event) => {
    setAnchorEl(event.currentTarget);
    openNotification === true || notifications.length === 0 ? setOpenNotification(false) : setOpenNotification(true);
    // notifications.length === 0 ? setOpenNotification(false) : setOpenNotification(true);
  };

  const closeNotification = () => {
    setAnchorEl(null);
    setOpenNotification(false);
  };

  const confirmMembership = (notification, event) => {
    let data = {
      notificationId : notification.notificationId,
      notificationCompanyId : notification.notificationCompanyId,
      notificationRequesterId : notification.notificationReceiverId,
      notificationReceiverId : notification.notificationRequesterId,
      notificationMessage : NotificationContent.membershipResponseMessage,
      notificationType : NotificationContent.membershipResponseType
    };

    stompClient.publish({
      destination : "/app/accept-membership-petition",
      body : JSON.stringify(data),
      headers : CookieService.getCookie()
    });
    removeFromNotificationsArray(notification.notificationId);
    showNotifications(event);
  };

  const deleteNotification = (notification, event) => {
    stompClient.publish({
      destination : "/app/delete-notification",
      body : notification.notificationId,
      headers : CookieService.getCookie()
    });
    removeFromNotificationsArray(notification.notificationId);
    showNotifications(event);
  };

  const removeFromNotificationsArray = (notificationId) => {
    let notificationArray = [];
    notifications.forEach((notification) => {
      if (notification.notificationId !== notificationId) {
        notificationArray.push(notification);
      }
    });
    setNotifications(notificationArray);
  };

  return (
    <div className="notification-container">
      <IconButton variant="contained" size="large" onClick={(event) => showNotifications(event)} style={style.navbarButtonStyle}>
        <Badge badgeContent={updateBadge()} color="primary"><MarkunreadIcon/></Badge>
      </IconButton>
      <Menu open={openNotification} onClose={closeNotification} anchorOrigin={style.notificationAnchor} anchorEl={anchorEl}
            marginThreshold={60} sx={style.notificationModal}>
        {notifications.map((notification, index) =>
          <MenuItem sx={style.notificationItem} dense={false} key={index}>
            <p><strong>{notification.notificationMessage}</strong></p>
            {notification.notificationType === "MEMBERSHIP_REQUEST" ?
              <div className="membership-confirmation-buttons">
                <Button sx={style.membershipButton} variant="outlined" size="small" onClick={(event) => confirmMembership(notification, event)}>Confirm</Button>
                <Button sx={style.membershipButton} variant="outlined" size="small" onClick={(event) => deleteNotification(notification, event)}>Ignore</Button>
              </div>
              :
              <div className="membership-confirmation-buttons">
                <Button sx={style.membershipButton} variant="outlined" size="small" onClick={(event) => deleteNotification(notification, event)}>Delete</Button>
              </div>
            }
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}

export default Notification;