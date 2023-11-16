import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState({})
    const [clientLoggedIn, setClientLoggedIn] = useState(false)
    const [trainerLoggedIn, setTrainerLoggedIn] = useState(false)
    const [specialities, setSpecialities] = useState([])
    const [errorList, setErrorList] = useState([])
    const navigate = useNavigate()

    const setLoggedIn = (userData) => {
        setUser(userData)
        fetchSpecialities()
        userData.status === 'Client' ? setClientLoggedIn(true) : setTrainerLoggedIn(true);
    }

    const signup = (userData) => {
        setLoggedIn(userData)
    }

    const login = (userData) => {
        setLoggedIn(userData);
    }

    const logout = () => {
        setUser({})
        setClientLoggedIn(false)
        setTrainerLoggedIn(false)
    }

    useEffect(() => {
        const handleClick = () => {
            setErrorList(null)
        }
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, [])

    const updateProfile = (url, data) => {
        fetch(url, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((r) => r.json())
            .then((profile) => {
                if (!profile.errors) {
                    const updatedUser = { ...user, ...profile }
                    setUser(updatedUser);
                    setErrorList(null);
                } else {
                    const errors = profile.errors.map((e, index) => (
                        <li key={index} style={{ color: "red" }}>{e}</li>
                    ));
                    setErrorList(errors)
                }
            })
    }

    function isUserInvalid(user) {
        return user.speciality_id === 1 || user.image === null || user.bio === null || user.location === null
    }

    useEffect(() => {
        fetch('/client_me')
            .then(r => r.json())
            .then((userData) => {
                if (!userData.error) {
                    setLoggedIn(userData)
                }
                else {
                    fetch('/trainer_me')
                        .then(r => r.json())
                        .then((userData) => {
                            if (!userData.error) {
                                setLoggedIn(userData)
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
                    setUser((prevUser) => ({ ...prevUser, appointments: updatedUserAppointments, trainers: updatedUserTrainers }))
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

    function deleteResource(url, resourceId, callback, errorMessage) {
        fetch(`${url}/${resourceId}`, {
            method: "DELETE",
        })
            .then(callback)
            .catch((error) => {
                console.error(`Error removing ${errorMessage}:`, error)
            });
    }

    function clientDeleteAvailability(trainerId, availabilityId, specialityId) {
        const callback = () => frontEndDeleteAvailability(trainerId, availabilityId, specialityId)
        deleteResource(`/trainers/${trainerId}/availabilities`, availabilityId, callback, 'availability')
    }

    function deleteAppointment(appointmentId) {
        const callback = () => {
            const updatedAppointments = user.appointments.filter((a) => a.id !== appointmentId)
            setUser((prevUser) => ({ ...prevUser, appointments: updatedAppointments }))
        }
        deleteResource("/appointments", appointmentId, callback, 'appointment')
    }

    function deleteAvailability(availabilityId) {
        const callback = () => {
            const updatedAvailabilities = user.availabilities.filter((a) => a.id !== availabilityId)
            setUser((prevUser) => ({ ...prevUser, availabilities: updatedAvailabilities }))
        };
        deleteResource("/availabilities", availabilityId, callback, 'availability')
    }

    function editAvailability(availabilityId, availability) {
        fetch(`/availabilities/${availabilityId}`, {
            method: 'PATCH',
            body: JSON.stringify(availability),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((r) => r.json())
            .then((updatedAvailability) => {
                if (!updatedAvailability.errors) {
                    if (!updatedAvailability.error) {
                        const updatedAvailabilities = user.availabilities.map((a) => (a.id === availabilityId ? updatedAvailability : a));
                        setUser((prevUser) => ({ ...prevUser, availabilities: updatedAvailabilities }))
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

    function addAvailability(newAvailabilty) {
        fetch(`/availabilities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAvailabilty),
        })
            .then((r) => r.json())
            .then((newAvailabilty) => {
                if (!newAvailabilty.errors) {
                    const newAvailabilities = [...user.availabilities, newAvailabilty]
                    setUser((prevUser) => ({ ...prevUser, availabilities: newAvailabilities }))
                }
                else {
                    const errorLis = newAvailabilty.errors.map((e, index) => <li key={index} style={{ color: 'red' }}>{e}</li>)
                    setErrorList(errorLis)
                }
            })
    }

    return (
        <UserContext.Provider value={{ user, login, signup, clientLoggedIn, trainerLoggedIn, logout, updateProfile, specialities, addSpeciality, addAppointment, clientDeleteAvailability, deleteAppointment, deleteAvailability, editAvailability, addAvailability, errorList, isUserInvalid }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };