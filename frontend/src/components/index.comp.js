import React, { useEffect, useState } from "react"
import axios from "axios"

function TableRow(props) {
    return (
        <tr>
            <th scope="row">{props.index + 1}</th>
            <td>{props.stock.name}</td>
            <td>{props.stock.symbol}</td>
            <td>${props.stock.price}</td>
            <td>{props.stock.shares}</td>
            <td>${props.stock.cost}</td>
        </tr>
    )
}

function CustomRow(props) {
    return (
        <tr>
            <th scope="row">{props.name}</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>${props.value}</td>
        </tr>
    )
}

function Index() {

    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState()

    useEffect(function(){
        
        axios.get("/api/trans/index", {withCredentials: true})
            .then(res => {
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
    else
    {
        return (
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Symbol</th>
                    <th scope="col">Current Price</th>
                    <th scope="col">Shares</th>
                    <th scope="col">Total</th>
                </tr>
                </thead>

                <tbody>

                    {data.stocks.map(function(stock, index){
                        return (
                            <TableRow key={index} stock = {stock} index = {index} />
                        )
                    })}


                    <CustomRow name="Portfolio" value={data.cashinstocks} />
                    <CustomRow name="Wallet" value={data.balance} />
                    <CustomRow name="Total" value={Math.round((data.cashinstocks + data.balance) * 100)/100} />

                </tbody>
            </table>
            )
        }
}

export default Index