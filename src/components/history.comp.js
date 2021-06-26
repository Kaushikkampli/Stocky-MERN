import React, { useEffect, useState } from "react"
import axios from "axios"

function TableRow(props) {
    return (
        <tr>
            <th scope="row">{props.index + 1}</th>
            <td>{props.stock.symbol}</td>
            <td>${props.stock.price}</td>
            <td>{props.stock.shares}</td>
            <td>${Math.round((props.stock.price * props.stock.shares) * 100)/100}</td>
            <td>{props.stock.time}</td>
        </tr>
    )
}

function History() {

    const [isLoading, setLoading] = useState(true)
    const[data, setData] = useState()

    useEffect(function() {
        axios.get("/trans/history", {withCredentials: true})
            .then((res) => {
                console.log(res.data)
                setData(res.data)
                setLoading(false)
            })
            .catch((err) => console.log(err))
    }, [])

    if(isLoading)
        return ( 
            <div className="container">
                <h3>Loading...</h3>
            </div>
        )

    return (
        <table className="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Symbol</th>
                <th scope="col">Buying Price</th>
                <th scope="col">Shares</th>
                <th scope="col">Total</th>
                <th scope="col">Time</th>
            </tr>
            </thead>

            <tbody>

            {data.map(function(stock, index) {
                return (
                    <TableRow key={index} stock={stock} index={index} />
                )
            })}

            </tbody>
        </table>
    )
}

export default History