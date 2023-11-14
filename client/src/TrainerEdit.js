import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";

function TrainerEdit({ setEditForm }) {
    const { user, specialities, updateProfile } = useContext(UserContext)
    const [tempUsername, setTempUsername] = useState(user.username)
    const [tempName, setTempName] = useState(user.name)
    const [tempEmail, setTempEmail] = useState(user.email)
    const [tempImage, setTempImage] = useState(user.image)
    const [tempBio, setTempBio] = useState(user.bio)
    const [tempSpeciality, setTempSpeciality] = useState(user.speciality_id)
    const [tempLocation, setTempLocation] = useState(user.location)

    const handleSubmit = (e) => {
        e.preventDefault()
        updateProfile('/trainer_me', {
            username: tempUsername,
            name: tempName,
            email: tempEmail,
            image: tempImage,
            bio: tempBio,
            speciality_id: tempSpeciality,
            location: tempLocation
        })
        setEditForm(false)
        setTempUsername("")
        setTempName("")
        setTempEmail("")
        setTempImage("")
        setTempBio("")
        setTempSpeciality("")
        setTempLocation("")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Edit Profile</h2>
                <label>Change Username:</label>
                <input
                    type="text"
                    id="username"
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)}
                /> <br />
                <label>Change Name:</label>
                <input
                    type="text"
                    id="name"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                /> <br />
                <label>Change Email:</label>
                <input
                    type="text"
                    id="email"
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                /> <br />
                <label>Change Profile Picture:</label>
                <input
                    type="text"
                    id="image"
                    value={tempImage || ' '}
                    onChange={(e) => setTempImage(e.target.value)}
                /> <br />
                <label>Change Bio:</label>
                <input
                    type="text"
                    id="bio"
                    value={tempBio || ' '}
                    onChange={(e) => setTempBio(e.target.value)}
                /> <br />
                <label>Change Location:</label>
                <input
                    type="text"
                    id="location"
                    value={tempLocation || ' '}
                    onChange={(e) => setTempLocation(e.target.value)}
                /> <br />
                <label>Select a speciality: </label>
                <select value={tempSpeciality || ' '} onChange={(e) => setTempSpeciality(e.target.value)}>
                    <option value=' '>Select an option</option>
                    {specialities.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.name}
                        </option>
                    ))}
                </select>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default TrainerEdit