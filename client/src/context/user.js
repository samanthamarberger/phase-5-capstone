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

    function isUserInvalid(user) {
        return user.speciality_id === 1 || user.image === null || user.bio === null || user.location === null;
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
    function trainerUpdate( trainer ) {
        fetch ('/trainer_me', {
            method: "PATCH",
            body: JSON.stringify(trainer),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((r) => r.json())
        .then((profile) => {
            console.log(profile)
            if (!profile.errors) {
                setUser((prevUser) => ({
                    ...prevUser, 
                    username: profile.username,
                    name: profile.name,
                    email: profile.email,
                    image: profile.image,
                    bio: profile.bio,
                    speciality_id: profile.speciality_id,
                    location: profile.location
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

    function addAppointment( appointment ) {
        fetch ('/appointments', {
            method: 'POST',
            body: JSON.stringify(appointment),
            headers: { 
                'Content-Type': 'application/json',
            }, 
        })
        .then(r => r.json())
        .then(appointment => {
            if (!appointment.errors) {
                const updatedUserAppointments = [...user.appointments, appointment]
                setUser({...user, appointments: updatedUserAppointments})
                setErrorList(null)
            }
            else  {
                const errorLis = appointment.errors.map((e, index) => <li key={index} style={{ color: 'red' }}>{e}</li>)
                setErrorList(errorLis)
            }
        })
    }

    // function deleteAvailability(id) {
    //     fetch (`/availabilities/${id}`, {
    //         method: "DELETE",
    //     })
    //         .then(availability => {
    //             const updatedAvailability = 
    //         })
    //         .catch((error) => {
    //             console.error("Error removing availability:", error)
    //         })
    // }

    // function frontEndDelete(id) {
    //     const updatedTrails = trails.filter((trail) => trail.id !== id)
    //     setTrails(updatedTrails)
    //     navigate('/')
    // }

    return (
        <UserContext.Provider value={{ user, clientLoggedIn, trainerLoggedIn, clientLogin, trainerLogin, clientSignup, trainerSignup, logout, specialities, addSpeciality, clientUpdate, trainerUpdate, addAppointment, errorList, isUserInvalid}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };