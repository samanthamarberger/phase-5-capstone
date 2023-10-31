import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import TrainerEdit from "./TrainerEdit";

function TrainerDetail() {
    const { user } = useContext(UserContext)
    const [editForm, setEditForm] = useState(false)

    function canEdit() {
        if (editForm) {
            return <TrainerEdit setEditForm={setEditForm} />
        }
        else {
            return <button onClick={() => setEditForm(true)}>Edit Profile</button>
        }
    }

    if (user.speciality_id === 1) {
        return (
            <div className="profile">
                <h2 style={{ color: 'red' }}>Please add your speciality or select from our list</h2>
                <p style={{ color: 'red' }}>You will not be seen by potential clients until you have a speciality and your profile is complete.</p>
                {canEdit()}
            </div>
        )
    }
    else {
        return (
            <div className="Profile">
                <p>My Bio: {user.bio}</p>
            </div>
        )
    }
}

export default TrainerDetail