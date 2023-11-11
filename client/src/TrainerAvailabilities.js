import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import Calendar from "./Calendar";
import dayGridPlugin from '@fullcalendar/daygrid';
import moment from 'moment';
import Modal from 'react-modal';
import './App.css';
import EditAvailability from "./EditAvailability";

function TrainerAvailabilities() {
    const { user, trainerLoggedIn } = useContext(UserContext)
    const [selectedAppointment, setSelectedAppointment] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)

    if (!user || !user.availabilities) {
        return <h3>...loading</h3>
    }
    const availabilities = user.availabilities.map(a => ({
        title: `${calculateDuration(a.start, a.end)} available`,
        start: a.start,
        end: a.end,
        color: 'green',
        trainer_id: user.id,
        availability_id: a.id,
    }))

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

    const handleAppointmentClick = (clickInfo) => {
        setSelectedAppointment(clickInfo.event)
        setModalOpen(true)
    }

    const closeModal = () => {
        setSelectedAppointment(null)
        setModalOpen(false)
    }

    const handleEditAppointment = () => {
        setEditModalOpen(true)
        setModalOpen(false)
    }

    const handleDeleteAppointment = () => {
        console.log('Deleting appointment:', selectedAppointment)
        closeModal()
    }

    if (trainerLoggedIn) {
        return (
            <div>

                <Modal
                    isOpen={modalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Appointment Details"
                    className="modal-content"
                    overlayClassName="modal-overlay"
                >
                    <p>Appointment Details:</p>
                    <p>Title: {selectedAppointment?.title}</p>
                    <p>Start: {selectedAppointment?.start?.toLocaleString()}</p>
                    <p>End: {selectedAppointment?.end?.toLocaleString()}</p>

                    <button onClick={handleEditAppointment}>Edit</button>
                    <button onClick={handleDeleteAppointment}>Delete</button>
                    <button onClick={closeModal}>Close</button>
                </Modal>

                {editModalOpen && (
                    <EditAvailability
                        availability={selectedAppointment}
                        onClose={() => setEditModalOpen(false)}
                    />
                )}

                <Calendar
                    plugins={[dayGridPlugin]}
                    events={availabilities}
                    eventClick={handleAppointmentClick}
                />
            </div>
        )
    }
    else {
        return <h1>Error: Not Authorized</h1>
    }
}

export default TrainerAvailabilities