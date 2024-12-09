import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Layout from "./pages/layout/Layout";
import Home from "./pages/Home";
import SignUp from "./pages/register/SignUp";
import ContactUs from "./pages/contact/ContactUs";
import Pricing from "./pages/pricing/Pricing";
import Lesson1 from "./pages/lesson/lesson1/Lesson1";
import Lesson2 from "./pages/lesson/lesson2/Lesson2";
import Lesson3 from "./pages/lesson/lesson3/Lesson3";
import Login from "./pages/login/Login";
import VideoPage from "./pages/lesson/lesson3/VideoPage";
import VideoPage1 from "./pages/lesson/lesson1/VideoPage1";
import VideoPage2 from "./pages/lesson/lesson2/VideoPage2";
import ProtectedRoute from './pages/login/ProtectedRoute';
import NotFound from "./pages/notfound/NotFound";
import PersonalPage from "./pages/profile/PersonalPage";
import Portfolio from "./pages/profile/Portfolio";
import Order from "./pages/profile/Order";
import ProtectedRouteUser from "./pages/profile/ProtectedRouteUser";
import ChangePassword from "./pages/profile/ChangePassword";
import Help from "./pages/profile/Help";
import React, { useEffect } from 'react';
import ReadyQuez from "./pages/lesson/lesson1/quez/ReadyQuez";
import StartQuez from "./pages/lesson/lesson1/quez/StartQuez";
import KnowResult from "./pages/lesson/lesson1/quez/KnowResult";
import QuizNow from "./pages/lesson/lesson1/quez/QuizNow";
import LayoutDashBoard from './dashboard/layout/LayoutDashBoard';
import DashBoard from './dashboard/pages/DashBoard';
import Quiz from './dashboard/pages/quiz/Quiz';
import UploadLecture from './dashboard/pages/uploadLecture/UploadLecture';
import AllLecture from './dashboard/pages/all Lecture/AllLecture';
import AllQuizes from './dashboard/pages/all Quiz/AllQuizes';
import Result from './dashboard/pages/result/Result';
import AllStudent from './dashboard/pages/allStudent/AllStudent';
import StudentDetails from './dashboard/pages/allStudent/StudentDetails';
import Finacial from './dashboard/pages/finacial.jsx/Finacial';
import FinalQuiz from './components/FinalQuiz';
import Questionss from './components/Questions';

const AppRoutes = () => {
  const navigate = useNavigate(); // التوجيه باستخدام useNavigate
  const location = useLocation(); // الحصول على المسار الحالي

  React.useEffect(() => {
    if (location.pathname === '/dashboard') {
      navigate('/dashboard', { replace: true });
    }
  }, [ ]); // التحديث عند تغيير المسار

  
  return (
    <>
    {location.pathname.startsWith('/dashboard') ? (
        <Routes>
          <Route path="/dashboard" element={
            <ProtectedRoute element={<LayoutDashBoard />} requiredRole="is_super_admin" />
          }>
            <Route index element={<DashBoard />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="finacial" element={<Finacial />} /> 
            <Route path="upload" element={<UploadLecture />} />
            <Route path="all_lecture" element={<AllLecture />} />
            <Route path="all_Quiz" element={<AllQuizes />} />
            <Route path="all_Student" element={<AllStudent />} />
            <Route path="details" element={<StudentDetails />} />
            <Route path="result" element={<Result />} />
          </Route>
        </Routes>
      ) : (
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lesson1" element={<Lesson1 />} />
          <Route path="/lesson-video/:lessonId" element={<VideoPage1 />} />
          <Route path="/lesson2" element={<Lesson2 />} />
          <Route path="/lesson-video/:lessonId" element={<VideoPage2 />} />
          <Route path="/lesson3" element={<Lesson3 />} />
          <Route path="/lesson-video/:lessonId" element={<VideoPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/readyQuez" element={<ReadyQuez />} />
          <Route path="/startQuez" element={<StartQuez />} />
           <Route path="/finalQuiz" element={
            <ProtectedRoute
              element={<FinalQuiz />}
              requiredRole="is_super_admin"
            />
          } />
              <Route path="/questions" element={
            <ProtectedRoute
              element={<Questionss/>}
              requiredRole="is_super_admin"
            />
          } />
          <Route path="/signup" element={
            <ProtectedRoute
              element={<SignUp />}
              requiredRole="is_super_admin"
            />
          } />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/" element={<ProtectedRouteUser />}>
            <Route path="" element={<PersonalPage />}>
              <Route path="/information" element={<Portfolio />} />
              <Route path="/order" element={<Order />} />
              <Route path="/security" element={<ChangePassword />} />
              <Route path="/help" element={<Help />} />
            </Route>
          </Route>
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/knowResult" element={<KnowResult />} />
          <Route path="/quizNow" element={<QuizNow />} />
          <Route path="*" element={<NotFound />} />
           
        </Routes>
      </Layout>
    )}
  </>
);
};
const App = () => {
return (
  <Router>
    <AppRoutes />
  </Router>
);
};

export default App;