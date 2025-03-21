

import { Button } from '@/components/ui/button'
import { AuthContext } from '@/context/auth-context';
import { ChevronLeft } from 'lucide-react'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';


function StudentViewCourseProgressPage() {

  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);



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
