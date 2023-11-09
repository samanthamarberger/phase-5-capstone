import React, { useContext, useState } from "react";
import moment from "moment";
import { UserContext } from "./context/user";
import Dialog from "./Dialog";

function AppointmentCard({ appointment }) {
    const { deleteAppointment } = useContext(UserContext)
    const [dialogVisible, setDialogVisible] = useState(false)

    function handleCancel() {
        setDialogVisible(true)
    }

    function handleDialogResponse(confirm) {
        if (confirm) {
            deleteAppointment(appointment.id)
        }
        setDialogVisible(false)
    }

    return (
        <div>
            <hr />
            <h2>{appointment.title}</h2>
            <p>{moment(appointment.start).format('MMMM Do YYYY, h:mm a')}</p>
            <button className="cancel" onClick={handleCancel}>Cancel Appointment</button>
            <hr />
            {dialogVisible && (
                <Dialog
                    message={`Are you sure you want to cancel ${appointment.title}?`}
                    onDialog={handleDialogResponse.bind(null, true)} 
                    onCancel={handleDialogResponse.bind(null, false)} 
                />
            )}
        </div>
    )
}

export default AppointmentCard