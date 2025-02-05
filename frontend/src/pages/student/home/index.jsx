import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";
import React from 'react';
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

function StudentHomePage() {
  const { resetCredentials } = useContext(AuthContext);

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Navbar Section */}
      <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
        <h1 className="text-2xl font-bold">Infinite Learn</h1>
        <div className="space-x-4">
          <Link to="/profile" className="hover:text-gray-300">Profile</Link>
          <Link to="/settings" className="hover:text-gray-300">Settings</Link>
          <button
            onClick={handleLogout}
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Search Section */}
      <section className="p-6 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black"
          >
            <Search />
          </button>
        </div>
      </section>

      {/* Explore Courses Section */}
      <section className="p-6">
        <h2 className="text-xl font-semibold mb-4">Explore Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Demo Course Cards */}
          {[ 
            { 
              title: "Introduction to Python", 
              description: "Learn the basics of Python programming with hands-on examples.", 
              image: "https://via.placeholder.com/150" 
            },
            { 
              title: "Web Development Bootcamp", 
              description: "Master front-end and back-end development in this comprehensive course.", 
              image: "https://via.placeholder.com/150" 
            },
            { 
              title: "Data Science Essentials", 
              description: "Explore data analysis, visualization, and machine learning techniques.", 
              image: "https://via.placeholder.com/150" 
            },
            { 
              title: "Graphic Design Fundamentals", 
              description: "Develop your design skills using tools like Photoshop and Illustrator.", 
              image: "https://via.placeholder.com/150" 
            },
            { 
              title: "Digital Marketing 101", 
              description: "Understand the strategies to market products effectively online.", 
              image: "https://via.placeholder.com/150" 
            },
            { 
              title: "Project Management Basics", 
              description: "Learn essential project management concepts and tools.", 
              image: "https://via.placeholder.com/150" 
            }
          ].map((course, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="font-bold text-lg mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition">View Details</button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="p-4 text-center border-t border-gray-200">
        <p>&copy; 2025 Infinite Learn. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default StudentHomePage;
