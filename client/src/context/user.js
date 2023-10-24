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

    useEffect(() => {
        fetch('/client_me')
            .then(r => r.json())
            .then((userData) => {
                if (!userData.error) {
                    console.log(userData)
                    setUser(userData)
                    setClientLoggedIn(true)
                }
                else {
                    fetch ('/trainer_me')
                    .then(r => r.json())
                    .then((userData) => {
                        if (!userData.error) {
                            setUser(userData)
                            setTrainerLoggedIn(true)
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                    })
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return (
        <UserContext.Provider value={{ user, clientLoggedIn, trainerLoggedIn, clientLogin, trainerLogin, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };