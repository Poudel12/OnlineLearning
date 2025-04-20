const Course = require("../../models/Course");
const Order = require("../../models/Order");
const StudentCourses = require("../../models/StudentCourses");


const getCoursesByStudentId = async (req, res) => {

    try {
      const { studentId } = req.params;
      const studentBoughtCourses = await Order.find({
        userId: studentId,
        paymentStatus: "paid",
        orderStatus: "confirmed",
      }).select("courseId");

      // Extract courseIds from the array of orders
      const courseIds = studentBoughtCourses.map((order) => order.courseId);

      const studentCourses = await Course.find({
        _id: { $in: courseIds },
      })

      res.status(200).json({
        success: true,
        data: studentCourses,
      });
    }catch(error){
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Some error occured!",
        });
    }

}

module.exports = { getCoursesByStudentId };