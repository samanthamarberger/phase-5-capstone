import React, { useState, useEffect } from 'react';

const UserContext = React.createContext();

function UserProvider({ children }){
    const [user, setUser] = useState({})
    const [clientLoggedIn, setClientLoggedIn] = useState(false)
    const [trainerLoggedIn, setTrainerLoggedIn] = useState(false)
    const [specialities, setSpecialities] = useState([])
    const [errorList, setErrorList] = useState([])

    const clientSignup = (userData) => {
        setUser(userData)
        fetchSpecialities()
        setClientLoggedIn(true)
    }

    const trainerSignup = (userData) => {
        setUser(userData)
        fetchSpecialities()
        setTrainerLoggedIn(true)
    }

    const clientLogin = (userData) => {
        setUser(userData)
        fetchSpecialities()
        setClientLoggedIn(true)
    }
    const trainerLogin = (userData) => {
        setUser(userData)
        fetchSpecialities()
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
                    setUser(userData)
                    setClientLoggedIn(true)
                    fetchSpecialities()
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

    const fetchSpecialities = () => {
        fetch ('/specialities')
            .then(r => r.json())
            .then(specialities => {
                if (!specialities.error) {
                    setSpecialities(specialities)
                }
                else {
                    console.log(specialities.error)
                }
            })
    }

    function clientUpdate( tempUsername, tempName, tempEmail, tempBirthday, tempGoals, tempImage ){
        fetch ('/client_me', {
            method: "PATCH",
            body: JSON.stringify({
                username: tempUsername,
                name: tempName,
                email: tempEmail,
                birthday: tempBirthday,
                goals: tempGoals,
                image: tempImage
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((r) => r.json())
        .then((profile) => {
            if (!profile.errors) {
                setUser((prevUser) => ({
                    ...prevUser, 
                    username: profile.username,
                    name: profile.name,
                    email: profile.email,
                    birthday: profile.birthday,
                    goals: profile.goals,
                    image: profile.image,
                  }))
                setErrorList(null)
            }
            else {
                const errors = profile.errors.map((e, index) => <li key={index} style={{ color: 'red' }}>{e}</li>)
                setErrorList(errors)
            }
        }) 
    }

    return (
        <UserContext.Provider value={{ user, clientLoggedIn, trainerLoggedIn, clientLogin, trainerLogin, clientSignup, trainerSignup, logout, specialities, clientUpdate, errorList}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };