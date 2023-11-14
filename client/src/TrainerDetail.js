import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import TrainerEdit from "./TrainerEdit";

function TrainerDetail() {
    const { user, isUserInvalid } = useContext(UserContext)
    const [editForm, setEditForm] = useState(false)

    function canEdit() {
        if (editForm) {
            return <TrainerEdit setEditForm={setEditForm} />
        }
        else {
            return <button onClick={() => setEditForm(true)}>Edit Profile</button>
        }
    }

    if (isUserInvalid(user)) {
        return (
            <div className="profile">
                <h2 style={{ color: 'red' }}>Please finish your profile</h2>
                <p style={{ color: 'red' }}>You will not be seen by potential clients until you have a speciality and your profile is complete.</p>
                {canEdit()}
            </div>
        )
    }
    return (
        <div className="Profile">
            <p>My Bio: {user.bio}</p>
            <p>My location: {user.location}</p>
            {canEdit()}
        </div>
    )

}

export default TrainerDetail