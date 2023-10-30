import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import ClientEdit from "./ClientEdit";

function ClientDetail() {
    const { user, errorList } = useContext(UserContext)
    const [editForm, setEditForm] = useState(false)

    function canEdit() {
        if (editForm) {
           return  <ClientEdit setEditForm={setEditForm} />
        }
        else {
            return (
                <button onClick={() => setEditForm(true)}>Edit profile</button>
            )
        }
    }

    return (
        <div className="Profile">
            <p>Current Goal: {user.goals}</p>
            {errorList}
            {canEdit()}
        </div>
    )
}

export default ClientDetail