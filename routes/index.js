const express = require('express');
const passport = require('../config/passport-local-strategy');
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);

router.use('/employees', require('./employees'));
router.use('/students', passport.checkAuthentication, require('./students'));
router.use('/interviews', passport.checkAuthentication, require('./interviews'));

module.exports = router;