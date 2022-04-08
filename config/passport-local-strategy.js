const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Employee = require('../models/employee');

// authentication using Passport
passport.use(new LocalStrategy({
        usernameField : 'email'
    },
    function(email, password, done){
        Employee.findOne({email : email}, function(err, employee){
            if(err){
                console.log("Error in finding the user --> Passport");
                return done(err);
            }
            if(!employee || employee.password != password){
                console.log("Invalid Email/Password while sign in");
                return done(null, false);
            }
            return done(null, employee);
        });
    }
));

// serializing the user to decide which key is to be kept in cookie
passport.serializeUser(function(employee, done){
    done(null, employee._id);
});

// deserializing the user from the key in the cookie
passport.deserializeUser(function(id, done){
    Employee.findById(id, function(err, employee){
        if(err){
            console.log("Error in finding user while deserialized");
            return done(err);
        }
        return done(null, employee);
    });
});

// made middleware for checking the employee is logged in or not
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/employees/sign_in');
}

// save the user into the locals
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;