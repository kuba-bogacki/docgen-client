import "./CreateEventStyle.css";
import React from "react";

function CreateEvent() {
  return (
    <div className="create-event-container">
      <header className="create-event-header">
        <h1>Create Event</h1>
      </header>
      <hr className="create-event-hr-line animate__animated animate__fadeInLeftBig"></hr>
      <main className="create-event-body">
        <h3>Some calendar to create event</h3>
      </main>
      <hr className="create-event-hr-line animate__animated animate__fadeInLeftBig"></hr>
    </div>
  );
}

export default CreateEvent;