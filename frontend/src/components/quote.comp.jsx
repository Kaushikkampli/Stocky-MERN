import React, { useState } from "react"
import axios from "axios"
import {Input, Button} from "./partials/input.comp"

function ResQuote(props) {
    let stock = props.stock
    return (
        <h3>A single share of {stock.name} ({stock.symbol}) costs {stock.price}</h3>    
    )
}

function Quote() {

    const [stock, setStock] = useState({
        symbol: "",
    })

    const [stockDetails, setData] = useState({})

    function handleData(obj) {
        setData(obj)
    }

    function handleChange(event) {
        const {name, value} = event.target

        setStock(function(prev) {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function getQuote(event) {
        axios.post("/trans/quote", stock, {withCredentials: true})
            .then(function(res) {
                handleData(res.data)
            })
            .catch((err) => console.log(err))

        event.preventDefault()
    }

    return (
        <div>
            <form onSubmit={getQuote}>
                
                <Input onChange={handleChange} value={stock.symbol} type="text" name="symbol" placeholder="Symbol" />
                <Button name="Quote" />
                
            </form>

            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Company</th>
                    <th scope="col">Symbol</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>Apple</td>
                    <td>AAPL</td>
                </tr>
                <tr>
                    <td>Tesla</td>
                    <td>TSLA</td>
                </tr>
                <tr>
                    <td>Netflix</td>
                    <td>NFLX</td>
                </tr>
                </tbody>
            </table>

            <ResQuote stock={stockDetails}/>
        </div>
    )
}

export default Quote