import mongoose from "mongoose"
import User from "./user.model.js"

const transSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    symbol: String,
    price: Number,
    shares: Number,
    time: String
})

const Transaction = new mongoose.model("Transaction", transSchema)

export default Transaction