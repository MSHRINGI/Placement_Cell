const Employee = require('../models/employee');

// For sign in the employee
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

// For rendering the profile page
module.exports.profile = async function(req, res){
    try{
        let employee = await Employee.findById(req.user._id);
        // console.log("Employeeeee", employee);
        return res.render('profile', {
            title: "Employee Profile",
            employee: employee
        });
    }catch(err){
        console.log("Error in loading profile", err);
        return res.redirect('back');
    }
}

// For creating new Employee
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
        req.flash('success', "Employee Registered Successfully!!");
        console.log("Employee registered successfully");
        return res.redirect('/');
    }catch(err){
        console.log("Error in creating employee", err);
        req.flash('error', "Something went wrong");
        return res.redirect('back');
    }
}

// For creating the session for logged in user 
module.exports.createSession = async function(req, res){
    try{
        req.flash('success', "Logged in Successfully!!");
        return res.redirect('/');
    }catch(err){
        console.log("Error in creating session", err);
        req.flash('error', "Something went wrong");
        return res.redirect('back');
    }
}

// For Sign Out the employee
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