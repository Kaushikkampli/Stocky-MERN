
const genApiKey = function(symbol) {

    let api_url = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.API_KEY}`
    return api_url
}

export default genApiKey