import { Route, Routes } from 'react-router-dom'
import AuthPage from "./pages/auth/index.jsx";
import RouteGuard from "./components/route-guard";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import InstructorDashboardpage from "./pages/instructor";
import StudentViewCommonLayout from './components/student-view/common-layout.jsx';
import StudentHomePage from "./pages/student/home";
import NotFoundPage from './pages/not-found/index.jsx';
import AddNewCoursePage from './pages/instructor/add-new-course.jsx';
import StudentViewCoursesPage from './pages/student/courses/index.jsx';
import LiveClassPage from './pages/instructor/liveclass.jsx';
import StudentViewCourseDetailsPage from './pages/student/course-details/index.jsx';
import  { VideoMeeting } from './video-meeting/roomId/MeetingPage.jsx';

function App() {

  const {auth} = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <RouteGuard
            element={<AuthPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor"
        element={
          <RouteGuard
            element={<InstructorDashboardpage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor/create-new-course"
        element={
          <RouteGuard
            element={<AddNewCoursePage/>}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor/start-live-class"
        element={
          <RouteGuard
            element={<LiveClassPage/>}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor/edit-course/:courseId"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor/start-live-class/video-meeting/:roomId"
        element={
          <RouteGuard
            element={<VideoMeeting />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/"
        element={
          <RouteGuard
            element={<StudentViewCommonLayout />}
            authenticated={auth.authenticate}
            user={auth.user}
          />
        }
      >
        <Route path="" element={<StudentHomePage />} />
        <Route path="home" element={<StudentHomePage />} />
        <Route path="courses" element={<StudentViewCoursesPage />} />
        <Route path="course/details/:id" element={<StudentViewCourseDetailsPage />} />

      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
