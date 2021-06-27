import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import {Input, Button} from "./partials/input.comp"

function Login(props) {

    let history = useHistory()

    const [user, setUser] = useState({
        username: "",
        password: ""
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

    async function Authenticate(event) {
        event.preventDefault()
    
        axios.post("/api/users/login", user, {withCredentials: true})
            .then((res) => {
                console.log(res.data)
                localStorage.setItem("user", res.data)
                props.displayMsg("Logged In!")
                props.authenticate()
                history.push("/index")
            })
            .catch((err) => {
                console.log(err)
                props.displayMsg("Invalid Credentials")
            })
    }


    return (

        <form onSubmit={Authenticate}>

            <Input onChange={handleChange} value = {user.username} type="email" name="username" placeholder="name@example.com" />
            <Input onChange={handleChange} value = {user.password} type="password" name = "password" placeholder="Password" />
            <Button name="Login" />
            
        </form>
    )
}

export default Login