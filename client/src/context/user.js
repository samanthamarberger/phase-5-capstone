import React, { useState, useEffect } from 'react';

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState({})
    const [clientLoggedIn, setClientLoggedIn] = useState(false)
    const [trainerLoggedIn, setTrainerLoggedIn] = useState(false)
    const [specialities, setSpecialities] = useState([])
    const [errorList, setErrorList] = useState([])
    // const [availabilities, setAvailabilities] = useState([])

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
                    // fetchAvailabilities()
                }
                else {
                    fetch('/trainer_me')
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

    function fetchSpecialities() {
        fetch('/specialities')
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

    // function fetchAvailabilities() {
    //     fetch('/availabilities')
    //         .then(r => r.json())
    //         .then(availabilities => {
    //             if (!availabilities.error) {
    //                 setAvailabilities(availabilities)
    //             }
    //             else {
    //                 console.log(availabilities.error)
    //             }
    //         })
    // }

    function clientUpdate(client) {
        fetch('/client_me', {
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
    function trainerUpdate(trainer) {
        fetch('/trainer_me', {
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
    function addSpeciality(speciality) {
        fetch('/specialities', {
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

    function addAppointment(appointment) {
        fetch('/appointments', {
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
                    const updatedUserTrainers = user.trainers.some((tr) => tr.id === appointment.trainer.id)
                        ? user.trainers
                        : [...user.trainers, appointment.trainer] 
                    setUser({ ...user, appointments: updatedUserAppointments, trainers: updatedUserTrainers})
                    setErrorList(null)
                }
                else {
                    const errorLis = appointment.errors.map((e, index) => <li key={index} style={{ color: 'red' }}>{e}</li>)
                    setErrorList(errorLis)
                }
            })
    }

    function frontEndDeleteAvailability(trainerId, availabilityId, specialityId) {
        setSpecialities((prevSpecialities) => {
            return prevSpecialities.map((speciality) => {
                if (speciality.id === specialityId) {
                    return {
                        ...speciality,
                        trainers: speciality.trainers.map((trainer) => {
                            if (trainer.id === trainerId) {
                                const updatedAvailabilities = trainer.availabilities.filter(
                                    (availability) => availability.id !== availabilityId
                                )
                                return {
                                    ...trainer,
                                    availabilities: updatedAvailabilities,
                                }
                            }
                            return trainer
                        }),
                    }
                } else {
                    return speciality
                }
            })
        })
    }

    function clientDeleteAvailability(trainerId, availabilityId, specialityId) {
        fetch(`/trainers/${trainerId}/availabilities/${availabilityId}`, {
            method: "DELETE",
        })
            .then(() => frontEndDeleteAvailability(trainerId, availabilityId, specialityId))
            .catch((error) => {
                console.error("Error removing availability:", error)
            })
    }

    function deleteAppointment(appointmentId) {
        fetch(`/appointments/${appointmentId}`, {
            method: "DELETE",
        })
        .then(() => {
            const updatedAppointments = user.appointments.filter((a) => a.id !== appointmentId)
            setUser((prevUser) => ({ ...prevUser, appointments: updatedAppointments }))
        })
        .catch((error) => {
            console.error("Error removing appointment:", error)
        })
    }

    function deleteAvailability(availabilityId) {
        fetch(`/availabilities/${availabilityId}`, {
            method: 'DELETE',
        })
        .then(() => {
            const updatedAvailabilities = user.availabilities.filter((a) => a.id !== availabilityId)
            setUser((prevUser) => ({...prevUser, availabilities: updatedAvailabilities}))
        })
        .catch((error) => {
            console.error("Error removing availability:", error)
        })
    }
    
    function editAvailability(availabilityId, availability){
        fetch(`/availabilities/${availabilityId}`, {
            method: 'PATCH',
            body: JSON.stringify(availability),
            headers: {
                'Content-Type':'application/json',
            },
        })
        .then((r) => r.json())
        .then((updatedAvailability) => {
            if(!updatedAvailability.errors) {
                if (!updatedAvailability.error) {
                    frontEndEditAvailability(updatedAvailability, availabilityId)
                    setErrorList(null)
                }
                else {
                    const error = <li style={{ color: 'red' }}>{updatedAvailability.error}</li>
                    setErrorList([error])
                }
            }
            else {
                const errors = updatedAvailability.errors.map((error, index) => (
                    <li key={index} style={{ color: 'red' }}>{error}</li>
                ))
                setErrorList(errors)
            }
        })
    }

    function frontEndEditAvailability(updatedAvailability, availabilityId) {
        const updatedAvailabilities = user.availabilities.map((a) => {
            if (a.id === availabilityId) {
                return updatedAvailability
            }
            return a
        })
        setUser((prevUser) => ({...prevUser, availabilities: updatedAvailabilities}))
    }

    function addAvailability(newAvailabilty){
        fetch(`/availabilities`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(newAvailabilty),
        })
        .then((r) => r.json())
        .then((newAvailabilty) => {
            if(!newAvailabilty.errors){
                const newAvailabilities = [...user.availabilities, newAvailabilty]
                setUser((prevUser) => ({...prevUser, availabilities: newAvailabilities}))
            }
            else {
                const errorLis = newAvailabilty.errors.map((e, index) => <li key={index} style={{ color: 'red'}}>{e}</li>)
                setErrorList(errorLis)
            }
        })
    }

    return (
        <UserContext.Provider value={{ user, clientLoggedIn, trainerLoggedIn, clientLogin, trainerLogin, clientSignup, trainerSignup, logout, specialities, addSpeciality, clientUpdate, trainerUpdate, addAppointment, clientDeleteAvailability, deleteAppointment, deleteAvailability, editAvailability, addAvailability, errorList, isUserInvalid }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };