import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import SpecialityAdd from "./SpecialityAdd"

function TrainerDetail() {
    const { user } = useContext(UserContext)
    const [addForm, setAddForm] = useState(false)

    function canAdd() {
        if (addForm) {
           return  <SpecialityAdd setAddForm={setAddForm} />
        }
        else {
            return (
                <button onClick={() => setAddForm(true)}>Add Speciality</button>
            )
        }
    }

    if (user.speciality_id === 1) {
        return (
            <div className="profile">
                <h2 style={{ color: 'red' }}>Please add your speciality or select from our list</h2>
                <p style={{ color: 'red' }}>You will not be seen by potential clients until you have a speciality and your profile is complete.</p>
                {canAdd()}
            </div>
        )
    }
    return (
        <div className="Profile">
            <p>My Bio: {user.bio}</p>
        </div>
    )
}

export default TrainerDetail