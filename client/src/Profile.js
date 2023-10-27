import React, { useContext } from "react";
import { UserContext } from "./context/user";
import ClientDetail from "./ClientDetail";
import TrainerDetail from "./TrainerDetail";

function Profile() {
    const { user, clientLoggedIn, trainerLoggedIn } = useContext(UserContext)

    if (trainerLoggedIn || clientLoggedIn) {
        return (
            <div className="Profile">
                <h1>{user.name}'s Profile</h1>
                <img src={user.image} alt={user.name}/>
                <p>{user.email}</p>
                {clientLoggedIn ? <ClientDetail/> : <TrainerDetail/>}
            </div>
        ) 
    } 
    else {
        return (
            <h1>Error: Not Authorized</h1>
        )
    }
}

export default Profile