const express = require('express');
const router = express.Router();
const passport = require('passport');

const employeesController = require('../controllers/employees_controller');

router.get('/sign_in', employeesController.signIn);
router.get('/sign_up', employeesController.signUp);
router.get('/profile', passport.checkAuthentication, employeesController.profile);
router.get('/destroy', employeesController.destroy);

router.post('/create', employeesController.create);
router.post('/create_session', passport.authenticate(
    'local',
    {failureRedirect : '/employees/sign_in'},
),employeesController.createSession);

module.exports = router