import mongoose from "mongoose"
import passport from "passport"
import passportLocalMongoose from "passport-local-mongoose"

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    balance: {
        type: Number,
        default: 10000
    }
})

userSchema.plugin(passportLocalMongoose)

const User = new mongoose.model('User', userSchema)

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export default User