import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { NavLink } from "react-router-dom";

function NavBar() {
    const{ logout, loggedIn } = useContext(UserContext)

    
    return (
        <header>
            <NavLink to='/login'>
                <button>Login</button>
            </NavLink>
        </header>
    )
}

export default NavBar;