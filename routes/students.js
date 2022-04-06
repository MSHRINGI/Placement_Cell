const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students_controller');

router.get('/list', studentsController.list);
router.get('/form', studentsController.form);
router.post('/create', studentsController.create);
router.post('/:id/update', studentsController.update);
router.get('/data', studentsController.download);

module.exports = router;