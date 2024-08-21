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
  eventModalDateTimeStyle : {
    display : "flex",
    flexDirection : "row",
    alignItems : "stretch",
    alignContent : "stretch",
    margin : "5%",
  },
  radioControlFieldsStyle : {
    color: "#D3AC2B",
    '&.Mui-checked': {
      color: "#a69044",
    },
  },
  newEventFieldsStyle : {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: "#D3AC2B"
      },
      '&:hover fieldset': {
        borderColor: "#a69044",
      },
      '&.Mui-focused fieldset': {
        borderColor: "#D3AC2B",
      },
    },
    '& .MuiFormLabel-root': {
      color : "#D3AC2B",
      '&.Mui-focused': {
        color: "#a69044"
      },
    },
    margin : "3%",
  },
  newEventTextFieldStyle : {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: "#D3AC2B",
        color: "#D3AC2B"
      },
      '&:hover fieldset': {
        borderColor: "#a69044",
        color : "#a69044"
      },
      '&.Mui-focused fieldset': {
        borderColor: "#D3AC2B",
        color: "#D3AC2B"
      },
    },
    '& .MuiFormLabel-root': {
      color: "#D3AC2B",
      '&.Mui-focused': {
        color: "#a69044"
      }
    },
    '& .MuiInputBase-root': {
      width: '170%',
    },
    '& .MuiFormHelperText-root': {
      color : "#D3AC2B"
    },
    margin : "3%",
  },
  signUpProgressCircle : {
    display : "flex",
    marginLeft : "46%",
    marginBottom : "1.5%",
    color : "#D3AC2B",
  },
  invitationUpProgressCircle : {
    display : "flex",
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
  },
  eventDetailsButton : {
    maxLength : "1rem",
    borderColor: "#D3AC2B",
    color: "#D3AC2B",
    "&:hover": {
      borderColor: "#a69044",
      color: "#a69044",
      backgroundColor: "floralwhite"
    }
  },
  calendarTheme : {
    '& .MuiStack-root' : {
      display : "flex",
      border: "solid 2px #D3AC2B",
      borderRadius : "3px",
      height: "21.5rem",
      width: "20.5rem"
    },
    '& .MuiDateCalendar-root' : {
      marginBottom : "1%",
    },
    '& .MuiPickersCalendarHeader-labelContainer': {
      fontSize : "90%",
      fontWeight: "bold",
      fontFamily : "Cambria, serif"
    },
    '& .MuiDayCalendar-weekDayLabel': {
      fontSize : "90%",
      fontFamily : "Cambria, serif",
      margin : "1% 2% 1% 2%"
    },
    '& .MuiDayCalendar-monthContainer': {
      margin : "0 1% 0 1%",
      fontSize : "90%",
      fontFamily : "Cambria, serif",
    },
    '& .MuiPickersDay-dayWithMargin': {
      width: 40.5,
      height: 44.5,
      fontSize: "110%"
    },
    '& .MuiPickersDay-root.Mui-selected' : {
      backgroundColor : "#D3AC2B !important",
      "&:hover &:focus": {
        backgroundColor: "#a69044 !important"
      },
      borderRadius : "15%"
    },
    '& .MuiPickersDay-root': {
      borderRadius: "15%",
    }
  }
}

export default style;