import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user";
import Calendar from "./Calendar";
import moment from 'moment';
import Dialog from "./Dialog";
import { useNavigate } from "react-router-dom";

function Availabilities({ trainer, handleButtonClick }) {
    const { user, addAppointment, errorList } = useContext(UserContext)
    const [availabilities, setAvailabilities] = useState([])
    const [selectedAppointment, setSelectedAppointment] = useState('')
    const navigate = useNavigate()
    const [dialog, setDialog] = useState({
        message: '',
        isLoading: false,
        show: false,
    })

    const handleDialog = (message, isLoading) => {
        setDialog({
            message,
            isLoading,
            show: true,
        })
    }

    const handleCloseDialog = () => {
        setDialog({
            message: '',
            isLoading: false,
            show: false,
        })
    }

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
            }))
            setAvailabilities(events)
        }
    }, [trainer, user.id])

    const handleSchelduleAppointment = (clickInfo) => {
        setSelectedAppointment({
            start: clickInfo.event.start,
            end: clickInfo.event.end,
            trainer_id: clickInfo.event.extendedProps.trainer_id,
        })
        handleDialog(
            `Would you like to scheldule an appointment with ${trainer.name} from ${clickInfo.event.start} to ${clickInfo.event.end}?`,
            false
        )
    }

    const handleAddAppointment = () => {
        addAppointment({
            trainer_id: selectedAppointment.trainer_id,
            start: selectedAppointment.start,
            end: selectedAppointment.end,
        })
        handleCloseDialog()
        navigate('/appointments')
    }
    console.log(trainer)

    return (
        <div>
            <Calendar events={availabilities} eventClick={handleSchelduleAppointment} />
            <button className="trainer-link" onClick={handleButtonClick}>Close</button>
            {errorList}
            {dialog.show && (
                <Dialog
                    message={dialog.message}
                    onDialog={handleAddAppointment}
                />
            )}
        </div>
    )
}

export default Availabilities