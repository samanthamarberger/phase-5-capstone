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

    function clientUpdate( client ){
        fetch ('/client_me', {
            method: "PATCH",
            body: JSON.stringify(client),
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
    function addSpeciality( speciality ) {
        fetch ('/specialities', {
            method: 'POST',
            body: JSON.stringify(speciality),
            headers: { 
                'Content-Type': 'application/json',
            },
        })
        .then(r => r.json())
        .then(speciality => {
            if (!speciality.errors) {
                setSpecialities([...specialities, speciality])
                setUser((prevUser) => ({
                    ...prevUser,
                    speciality_id: speciality.id
                }))
                setErrorList(null)
            }
            else {
                const errorLis = speciality.errors.map((e, index) => <li key={index} style={{ color: 'red' }}>{e}</li>)
                setErrorList(errorLis)
            }
        })
    }

    return (
        <UserContext.Provider value={{ user, clientLoggedIn, trainerLoggedIn, clientLogin, trainerLogin, clientSignup, trainerSignup, logout, specialities, addSpeciality, clientUpdate, errorList}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };