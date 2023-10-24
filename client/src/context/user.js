import React, { useState, useEffect } from 'react';

const UserContext = React.createContext();

function UserProvider({ children }){
    const [user, setUser] = useState({})
    const [clientLoggedIn, setClientLoggedIn] = useState(false)
    const [trainerLoggedIn, setTrainerLoggedIn] = useState(false)

    const clientLogin = (userData) => {
        setUser(userData)
        setClientLoggedIn(true)
    }
    const trainerLogin = (userData) => {
        setUser(userData)
        setTrainerLoggedIn(true)
    }
    const logout = () => {
        setUser({})
        setClientLoggedIn(false)
        setTrainerLoggedIn(false)
    }

    return (
        <UserContext.Provider value={{ user, clientLoggedIn, trainerLoggedIn, clientLogin, trainerLogin, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };