import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <header>
            <NavLink to='/login'>
                <button>Login</button>
            </NavLink>
        </header>
    )
}

export default NavBar;