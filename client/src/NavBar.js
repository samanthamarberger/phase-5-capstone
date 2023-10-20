import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { NavLink, useNavigate } from "react-router-dom";

function NavBar() {
    const{ logout, loggedIn } = useContext(UserContext)
    const navigate = useNavigate()

    const logoutUser = () => {
        fetch('/logout', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(() => {
            logout()
            navigate('/')
        })
    }

    if (loggedIn) {
        return (
            <header>
                <button onClick={logoutUser}>Logout</button>
            </header>
        )
    }
    else {
    return (
            <header>
                <NavLink to='/login'>
                    <button>Login</button>
                </NavLink>
            </header>
        )
    }
}

export default NavBar;