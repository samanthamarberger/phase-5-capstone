import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/user";
import Trainer from "./Trainer";
import { useParams } from "react-router-dom";

function Trainers() {
    const params = useParams();
    const { specialities, clientLoggedIn } = useContext(UserContext)
    const [ speciality, setSpeciality] = useState([]);

    useEffect(() => {
        const loadedSpeciality = specialities.find((sp) => sp.id === parseInt(params.id));
        setSpeciality(loadedSpeciality)
    }, [specialities, params.id])
    
    console.log(speciality)

    if (!speciality) {
        return (
            <div className="Trainers">
                <p>Loading...</p>
            </div>
        );
    }
    
    const trainers = speciality.trainers.map((trainer) => <Trainer key={trainer.name} trainer={trainer} />);
    
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