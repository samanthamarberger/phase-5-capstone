import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { NavLink, useNavigate } from "react-router-dom";

function NavBar() {
    const { logout, clientLoggedIn, trainerLoggedIn } = useContext(UserContext)
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
            <div>
                <header className="header-container">
                    <img className="header-img" alt="header" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZMsuRz3LxIuQpEpiQohiaoM4RaT6GT3bHLw&usqp=CAU"/>
                    <h3 className="header-title">ElevateFit</h3>
                    <div className="button-container">
                    <button onClick={logoutUser}>Logout</button>
                        <NavLink to='/'>
                            <button>Home</button>
                        </NavLink>
                        {clientLoggedIn ?
                            <NavLink to='/specialities'>
                                <button>Personal Training Options</button>
                            </NavLink>
                            :
                            <NavLink to='/availabilities'>
                                <button>My Availabilities</button>
                            </NavLink>
                        }
                        <NavLink to='/profile'>
                            <button>Profile</button>
                        </NavLink>
                        <NavLink to='/appointments'>
                            <button>My Appointments</button>
                        </NavLink>
                    </div>
                    <br />
                </header>
            </div>
        )
    }
    else {
        return (
            <header className="header-container">
                <img className="header-img" alt="header" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZMsuRz3LxIuQpEpiQohiaoM4RaT6GT3bHLw&usqp=CAU"/>
                <h3 className="header-title">ElevateFit</h3>
                <div className="button-container">
                    <NavLink to='/login'>
                        <button>Login</button>
                    </NavLink>
                    <NavLink to='/signup'>
                        <button>Signup</button>
                    </NavLink>
                    <NavLink to='/'>
                        <button>Home</button>
                    </NavLink>
                </div>
            </header>
        )
    }
}

export default NavBar;