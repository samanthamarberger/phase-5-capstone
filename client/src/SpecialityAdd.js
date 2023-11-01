import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { UserContext } from "./context/user";

function SpecialityAdd() {

    const { addSpeciality } = useContext(UserContext)
    const [tempName, setTempName] = useState('')
    const [tempPicture, setTempPicture] = useState('')
    const [tempDescription, setTempDescription] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        addSpeciality({
            name: tempName,
            picture: tempPicture,
            description: tempDescription
        })
        navigate('/profile')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <h2 style={{ color: 'red' }}>Please add your speciality</h2>
                <label>Your Speciality:</label>
                    <input 
                        type="text"
                        id="speciality"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                    /> <br/>
                    <label>Speciality Image:</label>
                    <input 
                        type="text"
                        id="picture"
                        value={tempPicture}
                        onChange={(e) => setTempPicture(e.target.value)}
                    /> <br/>
                    <label>Speciality Description:</label>
                    <input 
                        type="text"
                        id="description"
                        value={tempDescription}
                        onChange={(e) => setTempDescription(e.target.value)}
                    /> <br/>
                    <button type="submit" >Submit</button>
            </form>
        </div>
    )

}

export default SpecialityAdd