

import { Button } from '@/components/ui/button'
import { AuthContext } from '@/context/auth-context';
import { StudentContext } from '@/context/student-contex';
import { getCurrentCourseProgressService } from '@/services';
import { ChevronLeft } from 'lucide-react'
import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


function StudentViewCourseProgressPage() {

  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { studentCurrentCourseProgress, setStudentCurrentCourseProgress } = useContext(StudentContext);

  const { id } = useParams();



  // Fetch current course progress data from API or database based on the provided course ID.
  async function fetchCurrentCourseProgress() {
    const response = await getCurrentCourseProgressService(auth?.user?._id, id);
    console.log(response,"resp");
    
  }
  

  useEffect(() => {
    fetchCurrentCourseProgress();
  }, [id]);
  


  return (
    <div className="flex flex-col h-screen bg-[#1c1d1f] text-white">
      <div className="flex items-center justify-between p-4 bg-[#1c1d1f] border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate("/student-courses")}
            className="bg-white text-black border border-gray-300 hover:bg-gray-300"
            variant="ghost"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to My Courses Page
          </Button>
          <h1 className="text-lg font-bold hidden md:block">

          </h1>
        </div>
      </div>
    </div>
  )
}

export default StudentViewCourseProgressPage
