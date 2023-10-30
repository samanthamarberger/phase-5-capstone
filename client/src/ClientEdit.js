import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";

function ClientEdit({ setEditForm }) {
    const { user, clientUpdate } = useContext(UserContext)
    const [tempUsername, setTempUsername] = useState(user.username)
    const [tempName, setTempName] = useState(user.name)
    const [tempEmail, setTempEmail] = useState(user.email)
    const [tempBirthday, setTempBirthday] = useState(user.birthday)
    const [tempGoals, setTempGoals] = useState(user.goals)
    const [tempImage, setTempImage] = useState(user.image)

    const handleSubmit = (e) => {
        e.preventDefault()
        clientUpdate(tempUsername, tempName, tempEmail, tempBirthday, tempGoals, tempImage)
        setEditForm(false)
        setTempUsername("")
        setTempName("")
        setTempEmail("")
        setTempBirthday("")
        setTempGoals("")
        setTempImage("")
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
                    /> <br/>
                    <label>Change Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                    /> <br/>
                    <label>Change Email:</label>
                    <input 
                        type="text"
                        id="email"
                        value={tempEmail}
                        onChange={(e) => setTempEmail(e.target.value)}
                    /> <br/>
                    <label>Change Birthday:</label>
                    <input 
                        type="text"
                        id="birthday"
                        value={tempBirthday}
                        onChange={(e) => setTempBirthday(e.target.value)}
                    /> <br/>
                    <label>Change Goal:</label>
                    <input 
                        type="text"
                        id="goals"
                        value={tempGoals}
                        onChange={(e) => setTempGoals(e.target.value)}
                    /> <br/>
                    <label>Change Profile Picture:</label>
                    <input 
                        type="text"
                        id="image"
                        value={tempImage}
                        onChange={(e) => setTempImage(e.target.value)}
                    /> <br/>
                    <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default ClientEdit