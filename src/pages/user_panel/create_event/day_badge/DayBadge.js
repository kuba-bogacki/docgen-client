import {Badge} from "@mui/material";
import {PickersDay} from "@mui/x-date-pickers";
import React from "react";

function DayBadge(props) {

  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge key={props.day.toString()} overlap="circular" badgeContent={isSelected ? '🔔' : undefined}>
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day}/>
    </Badge>
  );
};

export default DayBadge;