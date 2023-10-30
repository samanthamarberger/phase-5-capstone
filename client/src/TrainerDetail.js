import React, { useContext } from "react";
import { UserContext } from "./context/user";

function TrainerDetail() {
    const { user } = useContext(UserContext)
    return (
        <div className="Profile">
            <p>My Bio: {user.bio}</p>
        </div>
    )
}

export default TrainerDetail