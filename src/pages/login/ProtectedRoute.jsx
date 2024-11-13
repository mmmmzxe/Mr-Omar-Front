import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem("user")); //  localStorage جلب معلومات المستخدم من 

  if (!user || !user[requiredRole]) {
    // إذا لم يكن المستخدم موجود أو ليس لديه الصلاحية المطلوبة، يتم توجيهه إلى صفحة تسجيل الدخول
    return <Navigate to="/login" replace />;
  }

  // إذا كان لديه الصلاحية، يعرض الصفحة المحمية
  return element;
};

export default ProtectedRoute;
