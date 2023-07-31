const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');

router.get('/stored/courses', adminController.storedCourses);
router.get('/trash/courses', adminController.trashCourses);


module.exports = router;
