import { getAllFeedbackService } from "@/services";
import { useEffect, useState } from "react";

const Feedbacks = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getFeedbacks = async () => {
      const res = await getAllFeedbackService();
      setData(res?.data);
    };
    getFeedbacks();
  }, []);

  console.log(data);
  const curriculumData = data?.map((item) => {
    return {
      description: item.description,
      studentName: item.studentId.userName,
      studentEmail: item.studentId.userEmail,
      courseTitle: item.courseId.title,
      curriculum: item.courseId.curriculum.filter((curriculum) => {
        return curriculum._id.toString() === item.curriculumId.toString();
      }),
    };
  });
  console.log(curriculumData);
  return <div>Feedbacks</div>;
};

export default Feedbacks;
