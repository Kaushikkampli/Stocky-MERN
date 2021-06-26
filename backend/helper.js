import Transaction from "./models/transaction.model.js"
import genApiKey from "./api_url.js"
import https from "https"

function getStock(symbol) {
    return new Promise(function(resolve, reject){

        let api_url = genApiKey(symbol)
        
        https.get(api_url, function(resp){
            resp.on("data", function(data){

                let obj = JSON.parse(data)

                let stock = {
                    name: obj.companyName,
                    symbol: obj.symbol,
                    price: obj.latestPrice
                }

                resolve(stock)
            })
        })
    })
}

function addStock(req, symbol, price, num) {

    if(req.user)
    {
        const stock = new Transaction({
            user_id: req.user._id,
            symbol: symbol,
            price: price,
            shares: num,
            time: new Date().toLocaleString()  
        })

        stock.save()
    }
}

function getCurrentStocks(req) {
    return new Promise(function(resolve, reject){
        Transaction.aggregate([
            {$match: {user_id: req.user._id}},
            {$group: {_id: "$symbol", count: {$sum: "$shares"}}},
            {$match: {count: {$gte: 1}}},
            {$sort: {_id: 1}}
        ], 
        function(err, stocks){
            resolve(stocks)
        })
    })
}

function getCount(req, symbol) {
    return new Promise(function(resolve, reject){
        
        Transaction.aggregate([
            {$match: {user_id: req.user._id, symbol: symbol}}, 
            {$group: {_id: "$symbol", count: {$sum: "$shares"}}}
        ],   
        function(err, stocks){
            if(!err)
            {
                resolve(stocks[0].count)
            }
        })
    })
}

function addPrices(currstocks) {
    return new Promise(async function(resolve, reject) {
        
        let obj = {
            stocks: [],
            cashinstocks: 0
        }

        for(let i = 0;i < currstocks.length; i++) {
            let temp = await getStock(currstocks[i]._id)
            
            let stock = {
                symbol: currstocks[i]._id,
                name: temp.name,
                shares: currstocks[i].count,
                price: temp.price,
                cost:  Math.round(currstocks[i].count * temp.price * 100)/100,
            }

            obj.stocks.push(stock)
            obj.cashinstocks +=  stock.cost

            if(i == currstocks.length - 1)
                resolve(obj)
        }
    })
}

export {getStock, addStock, getCurrentStocks, getCount, addPrices}