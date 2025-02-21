import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { courseCategories } from "@/config";
import { StudentContext } from "@/context/student-contex";
import { fetchStudentViewCourseListService } from "@/services";

function StudentHomePage() {
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);
  

  async function fetchAllStudentViewCourses() {
    const response = await fetchStudentViewCourseListService();
    console.log(response, "courselist_in_student");
    if (response?.success) setStudentViewCoursesList(response?.data);
  }

  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-4xl font-bold mb-4">Learning that gets you</h1>
          <p className="text-xl">
            Skills for your present and your future. Get started with us.
          </p>
        </div>
        <div className="lg:w-full mb-8 lg:mb-0">
          <img
            src="/bannerimg.jpg" 
            alt="Banner"
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-8 px-4 lg:px-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {courseCategories.map((categoryItem) => (
            <Button className="justify-start" variant="outline" key={categoryItem.id}>
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-12 px-4 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.map((courseItem) => (
              <div
                className="border rounded-lg overflow-hidden shadow cursor-pointer"
                key={courseItem.id}
              >
                <img
                  src={courseItem?.image}
                  alt={courseItem.title}
                  className="w-full h-40 object-contain p-2 bg-white"
                />
                <div className="p-4">  
                  <h3 className="font-bold mb-2">{courseItem?.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    {courseItem?.instructorName}
                  </p>
                  <p className="font-bold text-[16px]">
                    ${courseItem?.pricing}
                  </p>
                

                </div>
              </div>
            ))
          ) : (
            <h1>No Courses Found</h1>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage;
