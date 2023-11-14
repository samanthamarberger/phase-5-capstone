import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


function Calendar({ events, eventClick, dateClick }) {

    return (
        <div className="calendar">
            <FullCalendar 
            initialView='dayGridMonth'
            headerToolbar={{
                left: "prev,next,today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay"
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            timeZone='local'
            events={events}
            selectable={true}
            eventClick={eventClick}
            dateClick={dateClick}
            />
        </div>
    )
}

export default Calendar