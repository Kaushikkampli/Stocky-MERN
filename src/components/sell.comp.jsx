import React, { useEffect, useState } from "react"
import axios from "axios"
import { useHistory } from "react-router"
import {Input, Button} from "./partials/input.comp"

function Sell(props) {

    let history = useHistory()

    const [stock, setStock] = useState({
        symbol: "",
        num: 0
    })

    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState()

    useEffect(function(){
        axios.get("/trans/preSell", {withCredentials: true})
            .then((res) => {
                setData(res.data)
                setLoading(false)
            })
            .catch((err) => console.log(err))
    }, [])

    function handleChange(event) {

        const {name, value} = event.target
        setStock(function(prev){
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function sellStock(event) {
        event.preventDefault()

        axios.post("http://localhost:5000/trans/sell", stock, {withCredentials: true})
            .then((res) => {
                console.log(res.data)
                props.displayMsg(res.data)
            })
            .catch((err) => console.log(err))

        history.push("/index")
    }

    if(isLoading)
        return ( 
            <div className="container">
                <h3>Loading...</h3>
            </div>
        )
    else
    {
        return (
                <form onSubmit={sellStock}>
                    <div className="form-group">
                        <select onChange={handleChange} value={stock.symbol} name="symbol" className="form-control" data-style="btn-primary">
                            <option value = "">Choose</option>
                            {data.map(function(s, i){
                                return (
                                    <option key={i} value = {s._id}> {s._id}</option>
                                )
                            })}
                        </select>
                    </div>

                    <Input onChange={handleChange} value={stock.num} type="number" name = "num" placeholder="Shares" />
                    <Button name="Sell" />
                </form>
        )
    }
}

export default Sell