import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/user";
import Trainer from "./Trainer";
import { useParams } from "react-router-dom";


function Trainers() {
    const params = useParams()
    const [showContent, setShowContent] = useState(false)
    const { specialities, clientLoggedIn, isUserInvalid } = useContext(UserContext)
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 3000)
        return () => clearTimeout(timer)
    }, []) 

    const speciality = specialities.find((sp) => sp.id === parseInt(params.id));
    if (!speciality) {
        return (
            <div className="Trainers">
                <p>Loading...</p>
                {showContent && (
                    <p>If the page hasn't loaded please login or signup</p>
                )}
            </div>
        )
    }

    const filteredTrainers = speciality.trainers.filter((trainer) => !isUserInvalid(trainer))
    const trainers = filteredTrainers.map((trainer) => <Trainer key={trainer.name} trainer={trainer} />)

    if (clientLoggedIn) {
        return (
            <div className="Trainers">
                <h1>Trainers for {speciality.name}: </h1>
                {trainers.length === 0 ? 
                    <h2>There are currently no trainers available</h2> : 
                    trainers
                }
            </div>
        );
    }
    else {
        return (
            <h1>Error: Not Authorized</h1>
        )
    }
}

export default Trainers;