import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


function Calendar({ events, eventClick }) {

    return (
        <div className="Calendar">
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
            // editable={true}
            selectable={true}
            // select={handleDateSelect}
            eventClick={eventClick}
            />
        </div>
    )
}

export default Calendar