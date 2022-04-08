const express = require('express');
const router = express.Router();

const interviewsController = require('../controllers/interviews_controller');

// for fetching interview list
router.get('/list', interviewsController.list);

// for creating the interview
router.post('/create', interviewsController.create);

// for alloting interview to the student
router.post('/allocation', interviewsController.allocateInterview);

// for updating the result of the student
router.get('/:id/students', interviewsController.interviewDetail);

module.exports = router;