import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import Calendar from "./Calendar";
import dayGridPlugin from '@fullcalendar/daygrid';
import moment from 'moment';
import Modal from 'react-modal';
import './App.css';
import EditAvailability from "./EditAvailability";

function TrainerAvailabilities() {
    const { user, trainerLoggedIn, deleteAvailability } = useContext(UserContext)
    const [selectedAvailability, setSelectedAvailability] = useState([])
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

    const handleAvailabilityClick = (clickInfo) => {
        setSelectedAvailability(clickInfo.event)
        setModalOpen(true)
    }

    const closeModal = () => {
        setSelectedAvailability(null)
        setModalOpen(false)
    }

    const handleEditAvailability = () => {
        setEditModalOpen(true)
        setModalOpen(false)
    }

    const handleDeleteAvailability = () => {
        console.log('Deleting Availability:', selectedAvailability.extendedProps.availability_id)
        deleteAvailability(selectedAvailability.extendedProps.availability_id)
        closeModal()
    }

    if (trainerLoggedIn) {
        return (
            <div>

                <Modal
                    isOpen={modalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Availability Details"
                    className="modal-content"
                    overlayClassName="modal-overlay"
                >
                    <p>Availability Details:</p>
                    <p>Title: {selectedAvailability?.title}</p>
                    <p>Start: {selectedAvailability?.start?.toLocaleString()}</p>
                    <p>End: {selectedAvailability?.end?.toLocaleString()}</p>

                    <button onClick={handleEditAvailability}>Edit</button>
                    <button onClick={handleDeleteAvailability}>Delete</button>
                    <button onClick={closeModal}>Close</button>
                </Modal>

                {editModalOpen && (
                    <EditAvailability
                        availability={selectedAvailability}
                        onClose={() => setEditModalOpen(false)}
                    />
                )}

                <Calendar
                    plugins={[dayGridPlugin]}
                    events={availabilities}
                    eventClick={handleAvailabilityClick}
                />
            </div>
        )
    }
    else {
        return <h1>Error: Not Authorized</h1>
    }
}

export default TrainerAvailabilities