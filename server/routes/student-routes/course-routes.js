const express = require("express");
const {
  getStudentViewCourseDetails,
  getAllStudentViewCourses,
  
} = require("../../controllers/student-controller/course-controller");

const router = express.Router();

// Route to get all available courses for students
router.get("/get", getAllStudentViewCourses);

// Route to get detailed information about a specific course by its ID
router.get("/get/details/:id", getStudentViewCourseDetails);


module.exports = router;
