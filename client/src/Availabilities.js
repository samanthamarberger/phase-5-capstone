import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user";
import Calendar from "./Calendar";
import moment from 'moment';
import Dialog from "./Dialog";
import { useNavigate, useParams } from "react-router-dom";

function Availabilities({ trainer, handleButtonClick }) {
    const { user, addAppointment, clientDeleteAvailability, errorList, specialities } = useContext(UserContext)
    const navigate = useNavigate()
    const params = useParams()
    const speciality = specialities.find((sp) => (sp.id === parseInt(params.id)))
    const [availabilities, setAvailabilities] = useState([])
    const [selectedAppointment, setSelectedAppointment] = useState('')
    const [dialogVisible, setDialogVisible] = useState(false)
    const [dialogMessage, setDialogMessage] = useState("")

    function calculateDuration(start, end) {
        const startMoment = moment(start);
        const endMoment = moment(end);
        const duration = moment.duration(endMoment.diff(startMoment));
        const hours = duration.hours();
        const minutes = duration.minutes();

        switch (true) {
            case hours === 1 && minutes === 0:
                return `${hours} hour`
            case hours === 0 && minutes > 0:
                return `${minutes} minutes`
            case hours === 1 && minutes > 0:
                return `${hours} hour ${minutes} minutes`
            case hours > 1 && minutes === 0:
                return `${hours} hours`
            default:
                return `${hours} hours ${minutes} minutes`
        }
    }

    useEffect(() => {
        if (trainer && trainer.availabilities) {
            const events = trainer.availabilities.map(a => ({
                title: `${calculateDuration(a.start, a.end)} available`,
                start: a.start,
                end: a.end,
                color: 'green',
                client_id: user.id,
                trainer_id: trainer.id,
                availability_id: a.id,
            }))
            setAvailabilities(events)
        }
    }, [trainer, user.id])

    const handleSchelduleAppointment = (clickInfo) => {
        setSelectedAppointment({
            start: clickInfo.event.start,
            end: clickInfo.event.end,
            trainer_id: clickInfo.event.extendedProps.trainer_id,
            availability_id: clickInfo.event.extendedProps.availability_id,
        })
        setDialogMessage(`Would you like to scheldule an appointment with ${trainer.name} at ${trainer.location} from ${clickInfo.event.start} to ${clickInfo.event.end}?`)
        setDialogVisible(true)
    }

    const handleAddAppointment = () => {
        addAppointment({
            trainer_id: selectedAppointment.trainer_id,
            start: selectedAppointment.start,
            end: selectedAppointment.end,
        })
        clientDeleteAvailability(trainer.id, selectedAppointment.availability_id, speciality.id)
        setDialogVisible(false)
        navigate('/appointments')
    }

    const handleCancel =()=> {
        setDialogVisible(false)
    }

    return (
        <div>
            <Calendar events={availabilities} eventClick={handleSchelduleAppointment} />
            <button className="trainer-link" onClick={handleButtonClick}>Close</button>
            {errorList}
            {dialogVisible && (
                <Dialog
                    message={dialogMessage}
                    onDialog={handleAddAppointment}
                    onCancel={handleCancel}
                />
            )}
        </div>
    )
}

export default Availabilities