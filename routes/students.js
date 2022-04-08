const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students_controller');

// for fetching the list of all the student
router.get('/list', studentsController.list);

// For creating student 
router.post('/create', studentsController.create);

// for updating the results of the student
router.post('/:id/update', studentsController.update);

// for downloading the data of all the student with results
router.get('/data', studentsController.download);

module.exports = router;