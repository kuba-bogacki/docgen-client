const style = {
  navbarButtonStyle : {
    color : "floralwhite",
    backgroundColor : "transparent"
  },
  outlinedButtonStyle : {
    display: "none",
    fontSize: "70%",
    width: "100%",
    borderColor: "#D3AC2B",
    color: "#D3AC2B",
    "&:hover": {
      borderColor: "#a69044",
      color: "#a69044",
      backgroundColor: "floralwhite"
    }
  },
  containedButtonStyle : {
    display: "none",
    fontSize: "70%",
    width: "100%",
    borderColor : "#D3AC2B",
    backgroundColor : "#D3AC2B",
    "&:hover": {
      borderColor: "#a69044",
      backgroundColor: "#a69044"
    }
  },
  loginButtonStyle : {
    width: "100%",
    height: "3rem",
    fontSize: "80%",
    color: "floralwhite",
    borderColor : "#D3AC2B",
    backgroundColor : "#D3AC2B",
    "&:hover": {
      borderColor: "#a69044",
      backgroundColor: "#a69044"
    }
  },
  signUpButtonStyle : {
    width: "100%",
    height: "3rem",
    fontSize: "80%",
    border: "2px solid",
    borderColor: "#D3AC2B",
    color: "#D3AC2B",
    "&:hover": {
      borderColor: "#a69044",
      color: "#a69044",
      backgroundColor: "floralwhite"
    }
  },
  twitterIconStyle : {
    marginRight: "5px",
    cursor: "pointer",
    transition: "transform 450ms ease",
    "&:hover": {
      color: "#1DA1F2",
      transform: "rotate(15deg)"
    }
  },
  facebookIconStyle : {
    marginRight: "5px",
    cursor: "pointer",
    transition: "transform 450ms ease",
    "&:hover": {
      color: "#4267B2",
      transform: "rotate(15deg)"
    }
  },
  instagramIconStyle : {
    marginRight: "5px",
    cursor: "pointer",
    transition: "transform 450ms ease",
    "&:hover": {
      color: "#E1306C",
      transform: "rotate(15deg)"
    }
  },
  largeIconMargin : {
    marginTop : "6px",
    color: '#D3AC2B'
  },
  nonDecoratedLink : {
    textDecoration: "none"
  },
  modalTitleStyle : {
    textAlign : "center",
    fontSize : "120%",
    color : "#987d1a"
  },
  modalBodyStyle : {
    textAlign : "center",
    color : "#777777"
  },
  signUpProgressCircle : {
    display : "flex",
    marginLeft : "46%",
    marginBottom : "1.5%",
    color : "#D3AC2B",
  },
  invitationUpProgressCircle : {
    display : "flex",
    // marginRight : "46%",
    marginBottom : "1.5%",
    color : "#D3AC2B",
  },
  navbarUserIcon : {
    marginTop : "40%",
    marginRight : "50%"
  },
  notificationAnchor : {
    horizontal: "right",
    vertical: "top",
  },
  notificationModal : {
    maxWidth : "40%"
  },
  notificationItem : {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "flex-start",
    flexWrap: "wrap",
    margin: "2% 0 2% 0"
  },
  membershipButton : {
    color: "floralwhite",
    borderColor : "#D3AC2B",
    backgroundColor : "#D3AC2B",
    "&:hover": {
      borderColor: "#a69044",
      backgroundColor: "#a69044"
    }
  }
}

export default style;