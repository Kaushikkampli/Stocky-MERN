import express from "express"
const router = express.Router()
import Transaction from "../models/transaction.model.js"
import {getStock, addStock, getCurrentStocks, getCount, addPrices} from "../helper.js"

router.route("/")
    .get(function(req, res){

        Transaction.find()
            .then(() => res.json(transactions))
            .catch((err) => res.status(400).json("Error: " +err))
    })

router.route("/add")
    .post(function(req, res){

        const stock = new Transaction({
            user_id: req.user._id,
            symbol: symbol,
            price: price,
            shares: num,
            time: new Date().toLocaleString()  
        })
        
        stock.save()

        res.json("added")
    })

router.route("/index")
    .get(async function(req, res){
        if(req.user)
        {
            let currstocks = await getCurrentStocks(req)
            let data = {stocks : []}
            
            if(currstocks.length > 0) {
                data = await addPrices(currstocks)
                data.cashinstocks = Math.round(data.cashinstocks * 100)/100
                data.balance = Math.round(req.user.balance * 100)/100
            }
            else {
                data.cashinstocks = 0
                data.balance = req.user.balance
            }
            
            res.json(data)
        }
    })

router.route("/quote")
    .post((async function(req, res){
        
        let stock = await getStock(req.body.symbol)
        res.json(stock)
    }))

router.route("/buy")
    .post(async function(req, res){
        
            let symbol = req.body.symbol
            let num = req.body.num

            let stock = await getStock(symbol)
            let acq_cost = stock.price * num

            if(acq_cost <= req.user.balance){
                
                req.user.balance -= acq_cost
                addStock(req, symbol, stock.price, num)
                req.user.save()
                res.json("Bought!")
            }
            else
                res.json("Insufficient balance!")
    })

router.route("/preSell")
    .get(async function(req, res){
        let stocks = await getCurrentStocks(req)
        res.json(stocks)
    })

router.route("/sell")
    .post(async function(req, res){
        if(req.user)
        {
            
            let symbol = req.body.symbol
            let num = req.body.num

            let shares = await getCount(req, symbol)
            
            if(num <= shares)
            {
                let stock = await getStock(symbol)
                req.user.balance += (stock.price * num)
                addStock(req, symbol, stock.price, -1 * num)

                req.user.save()
                res.json("Sold!")

            }
            else
                res.json("Not Enough Shares!")
        }
    })

router.route("/history")
    .get(function(req, res){

        if(req.user)
        {
            Transaction.find({user_id: req.user._id}, function(err, stocks){

                res.json(stocks.reverse())
            })
        }
    })

export default router