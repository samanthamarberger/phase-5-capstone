import React, { useState, useEffect } from 'react';

const UserContext = React.createContext();

function UserProvider({ children }){
    const [user, setUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)

    const login = (userData) => {
        setUser(userData)
        setLoggedIn(true)
    }
    const logout = () => {
        setUser({})
        setLoggedIn(false)
    }

    return (
        <UserContext.Provider value={{ user, loggedIn, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };