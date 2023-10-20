import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorList, setErrorList] = useState("")
    const [clientChecked, setClientChecked] = useState(false)
    const [trainerChecked, setTrainterChecked] = useState(false)

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
                console.log(user)
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