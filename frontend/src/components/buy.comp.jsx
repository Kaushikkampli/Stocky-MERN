import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import {Input, Button} from "./partials/input.comp"

function Buy(props) {

    const history = useHistory()

    const [stock, setStock] = useState({
        symbol: "",
        num: 0
    })

    function handleChange(event) {

        const {name, value} = event.target

        setStock(function(prev) {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    async function buyStock(event) {

        event.preventDefault()

        await axios.post("/trans/buy", stock, {withCredentials: true})
            .then((res) => {
                console.log(res.data)
                props.displayMsg(res.data)
                history.push("/index")
            })
            .catch((err) => console.log(err))
    }

    return (
        <form onSubmit={buyStock}>
        
            <Input onChange={handleChange} value={stock.symbol} type="text" name = "symbol" placeholder="Symbol" />
            <Input onChange={handleChange} value={stock.num} type="number" name = "num" placeholder="Shares" />
            <Button name="Buy" />
        
        </form>
    )
}

export default Buy