import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from "./context/user";
import Calendar from './Calendar';

function Appointments() {
    const { user, clientLoggedIn, trainerLoggedIn } = useContext(UserContext)
    const [appointments, setAppointments] = useState([])

    console.log(user.appointments)

    useEffect(() => {
        if (user.appointments) {
            const appointments = user.appointments.map(a => ({
                title: clientLoggedIn 
                    ? `My ${a.title} appointment with ${a.trainer_name}` 
                    : `Appointment with ${a.client_name}`,
                start: a.start,
                end: a.end,
            }))
            setAppointments(appointments)
        }
    }, [user.appointments, clientLoggedIn])

    if(clientLoggedIn || trainerLoggedIn) {
        return (
            <div>
                <p>{user.name}'s appointments</p>
                <Calendar events={appointments}/>
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