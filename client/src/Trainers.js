import React, { useContext } from "react";
import { UserContext } from "./context/user";
import Trainer from "./Trainer";
import { useParams } from "react-router-dom";

function Trainers() {
    const params = useParams();
    const { specialities, clientLoggedIn } = useContext(UserContext)
    
    const speciality = specialities.find((sp) => sp.id === parseInt(params.id));
    if (!speciality) {
        return (
            <div className="Trainers">
                <p>Loading...</p>
            </div>
        )
    }
    
    console.log(speciality)
    
    const trainers = speciality.trainers.map((trainer) => <Trainer key={trainer.name} trainer={trainer} />)
    
    if (clientLoggedIn) {
        return (
            <div className="Trainers">
                <h2>Trainers for {speciality.name}: </h2>
                {trainers}
            </div>
        );
    }

    return null; 
}

export default Trainers;