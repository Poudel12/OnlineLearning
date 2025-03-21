const CourseProgress = require("../../models/CourseProgress");
const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentCourses");

//mark current lecture as viewed
const markCurrentLectureAsViewed = async (req, res) => {
    try {


    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Some error occured!",
      });
    }

}

//get current course progress
const getCurrentCourseProgress = async (req, res) => {
    try{

    }catch(error){
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Some error occured!",
        });
    }
}



//reset course progress
const resetCurrentCourseProgress = async (req, res) => {
    try {


    } catch (error) {
    console.log(error);
    res.status(500).json({
        success: false,
        message: "Some error occured!",
    });
    }
}

module.exports = {
  markCurrentLectureAsViewed,
  getCurrentCourseProgress,
  resetCurrentCourseProgress,
};
