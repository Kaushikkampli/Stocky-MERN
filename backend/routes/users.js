import express from "express"
const router = express.Router()
import User from "../models/user.model.js"
import passport from "passport"

router.route('/')
    .get(function(req, res){
        User.find()
            .then(users => res.json(users))
            .catch(err => res.status(400).json('Error: ' +err))
    })

router.route("/register")
    .post(function(req, res, next){

        User.register({username: req.body.username}, req.body.password, function(err, user){
            if(err)
            {
                res.status(400).json("Error: " +err)
            }
            else
            {    
                passport.authenticate("local")(req, res,function(){
                    res.json("Registered!")
                })
            }
        })
    })

router.route("/login")
    .post(function(req, res, next){

        let user = req.body.user

        passport.authenticate('local', function(err, user, info) {
            if(err)
                return next(err)
            if(!user) 
                return res.json("err login")
            req.logIn(user, function(err) 
            {
                if(err) 
                    return next(err)
                res.json(req.user)
            })
          })(req, res, next)
    })

router.route("/logout")
    .get(function(req, res){

        req.logout();
        res.json("Logged out!")
    })


export default router