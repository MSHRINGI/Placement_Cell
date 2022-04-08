const express = require('express');
const router = express.Router();
const passport = require('passport');

const employeesController = require('../controllers/employees_controller');

// for sign in and sign up the employees ('/employees/sign_in')
router.get('/sign_in', employeesController.signIn);

// for visiting the profile page('/employees/profile')
router.get('/profile', passport.checkAuthentication, employeesController.profile);

// For sign out the employee
router.get('/destroy', employeesController.destroy);

// for creating the employee
router.post('/create', employeesController.create);

// for local authentication
router.post('/create_session', passport.authenticate(
    'local',
    {failureRedirect : '/employees/sign_in'},
),employeesController.createSession);

// for google oauth authentication
router.get('/auth/google', passport.authenticate('google', {scope:['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate(
    'google', 
    {failureRedirect : 'employees/sign_in'}
), employeesController.createSession);

module.exports = router