import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Button = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const accessToken = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!accessToken || !user) {
      // إذا لم يكن المستخدم مسجلاً للدخول، الانتقال إلى صفحة تسجيل الدخول
      navigate("/login");
      toast.error("قم بتسجيل الدخول لتتمكن من مشاهده المحاضرات");
      return;
    }

    // التحقق من السنة الدراسية وتوجيه   
    const studyYear = user.studyyear;

    if (studyYear === "3") {
      navigate("/lesson3");
    } else if (studyYear === "2") {
      navigate("/lesson2");
    } else if (studyYear === "1") {
      navigate("/lesson1");
    } else {
      toast.error("السنة الدراسية غير معروفة");
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      className="m-5 text-lg no-underline w-[130px] h-[35px] text-center text-white rounded-md px-6 font-cairo font-medium bg-transparent cursor-pointer transition-all duration-300 ease-in-out relative inline-block border-none z-10 outline-none join_btn"
    >
      انضم الآن
    </button>
  );
};

export default Button;
