import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";

function AddAvailability({ selectedDate, onClose }) {
    const { addAvailability } = useContext(UserContext)
    const [start, setStart] = useState(`${selectedDate}T11:00`)
    const [end, setEnd] = useState(`${selectedDate}T12:00`)

    function handleSubmit(e) {
        e.preventDefault()
        addAvailability({
            start: start,
            end: end
        })
        onClose()
    }
    
    return (
        <div>
            <h2>Add Availability</h2>
            <form onSubmit={handleSubmit}>
                <label>Start Time:</label>
                <input
                    className="start"
                    type="datetime-local"
                    value={start}
                    onChange={(e)=>{setStart(e.target.value)}}
                />
                <br /><br />
                <label>End Time:</label>
                <input
                    className="end"
                    type="datetime-local"
                    value={end}
                    onChange={(e)=>{setEnd(e.target.value)}}
                />
                <br /><br />
                <button type="submit">Save</button>
                <button onClick={onClose}>Close</button>
            </form>
        </div>
    )
}
export default AddAvailability