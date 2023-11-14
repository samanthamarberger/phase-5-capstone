import React, { useState } from "react";
import Availabilities from "./Availabilities";

function Trainer({ trainer }) {
    const [showAvailabilities, setShowAvailabilities] = useState(false)

    const handleButtonClick = () => {
        setShowAvailabilities(!showAvailabilities)
    }

    return (
        <div>
            <h2>{trainer.name}</h2>
            <img className="trainer-picture" src={trainer.image} alt={trainer.name} />
            <p>{trainer.bio}</p>
            {showAvailabilities ? (
                <Availabilities trainer={trainer} handleButtonClick={handleButtonClick}/>
            ) : (
                <button className="trainer-link" onClick={handleButtonClick}>
                    <h3>Book an appointment with {trainer.name}</h3>
                </button>
            )}
            <p>Email me for any questions at: {trainer.email}</p>
            <hr />
        </div>
    )
}

export default Trainer