import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import SpecialityAdd from "./SpecialityAdd"

function TrainerDetail() {
    const { user, specialities } = useContext(UserContext)
    const [addForm, setAddForm] = useState(false)
    const [speciality, setSpeciality] = useState("")

    function canAdd() {
        if (addForm) {
            return (
                <SpecialityAdd setAddForm={setAddForm} />
            )
        }
        else {
            return (
                <div>
                    <button onClick={() => setAddForm(true)}>Add Speciality</button>
                </div>
            )
        }
    }

    if (user.speciality_id === 1) {
        return (
            <div className="profile">
                <h2 style={{ color: 'red' }}>Please add your speciality or select from our list</h2>
                <p style={{ color: 'red' }}>You will not be seen by potential clients until you have a speciality and your profile is complete.</p>
                {canAdd()}
                <h4>or</h4>
                <form>
                    <label>Select a speciality: </label>
                    <select value={speciality} onChange={(e) => setSpeciality(e.target.value)}>
                        <option value="">Select an option</option>
                        {specialities.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                    <input type="submit" />
                </form>
            </div>
        )
    }
    else {
        return (
            <div className="Profile">
                <p>My Bio: {user.bio}</p>
                <p>My speciality: {user.speciality.name}</p>
            </div>
        )
    }
}

export default TrainerDetail