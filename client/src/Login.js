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
                if (!user.error) {
                    login(user)
                    navigate(`/`)
                }
                else {
                    setUsername("")
                    setPassword("")
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
        <div>
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
                    /> <br />
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
                    <br />
                    <input type="submit" />
                </form>
                <ul>
                    {errorList}
                </ul>
        </div>
    )
}

export default Login;