import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './context/user'
import CustomSelect from './CustomSelect'

function Signup() {
    const { clientSignup, trainerSignup } = useContext(UserContext)
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [speciality, setSpeciality] = useState("")
    const [clientChecked, setClientChecked] = useState(false)
    const [trainerChecked, setTrainterChecked] = useState(false)
    const [errorList, setErrorList] = useState([])
    const [viewSpeciality, setViewSpeciality] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('/speciality_names')
            .then(r => r.json())
            .then((data) => {
                setViewSpeciality(data)
            })
    }, [])

    const handleClientCheck = () => {
        setClientChecked(!clientChecked)
        setTrainterChecked(false)
    }

    const handleTrainerCheck = () => {
        setTrainterChecked(!trainerChecked)
        setClientChecked(false)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (clientChecked) {
            fetch('/client_signup', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: passwordConfirmation
                })
            })
                .then(r => r.json())
                .then(client => {
                    if (!client.errors) {
                        clientSignup(client)
                        navigate('/profile')
                    }
                    else {
                        setPassword("")
                        setPasswordConfirmation("")
                        const errorLis = client.errors.map((e, index) => <li key={index} style={{ color: 'red' }}>{e}</li>)
                        setErrorList(errorLis)
                    }
                })
        }
        else if (trainerChecked) {
            fetch('/trainer_signup', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: passwordConfirmation,
                    speciality_id: speciality
                })
            })
                .then(r => r.json())
                .then(trainer => {
                    if (!trainer.errors) {
                        trainerSignup(trainer)
                        if (trainer.speciality_id !== 1){
                            navigate('/profile')
                        }
                        else {
                            navigate('/specialities/new')
                        }
                    }
                    else {
                        setPassword("")
                        setPasswordConfirmation("")
                        const errorLis = trainer.errors.map((e, index) => <li key={index} style={{ color: 'red' }}>{e}</li>)
                        setErrorList(errorLis)
                    }
                })
        }
        else {
            setErrorList(<li style={{ color: 'red' }}>Please check if you are a client or trainer</li>)
        }
    }

    return (
        <div>
            <label>
                Client:
                <input
                    type="checkbox"
                    checked={clientChecked}
                    onChange={handleClientCheck}
                />
            </label>
            <label>
                Trainer:
                <input
                    type="checkbox"
                    checked={trainerChecked}
                    onChange={handleTrainerCheck}
                />
            </label>
            <form onSubmit={handleSubmit}>
                <label>Username: </label>
                <input
                    type="text"
                    id="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br />
                <label>Name: </label>
                <input
                    type="text"
                    id="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /><br />
                <label>Email: </label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br />
                <label>Password: </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br />
                <label>Confirm Password: </label>
                <input
                    type="password"
                    id="password_confirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                /><br />
                {trainerChecked && (
                    <CustomSelect
                        value={speciality}
                        options={viewSpeciality}
                        onChange={(e) => setSpeciality(e.target.value)}
                    />
                )}
                <input type="submit" />
            </form>
            <ul>
                {errorList}
            </ul>
        </div>
    )
}

export default Signup