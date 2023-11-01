import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { NavLink, useNavigate } from "react-router-dom";

function NavBar() {
    const{ logout, clientLoggedIn, trainerLoggedIn } = useContext(UserContext)
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

    if (clientLoggedIn || trainerLoggedIn) {
        return (
            <header>
                <button onClick={logoutUser}>Logout</button>
                <NavLink to='/'>
                    <button>Home</button>
                </NavLink>
                {clientLoggedIn ? 
                    <NavLink to='/specialities'>
                        <button>Personal Training Options</button>
                    </NavLink> 
                : 
                    null
                }
                <NavLink to='/profile'>
                    <button>Profile</button>
                </NavLink>
                <NavLink to='/appointments'>
                    <button>My Appointments</button>
                </NavLink>

            </header>
        )
    }
    else {
    return (
            <header>
                <NavLink to='/login'>
                    <button>Login</button>
                </NavLink>
                <NavLink to='/signup'>
                    <button>Signup</button>
                </NavLink>
                <NavLink to='/'>
                    <button>Home</button>
                </NavLink>
            </header>
        )
    }
}

export default NavBar;