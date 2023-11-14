import React, { useContext, useState, } from 'react';
import { UserContext } from "./context/user";
import Calendar from './Calendar';
import AppointmentCard from './AppointmentCard';

function Appointments() {
    const { user, clientLoggedIn, trainerLoggedIn, errorList } = useContext(UserContext)
    const [selectedAppointment, setSelectedAppointment] = useState(null)

    if (!user || !user.appointments) {
        return <h3>...loading</h3>
    }

    const appointments = user.appointments.map(a => ({
        title: clientLoggedIn
            ? `My ${a.title} appointment with ${a.trainer_name}`
            : `Appointment with ${a.client_name}`,
        start: a.start,
        end: a.end,
        id: a.id,
        location: a.location,
    }))

    const handleAppointmentClick = (clickInfo) => {
        setSelectedAppointment(clickInfo.event)
    }

    const onClose = () => {
        setSelectedAppointment(null)
    }

    if (clientLoggedIn || trainerLoggedIn) {
        return (
            <div>
                < br/>
                {errorList}
                {selectedAppointment && <AppointmentCard appointment={selectedAppointment} onClose={onClose} />}
                <Calendar events={appointments} eventClick={handleAppointmentClick} />
            </div>
        )
    }
    else {
        return (
            <h1>Error: Not Authorized</h1>
        )
    }

}

export default Appointments