import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";

function SpecialityAdd({ setAddForm }) {

    const { addSpeciality } = useContext(UserContext)
    const [tempName, setTempName] = useState('')
    const [tempPicture, setTempPicture] = useState('')
    const [tempDescription, setTempDescription] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        addSpeciality({
            name: tempName,
            picture: tempPicture,
            description: tempDescription
        })
        setAddForm(false)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Add a speciality</h2>
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