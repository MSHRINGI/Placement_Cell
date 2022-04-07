const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const Employee = require('../models/employee');

passport.use(new googleStrategy({
        clientID : '285418167104-79ouu053ru2802pqe4qkck3ok9099btk.apps.googleusercontent.com',
        clientSecret : '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',
        callbackURL : 'http://localhost:8882/employees/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done){
        Employee.findOne({email : profile.emails[0].value}).exec(function(err, employee){
            if(err){
                console.log("Error in finding user google passport-strategy", err);
                return;
            }
            // console.log(profile);

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