import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './context/user'

function Signup() {
    const { clientSignup, trainerSignup } = useContext(UserContext)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [clientChecked, setClientChecked] = useState(false)
    const [trainerChecked, setTrainterChecked] = useState(false)
    const [errorList, setErrorList] = useState([])


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
        if(clientChecked) {
            
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
                 /><br/>
                 <label>Email: </label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                 /><br/>
                 <label>Password: </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                 /><br/>
                 <label>Confirm Password: </label>
                <input
                    type="password"
                    id="password_confirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                 /><br/>
                 <input type="submit" />
            </form>
            <ul>
                {errorList}
            </ul>
        </div> 
    )
}

export default Signup