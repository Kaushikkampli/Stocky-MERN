import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import session from "express-session"
import passport from "passport"
import cors from "cors"
import cookieParser from "cookie-parser"

import usersRouter from "./routes/users.js"
import transRouter from "./routes/transactions.js"

dotenv.config()
const app = express()
const port = process.env.PORT

app.use(cors({
    origin: "https://stockyfrontend.netlify.app",
    credentials: true 
}))
app.use(express.json())

app.use(session({
    secret: "I actaully liked the song Baby",
    resave: true,
    saveUninitialized: true
}))

app.use(cookieParser("I actaully liked the song Baby"))

app.use(passport.initialize())
app.use(passport.session())

const uri = process.env.STOCKY_URI
mongoose.connect(uri, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("dB connected successfully"))
.catch((err) => console.log(err))

app.use("/api/users", usersRouter)
app.use("/api/trans", transRouter)

app.listen(port, function(){
    console.log(`listening on port ${port}`)
})