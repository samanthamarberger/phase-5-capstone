import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom"
import { UserContext } from './context/user'

function Login() {
    const { login } = useContext(UserContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorList, setErrorList] = useState("")
    const [clientChecked, setClientChecked] = useState(false)
    const [trainerChecked, setTrainterChecked] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (clientChecked) {
            fetch('/client_login', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(r => r.json())
            .then(user => {
                if (!user.errors) {
                    login(user)
                    setErrorList(null)
                    navigate(`/`)
                }
                else {
                    setUsername("")
                    setPassword("")
                    const errorLis = user.errors.map((e, index) => <li key={index} style={{ color: 'red' }}>{e}</li>)
                    setErrorList(errorLis)
                }
            })
        }
        if (trainerChecked) {
            fetch('/trainer_login', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(r => r.json())
            .then(user => {
                if (!user.errors) {
                    login(user)
                    setErrorList(null)
                    if(user.speciality_id === 1) {
                        navigate(`/profile`)
                    }   
                    else {
                        navigate ('/')
                    }   
                }
                else {
                    setUsername("")
                    setPassword("")
                    const errorLis = user.errors.map((e, index) => <li key={index} style={{ color: 'red' }}>{e}</li>)
                    setErrorList(errorLis)
                }
            })
        }
    }

    const handleClientCheck = () => {
        setClientChecked(!clientChecked)
        setTrainterChecked(false)
    }

    const handleTrainerCheck = () => {
        setTrainterChecked(!trainerChecked)
        setClientChecked(false)
    }

    return (
        <div className="Home">
            <form onSubmit={handleSubmit}>
                    <label>Username: </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    /> <br />
                    <label>Password: </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /> <br /> <br />
                    <label>
                        Client:
                        <input className="checkbox"
                            type="checkbox"
                            checked={clientChecked}
                            onChange={handleClientCheck}
                        />
                    </label> <br/>
                    <label>
                        Trainer:
                        <input className="checkbox"
                            type="checkbox"
                            checked={trainerChecked}
                            onChange={handleTrainerCheck}
                        />
                    </label>
                    <br />
                    <input className="login-submit" type="submit" />
                </form>
                <ul>
                    {errorList}
                </ul>
        </div>
    )
}

export default Login;