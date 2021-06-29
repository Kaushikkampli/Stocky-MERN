import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import {Input, Button} from "./partials/input.comp"

function Register(props) {

    let history = useHistory()

    const [user, setUser] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    })

    function handleChange(event) {
        const {name, value} = event.target

        setUser(function(prev) {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    async function addUser(event) {
        event.preventDefault()

        await axios.post("/api/users/register", user)
            .then((res) => {

                localStorage.setItem("user", res.data)
                props.displayMsg("Registered & Logged In!")
                props.authenticate()
                history.push("/index")
            })
            .catch((err) => console.log(err))
    }


    return (

        <form onSubmit={addUser}>

            <Input onChange={handleChange} value = {user.username} type="email" name="username" placeholder="name@example.com" />
            <Input onChange={handleChange} value = {user.password} type="password" name = "password" placeholder="Password" />
            <Input onChange={handleChange} value = {user.confirmPassword} type="text" name = "confirmPassword" placeholder="ConfirmPassword" />
            <Button name="Register" />
            
            
            {user.password === user.confirmPassword ? "" : <p>Passwords dont match</p>}
        </form>
    )
}

export default Register