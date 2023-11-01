import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/user";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


function Calendar() {

    const { user } = useContext(UserContext)
    const [appointments, setAppointments] = useState([])
    // console.log(user.appointments)

    useEffect(() => {
        const events = user.appointments.map(a => ({
            title: `My ${a.title} appointment with ${a.trainer_name}`,
            start: `${a.date}T${a.start}`,
            end: `${a.date}T${a.end}`,
        }))
        console.log(events)
        setAppointments(events)
    }, [user.appointments])

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
            events={appointments}
            editable={true}
            selectable={true}
            // select={handleDateSelect}
            />
        </div>
    )
}

export default Calendar