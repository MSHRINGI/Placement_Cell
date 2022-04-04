const Employee = require('../models/employee');

module.exports.signIn = async function(req, res){
    try{
        if(req.isAuthenticated()){
            return res.redirect('/employees/profile');
        }
        return res.render('sign_in', {
            title: "Sign In"
        })
    }catch(err){
        console.log("Error in sign in page", err);
        return res.redirect('back');
    }
}

module.exports.signUp = async function(req, res){
    try{
        if(req.isAuthenticated()){
            return res.redirect('/employees/profile');
        }
        return res.render('sign_up', {
            title: "Sign Up"
        })
    }catch(err){
        console.log("Error in sign up page", err);
        return res.redirect('back');
    }
}

module.exports.profile = async function(req, res){
    try{
        return res.render('profile', {
            title: "Employee Profile"
        });
    }catch(err){
        console.log("Error in loading profile", err);
        return res.redirect('back');
    }
}

module.exports.create = async function(req, res){
    try{
        if(req.body.password != req.body.confirm_password){
            console.log("Passwords did not match");
            req.flash("error", "Passwords did not match");
            return res.redirect("back");
        }
        let employee = await Employee.findOne({email: req.body.email});
        if(employee){
            console.log("Employee already exists. Please Sign In");
            req.flash('error', `${req.body.email} is already exists`);
            return res.redirect('/employees/sign_in');
        }
        employee = Employee.create(req.body);
        req.flash('success', "Employee registered successfully");
        console.log("Employye registered successfully");
        return res.redirect('/');
    }catch(err){
        console.log("Error in creating employee", err);
        req.flash('error', "Something went wrong");
        return res.redirect('back');
    }
}

module.exports.createSession = async function(req, res){
    try{
        req.flash('success', "logged in successfully!!");
        return res.redirect('/');
    }catch(err){
        console.log("Error in creating session", err);
        req.flash('error', "Something went wrong");
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res){
    try{
        req.logout();
        req.flash('success', 'Employee logged out!!');
        return res.redirect('/');
    }catch(err){
        console.log("Error in destroying session", err);
        req.flash('error', "Something went wrong");
        return res.redirect('back');
    }
}