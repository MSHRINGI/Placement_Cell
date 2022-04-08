const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const Employee = require('../models/employee');
const env = require('../config/environment');

// authentication from google oauth strategy
passport.use(new googleStrategy({
        clientID : env.google_client_id,
        clientSecret : env.google_client_secret,
        callbackURL : env.google_call_back_url
    },
    function(accessToken, refreshToken, profile, done){
        Employee.findOne({email : profile.emails[0].value}).exec(function(err, employee){
            if(err){
                console.log("Error in finding user google passport-strategy", err);
                return;
            }
            // if user found then return user if not create new user
            if(employee){
                return done(null, employee);
            }else{
                Employee.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                }, function(err, employee){
                    if(err){
                        console.log("Error in creating user google passport-strategy", err);
                        return;
                    }
                    return done(null, employee);
                });
            }
        });
    }
));

module.exports = passport; 