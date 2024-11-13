import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Home from "./pages/Home";
import SignUp from "./pages/register/SignUp";
import ContactUs from "./pages/contact/ContactUs";
import Pricing from "./pages/pricing/Pricing";
import Lesson1 from "./pages/lesson/lesson1/Lesson1";
import Lesson2 from "./pages/lesson/lesson2/Lesson2";
import Lesson3 from "./pages/lesson/lesson3/Lesson3";
import Login from "./pages/login/Login";
import UploadedVedio from "./pages/upload/UploadedVedio";
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
function App() {
  // useEffect(() => {
  //   // منع النقر بالزر الأيمن في الصفحة
  //   const handleRightClick = (event) => {
  //     event.preventDefault();
  //   };

  //   // إضافة الحدث إلى الوثيقة
  //   document.addEventListener('contextmenu', handleRightClick);

  //   // تنظيف الحدث عند مغادرة المكون
  //   return () => {
  //     document.removeEventListener('contextmenu', handleRightClick);
  //   };
  // }, []);
  return (
    <Router>
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
          <Route path="/upload" element={
            <ProtectedRoute
              element={<UploadedVedio />}
              requiredRole="is_super_admin"
            />
          } />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRouteUser />}>
            <Route path="" element={<PersonalPage />}>
              <Route path="/information" element={<Portfolio />} />
              <Route path="/order" element={<Order />} />
              <Route path="/security" element={<ChangePassword />} />
              <Route path="/help" element={<Help />} />
            </Route>
          </Route>
          <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
