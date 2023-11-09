import React, { useContext } from "react";
import { UserContext } from "./context/user";
import ClientDetail from "./ClientDetail";
import TrainerDetail from "./TrainerDetail";
import NameLink from "./NameLink";

function Profile() {
    const { user, clientLoggedIn, trainerLoggedIn } = useContext(UserContext)

    const nameLink = (
        clientLoggedIn 
        ? (user.trainers && user.trainers.map((t) => <NameLink name={t} key={t.id} />))
        : (user.clients && user.clients.map((c) => <NameLink name={c} key={c.id} />))
    )
    if (trainerLoggedIn || clientLoggedIn) {
        return (
            <div className="Profile">
                <h1>{user.name}'s Profile</h1>
                <img src={user.image} alt={user.name}/>
                <p>{user.email}</p>
                {clientLoggedIn ? <ClientDetail/> : <TrainerDetail/>}
                <h3>Contact my {clientLoggedIn ? "Trainers" : "Clients"}:</h3>
                <ul>{nameLink}</ul>
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