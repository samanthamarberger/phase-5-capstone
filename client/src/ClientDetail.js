import React, { useContext } from "react";
import { UserContext } from "./context/user";

function ClientDetail() {
    const { user } = useContext(UserContext)
    return (
        <div className="Profile">
            <p>{user.goals}</p>
        </div>
    )
}

export default ClientDetail