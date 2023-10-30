import React from "react"
import { Link } from "react-router-dom"

function SpecialityLink({ speciality }) {

    return (
        <div>
            <h3>{speciality.name}</h3>
            <img src={speciality.picture} alt={speciality.name}/>
            <p>{speciality.description}</p>
            <Link className="link-name" to={`/specialities/${speciality.id}`}>
                Check out our instructors!
            </Link>
        </div>
    )
}

export default SpecialityLink