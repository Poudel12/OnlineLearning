import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";
import { courseCategories } from "@/config";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "@/context/student-contex";

function StudentHomePage() {

   const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

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
            src="/bannerimg.jpg"  //Corrected image path
            alt="Banner"
            width={600}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
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
    </div>
  );
}

export default StudentHomePage;
