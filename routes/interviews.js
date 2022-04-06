const express = require('express');
const router = express.Router();

const interviewsController = require('../controllers/interviews_controller');

router.get('/list', interviewsController.list);
router.get('/form', interviewsController.form);
router.post('/create', interviewsController.create);
router.post('/allocation', interviewsController.allocateInterview);
router.get('/:id/students', interviewsController.interviewDetail);

module.exports = router;