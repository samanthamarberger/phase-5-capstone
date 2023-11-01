import React, { useContext } from 'react';
import { UserContext } from "./context/user";
import Calendar from './Calendar';

function Appointments() {
    const { user, clientLoggedIn, trainerLoggedIn } = useContext(UserContext)

    if(clientLoggedIn || trainerLoggedIn) {
        return (
            <div>
                <p>{user.name}'s appointments</p>
                <Calendar />
            </div>
        )
    }
    else {
        return (
            <h1>Error: Not Authorized</h1>
        )
    }
    
}

export default Appointments