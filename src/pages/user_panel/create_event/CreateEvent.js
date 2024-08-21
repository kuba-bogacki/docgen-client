import "./CreateEventStyle.css";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import React, {useEffect, useState} from "react";
import {DemoItem} from "@mui/x-date-pickers/internals/demo";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  useMediaQuery,
  useTheme
} from "@mui/material";
import style from "../../../constans/overwriteMaterialUiStyle";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {addDays, format, parse} from "date-fns";
import {DateField, DayCalendarSkeleton, TimeField} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import EventService from "../../../services/eventService";
import NotificationContent from "../../../constans/notificationContent";
import CookieService from "../../../services/cookieService";
import DayBadge from "./day_badge/DayBadge";
import {useStompClient} from "react-stomp-hooks";
import LocalStorageService from "../../../services/localStorageService";
import ToolTip from "../../../components/tooltip/ToolTip";
import Modal from "../../../components/modal/Modal";

function CreateEvent() {

  const stompClient = useStompClient();
  const fullScreen = useMediaQuery(useTheme().breakpoints.down('md'));

  const [defaultCalendarDate, setDefaultCalendarDate] = useState(dayjs(format(new Date(), "yyyy-MM-dd")));
  const [companyEvents, setCompanyEvents] = useState([]);
  const [companyEventsPerDay, setCompanyEventsPerDay] = useState([]);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [eventType, setEventType] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteEventOpen, setDeleteEventOpen] = useState(false);
  const [badgesIsLoading, setBadgesIsLoading] = useState(true);
  const [toDeletedEventId, setToDeletedEventId] = useState(null);

  useEffect(() => {
    const formattedDateString = format(new Date(), "dd-MM-yyyy");
    setSelectedDate(formattedDateString);
    getCompanyEvents();
    getCompanyEventsPerDay(formattedDateString);
  }, []);

  const handleDateChange = (date) => {
    const parsedDate = parse(`${date}`, "EEE, dd MMM yyyy HH:mm:ss 'GMT'", new Date());
    const formattedDateString = format(addDays(parsedDate, 1), "dd-MM-yyyy");
    setSelectedDate(formattedDateString);
    getCompanyEventsPerDay(formattedDateString);
  };

  const handleMonthChange = (date, companyEvents) => {
    const parsedDate = parse(`${date}`, "EEE, dd MMM yyyy HH:mm:ss 'GMT'", new Date());
    const formattedDate = format(addDays(parsedDate, 1), "MM-yyyy");
    const filterEvents = companyEvents.filter(companyEvent => companyEvent.eventDate.includes(formattedDate));
    let daysArray = [];
    filterEvents.forEach(singleEvent => daysArray.push(parseInt(singleEvent.eventDate.substring(0, 2))));
    setHighlightedDays(daysArray);
    setBadgesIsLoading(false);
  };

  const handleTimeChange = (time) => {
    const formattedTime = time.format('HH:mm');
    setSelectedTime(formattedTime);
  };

  const openEventModal = () => {
    const currentDate = new Date();
    let time = `${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`;
    setSelectedTime(time);
    setModalOpen(true)
  };

  const closeEventModal = () => {
    setModalOpen(false);
    eraseStates();
  };

  const closeDeleteEventModal = () => {
    setToDeletedEventId(null);
    setDeleteEventOpen(false);
  };

  const openDeleteEventModal = (eventId) => {
    setToDeletedEventId(eventId);
    setDeleteEventOpen(true);
  };

  const modalDateFormatter = () => {
    let dateArray = selectedDate.split("-");
    return dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
  };

  const defaultCalendarDateFormatter = () => {
    const [day, month, year] = selectedDate.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return dayjs(format(date, "yyyy-MM-dd"));
  };

  const temporaryEventsCompanyArray = (newEvent) => {
    let temporaryEvents = companyEvents;
    temporaryEvents.push(newEvent);
    return temporaryEvents;
  };

  const removeEventFromArray = (eventId) => {
    setCompanyEventsPerDay((values) => {
      return values.filter((companyEvent) => companyEvent.eventId !== eventId);
    });

    setCompanyEvents((values) => {
      return values.filter((companyEvent) => companyEvent.eventId !== eventId);
    });
  };

  const addEventToDailyArray = (newEvent) => {
    let unsortedDailyArray = companyEventsPerDay;
    unsortedDailyArray.push(newEvent);
    unsortedDailyArray.sort((eventA, eventB) => {
      const [hoursA, minutesA] = eventA.eventTime.split(':').map(Number);
      const [hoursB, minutesB] = eventB.eventTime.split(':').map(Number);
      const timeA = new Date(0, 0, 0, hoursA, minutesA);
      const timeB = new Date(0, 0, 0, hoursB, minutesB);
      return timeA - timeB;
    });
    setCompanyEventsPerDay(unsortedDailyArray);
  };

  const eraseStates = () => {
    setEventTitle("");
    setSelectedTime(null);
    setEventType("");
  };

  const sendEventRequest = () => {
    let data = {
      notificationCompanyId : LocalStorageService.getCurrentCompany(),
      notificationMessage : NotificationContent.eventRequestMessage,
      notificationType : NotificationContent.eventRequestType
    };

    stompClient.publish({
      destination : "/app/send-new-event-info",
      body : JSON.stringify(data),
      headers : CookieService.getCookie()
    });
  };

  const getCompanyEventsPerDay = (date) => {
    EventService.getCompanyEventsByDate(date)
      .then((response) => {
        if (response.status === 200) {
          setCompanyEventsPerDay(response.data);
        } else {
          console.log(response.data);
        }
      });
  };

  const getCompanyEvents = () => {
    EventService.getAllCompanyEvents()
      .then((response) => {
        if (response.status === 200) {
          setCompanyEvents(response.data);
          handleMonthChange(dayjs(format(new Date(), "yyyy-MM-dd")), response.data);
        } else {
          console.log(response.data);
        }
      });
  };

  const deleteCompanyEvent = (eventId) => {
    setBadgesIsLoading(true);
    EventService.deleteEvent(eventId)
      .then((response) => {
        if (response.status === 200) {
          removeEventFromArray(eventId);
          //TODO: Remove badge after delete event
          setDefaultCalendarDate(defaultCalendarDateFormatter());
          handleMonthChange(defaultCalendarDateFormatter(), companyEvents);
        } else {
          console.log(response.data);
        }
      })
    closeDeleteEventModal();
  };

  const saveEventDetails = () => {
    let eventData = {
      eventCompany : LocalStorageService.getCurrentCompany(),
      eventTitle : eventTitle,
      eventDate : selectedDate,
      eventTime : selectedTime,
      eventType : eventType.toUpperCase()
    };
    EventService.saveNewEvent(eventData)
      .then((response) => {
        if (response.status === 201) {
          setCompanyEvents((events) => [...events, response.data]);
          addEventToDailyArray(response.data);
          setDefaultCalendarDate(defaultCalendarDateFormatter());
          handleMonthChange(defaultCalendarDateFormatter(), temporaryEventsCompanyArray(response.data));
          sendEventRequest();
        } else if (response.status === 503) {
          console.log(response.data);
        }
      })
    setModalOpen(false);
    eraseStates();
  };

  return (
    <div className="create-event-container">
      <header className="create-event-header">
        <h1>Create Event</h1>
      </header>
      <hr className="create-event-hr-line animate__animated animate__fadeInLeftBig"></hr>
      <main className="create-event-body">
        <h3>Company calendar with planned events</h3>
        <div className="create-event-calendar">
          <Box sx={style.calendarTheme} className="event-calendar-box">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem>
                <DateCalendar views={['month', 'day']} fixedWeekNumber={4} onChange={handleDateChange}
                  defaultValue={defaultCalendarDate} renderLoading={() => <DayCalendarSkeleton/>}
                  onMonthChange={(newDate) => handleMonthChange(newDate, companyEvents)} slots={{day: DayBadge}}
                  slotProps={{day: {highlightedDays}}} loading={badgesIsLoading}
                />
              </DemoItem>
            </LocalizationProvider>
          </Box>
          <Box sx={style.calendarTheme} className="event-calendar-box">
            <div className="planned-event-company">
              <div className="single-event-date-selected">
                <div className="event-priority-by-date-first">
                  <h4>{selectedDate}</h4>
                </div>
              </div>
              {companyEventsPerDay.length === 0 ?
                <div className="single-day-event-box">
                  <h5 className="single-event-element">
                    <i>No events planned for particular day</i>
                  </h5>
                </div>
                :
                <div className="single-day-event-box">
                  {companyEventsPerDay.map((event, index) =>
                    <div className="single-event-element" key={index}>
                      <div className="event-priority-by-date-first">
                        <ToolTip TooltipTitle={() => TooltipTitle(event)} TooltipContent={() => TooltipContent(event)}/>
                      </div>
                      <Button variant="text" sx={style.eventDetailsButton} onClick={() => openDeleteEventModal(event.eventId)}>
                        <DeleteForeverIcon fontSize="medium"/>
                      </Button>
                      <Dialog fullScreen={fullScreen} open={deleteEventOpen} on="true"
                        onClose={closeDeleteEventModal} aria-labelledby="responsive-dialog-title">
                        <DialogContent>
                          <DialogTitle sx={{color : "#181D31"}}>
                            <strong><i>Are you sure you want to delete this event?</i></strong>
                          </DialogTitle>
                        </DialogContent>
                        <DialogActions>
                          <Button autoFocus sx={style.eventDetailsButton} onClick={closeDeleteEventModal}>No</Button>
                          <Button autoFocus sx={style.membershipButton} onClick={() => deleteCompanyEvent(toDeletedEventId)}>Yes</Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  )}
                </div>
              }
              <div className="single-event-date-selected">
                <Button variant="text" sx={style.eventDetailsButton} onClick={() => openEventModal()}>
                  <AddCircleIcon fontSize="large"/>
                </Button>
              </div>
            </div>
          </Box>
        </div>
      </main>
      <hr className="create-event-hr-line animate__animated animate__fadeInLeftBig"></hr>
      {modalOpen &&
        <div className="event-modal-container">
          <Dialog open={modalOpen} onClose={closeEventModal}>
            <DialogTitle id="alert-dialog-title" sx={style.modalTitleStyle}>Create new event</DialogTitle>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DialogContent>
                <Box sx={style.eventModalDateTimeStyle}>
                  <TextField required id="outlined-required" label="Title" sx={style.newEventTextFieldStyle} value={eventTitle} onChange={(e) => setEventTitle(e.target.value)}/>
                </Box>
                <Box sx={style.eventModalDateTimeStyle}>
                  <DateField label="Date" defaultValue={dayjs(modalDateFormatter())} format="DD-MM-YYYY" readOnly sx={style.newEventFieldsStyle} onChange={handleDateChange}/>
                  <TimeField label="Time" defaultValue={dayjs(`${modalDateFormatter()}T${selectedTime}`)} format="HH:mm" sx={style.newEventFieldsStyle} onChange={handleTimeChange}/>
                </Box>
                <Box sx={style.eventModalDateTimeStyle}>
                  <FormControl sx={style.newEventFieldsStyle}>
                    <FormLabel id="demo-row-radio-buttons-group-label-event-type" sx={style.newEventFieldsStyle}>Type</FormLabel>
                    <RadioGroup column="true" aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={eventType} onChange={(e) => setEventType(e.target.value)}>
                      <FormControlLabel value="voting" control={<Radio sx={style.radioControlFieldsStyle}/>} label="Voting"/>
                      <FormControlLabel value="weekly" control={<Radio sx={style.radioControlFieldsStyle}/>} label="Weekly"/>
                      <FormControlLabel value="meeting" control={<Radio sx={style.radioControlFieldsStyle}/>} label="Meeting"/>
                      <FormControlLabel value="submit" control={<Radio sx={style.radioControlFieldsStyle}/>} label="Submit"/>
                    </RadioGroup>
                  </FormControl>
                </Box>
              </DialogContent>
            </LocalizationProvider>
            <DialogActions className="modal-actions-buttons-container">
              <Button sx={style.loginButtonStyle} onClick={() => saveEventDetails()}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>
      }
      {/*{openModal && <Modal modalTitle={modalTitle} modalBody={modalBody} displayModal={displayModal}/>}*/}
    </div>
  );
}

export default CreateEvent;

const TooltipTitle = (companyEvent) => {
  return (
    <h5><i>{companyEvent.eventTime} - {companyEvent.eventTitle}</i></h5>
  );
};

const TooltipContent = (companyEvent) => {
  return (
    <div>
      <p>Event type - {companyEvent.eventType.substring(0, 1) + companyEvent.eventType.substring(1).toLowerCase()}</p>
    </div>
  );
};