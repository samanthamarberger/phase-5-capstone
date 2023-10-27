import React, { useContext } from "react";
import { UserContext } from "./context/user";

function Profile() {
    const { user, clientLoggedIn } = useContext(UserContext)

    return (
        <div className="Profile">
            <h1>{user.name}'s Profile</h1>
            <img src={user.image} alt={user.name}/>
            <p>{user.email}</p>
        </div>
    )  
}

export default Profile