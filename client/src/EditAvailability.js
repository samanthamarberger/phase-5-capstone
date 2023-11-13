import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";

function EditAvailability({ availability, onClose }) {

    const { editAvailability } = useContext(UserContext)
    const [tempStart, setTempStart] = useState(availability.start.toISOString().slice(0, 16))
    const [tempEnd, setTempEnd] = useState(availability.end.toISOString().slice(0, 16))

    function handleSubmit(e){
        e.preventDefault()
        editAvailability(availability.extendedProps.availability_id, {
            start: tempStart,
            end: tempEnd
        })
        onClose()
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Start Time:</label>
            <input
                className="start"
                type="datetime-local"
                value={tempStart}
                onChange={(e)=>{setTempStart(e.target.value)}}
            />
            <br />
            <label>End Time:</label>
            <input
                className="end"
                type="datetime-local"
                value={tempEnd}
                onChange={(e)=>{setTempEnd(e.target.value)}}
            />
            <button type="submit">Save</button>
        </form>
    )
}

export default EditAvailability