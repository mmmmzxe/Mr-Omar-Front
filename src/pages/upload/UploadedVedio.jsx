import React, { useState } from "react";
import { LuSubtitles } from "react-icons/lu";
import { MdDescription, MdCloudUpload } from "react-icons/md";
import toast from 'react-hot-toast';
import styles from '../lesson/lesson1/lesson.module.css';
import { Link } from "react-router-dom";

const UploadedVedio = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle the delete action for quiz
  const handleDeleteQuiz = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const quizId = localStorage.getItem("quiz_id");

    if (!accessToken) {
      toast.error("الرجاء تسجيل الدخول أولا");
      return;
    }

    if (!quizId) {
      toast.error("لا يوجد كويزات للحذف");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`https://omarroshdy.com/api/v1/quiz/${quizId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        toast.success("تم حذف الكويز بنجاح");
        // يمكنك مسح الـ ID من localStorage بعد الحذف إذا أردت
        localStorage.removeItem("quiz_id");
      } else {
        const result = await response.json();
        toast.error(result.message || "حدث خطأ أثناء حذف الكويز");
      }
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("حدث خطأ أثناء إرسال الطلب");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle the delete action for question
  const handleDeleteQuestion = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const questionId = localStorage.getItem("question_id");  // جلب ID السؤال من localStorage

    if (!accessToken) {
      toast.error("الرجاء تسجيل الدخول أولا");
      return;
    }

    if (!questionId) {
      toast.error("لا يوجد سؤال للحذف");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`https://omarroshdy.com/api/v1/question/${questionId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${accessToken}`, // إرسال الـ accessToken في الـ header
        },
      });

      if (response.ok) {
        toast.success("تم حذف السؤال بنجاح");
        // يمكنك مسح الـ ID من localStorage بعد الحذف إذا أردت
        localStorage.removeItem("question_id");
      } else {
        const result = await response.json();
        toast.error(result.message || "حدث خطأ أثناء حذف السؤال");
      }
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("حدث خطأ أثناء إرسال الطلب");
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteAnswer = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const answerId = localStorage.getItem("answer_id");

    if (!accessToken) {
      toast.error("الرجاء تسجيل الدخول أولا");
      return;
    }

    if (!answerId) {
      toast.error("لا يوجد إجابة للحذف");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`https://omarroshdy.com/api/v1/ans/${answerId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        toast.success("تم حذف الإجابة بنجاح");
        localStorage.removeItem("answer_id");
      } else {
        const result = await response.json();
        toast.error(result.message || "حدث خطأ أثناء حذف الإجابة");
      }
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("حدث خطأ أثناء إرسال الطلب");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <a href="https://omarroshdy.com/ubbergibberishwhizzlefoxtruploadotuplFlflimflamwombatwaffleboop">
        <h2 className={`${styles.main_title} uppercase dark:text-white text-black mx-auto my-20 border-2 border-black dark:border-white px-5 py-2.5 md:text-2xl text-xl w-fit relative z-10 transition duration-300`}>
          Go To Upload Vedio
        </h2>
      </a>

      <div>
        <Link to="/makeQuiz">
          <h2 className={`${styles.main_title} uppercase dark:text-white text-black mx-auto my-20 border-2 border-black dark:border-white px-5 py-2.5 md:text-2xl text-xl w-fit relative z-10 transition duration-300`}>
            انشاء كويز
          </h2>
        </Link>
        <Link to="/updateQuiz">
          <h2 className={`${styles.main_title} uppercase dark:text-white text-black mx-auto my-20 border-2 border-black dark:border-white px-5 py-2.5 md:text-2xl text-xl w-fit relative z-10 transition duration-300`}>
            تعديل كويز
          </h2>
        </Link>

        {/* زر حذف الكويز */}
        <button
          onClick={handleDeleteQuiz}
          className={`${styles.main_title} bg-[#AABED11A] uppercase dark:text-white text-black mx-auto my-20 border-2 text-center block border-black dark:border-white px-5 py-2.5 md:text-2xl text-xl w-fit relative z-10 transition duration-300`}
          disabled={isLoading}
        >
          {isLoading ? "جارِ الحذف..." : "حذف كويز"}
        </button>

        <Link to="/question">
          <h2 className={`${styles.main_title} uppercase dark:text-white text-black mx-auto my-20 border-2 border-black dark:border-white px-5 py-2.5 md:text-2xl text-xl w-fit relative z-10 transition duration-300`}>
            انشاء اسئله الامتحان
          </h2>
        </Link>
        <Link to="/updateQuestion">
          <h2 className={`${styles.main_title} uppercase dark:text-white text-black mx-auto my-20 border-2 border-black dark:border-white px-5 py-2.5 md:text-2xl text-xl w-fit relative z-10 transition duration-300`}>
            تعديل اسئله الامتحان
          </h2>
        </Link>
        
        {/* زر حذف السؤال */}
        <button
          onClick={handleDeleteQuestion}
          className={`${styles.main_title} bg-[#AABED11A] uppercase dark:text-white text-black mx-auto my-20 border-2 text-center block border-black dark:border-white px-5 py-2.5 md:text-2xl text-xl w-fit relative z-10 transition duration-300`}
          disabled={isLoading}
        >
          {isLoading ? "جارِ الحذف..." : "حذف السؤال"}
        </button>

        <Link to="/makeAnswer">
          <h2 className={`${styles.main_title} uppercase dark:text-white text-black mx-auto my-20 border-2 border-black dark:border-white px-5 py-2.5 md:text-2xl text-xl w-fit relative z-10 transition duration-300`}>
            انشاء اجابه الامتحان    
          </h2>
        </Link>
        <Link to="/updateAnswer">
          <h2 className={`${styles.main_title} uppercase dark:text-white text-black mx-auto my-20 border-2 border-black dark:border-white px-5 py-2.5 md:text-2xl text-xl w-fit relative z-10 transition duration-300`}>
            تعديل اجابه السؤال    
          </h2>
        </Link>

        <button
          onClick={handleDeleteAnswer}
          className={`${styles.main_title} bg-[#AABED11A] uppercase dark:text-white text-black mx-auto my-20 border-2 text-center block border-black dark:border-white px-5 py-2.5 md:text-2xl text-xl w-fit relative z-10 transition duration-300`}
          disabled={isLoading}
        >
          {isLoading ? "جارِ الحذف..." : "حذف الإجابة"}
        </button>
      </div>
    </>
  );
};

export default UploadedVedio;
