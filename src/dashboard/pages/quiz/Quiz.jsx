import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import style from '../../dashboard.module.css';
import styles from './quiz.module.css'
import MakeQuiz from '../../../pages/lesson/lesson1/quez/MakeQuiz'
import UpdateQuiz from '../../../pages/lesson/lesson1/quez/UpdateQuiz'
import Question from '../../../pages/lesson/lesson1/question/Question'
import UpdateQuestion from '../../../pages/lesson/lesson1/question/UpdateQuestion'
import TestApp from '../../../components/TestApp'
import UpdateAnswer from '../../../pages/lesson/lesson1/anser/UpdateAnswer'
import toast from 'react-hot-toast';
import SideBar from '../../component/SideBar'
import HeaderSearch from '../../component/HeaderSearch'
import UpdateTestApp from '../../../components/UpdateTestApp';
import TopBar from '../../component/TopBar';
const Quiz = () => {
  const [tab, setTab] = useState("create");
  const [question, setQuestion] = useState("create");
  const [answer, setAnswer] = useState("create");
  const [isLoading, setIsLoading] = useState(false);
  // delete quiz
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
        localStorage.removeItem("quiz_id");
      } else {
        const result = await response.json();
        toast.error(result.message || "حدث خطأ أثناء حذف الكويز");
      }
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("لا يوجد كويزات للحذف");
    } finally {
      setIsLoading(false);
    }
  };
  // delete question
  const handleDeleteQuestion = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const questionId = localStorage.getItem("question_id");

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
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        toast.success("تم حذف السؤال بنجاح");
        localStorage.removeItem("question_id");
      } else {
        toast.error("لا يوجد سؤال للحذف");
      }
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("حدث خطأ أثناء إرسال الطلب حاول مره اخرى");
    } finally {
      setIsLoading(false);
    }
  };
  // delete answer
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
        toast.error("لا يوجد اجابه للحذف");
      }
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("حدث خطأ أثناء إرسال الطلب حاول مره اخرى");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className={style.header_Dashboard}><TopBar /></div>
      <div className='flex'>
        <SideBar />
        <div className={`${styles.quiz} overflow-hidden w-full factoryActioncontent`}>
          <h1 className={`${styles.dashboard_Title} text-2xl font-semibold m-[20px_20px_40px] text-[#f26a40] relative`}>انشاء كويز</h1>
          <div className={`${styles.quiz_Show} grid mx-2.5 gap-2.5 md:mx-5 md:mb-5 md:gap-5 factoryActionwrapper`}>
            {/* Start Create Quiz */}
            <div className="bg-[#AABED11A] overflow-hidden p-4 welcome rad-10 txt-c-mobile block-mobile">
              <div className='flex items-center 2xl:ml-36 lg:ml-16 md:ml-28 text-center gap-3 md:gap-5'>
                <Link className={` ${tab === "create" ? styles.quiz_btn : ""} py-1 px-2.5 rounded-md mt-4 bg-white text-black block w-fit `} onClick={() => setTab("create")}>انشاء الكويز</Link>
                <Link className={` ${tab === "update" ? styles.quiz_btn : ""} py-1 px-2.5 rounded-md mt-4 bg-white text-black block w-fit `} onClick={() => setTab("update")}>نعديل الكويز</Link>
                <Link className="py-1 px-2.5 rounded-md mt-4 bg-white text-black block w-fit" onClick={handleDeleteQuiz}>حذف الكويز</Link>


              </div>
              {tab === "create" ? (
                <div>
                  <MakeQuiz />
                </div>
              ) : (
                <div>
                  <UpdateQuiz />
                </div>
              )}
            </div>
            {/* End Create Quiz */}
            {/* Start Create Question*/}
            <div className="bg-[#AABED11A] overflow-hidden p-4">
              <div className='flex items-center text-center gap-3 md:gap-5'>
                <Link className={` ${question === "create" ? styles.quiz_btn : ""} py-1 px-1.5 text-xs md:px-2.5 md:text-lg lg:text-2xl xl:text-lg rounded-md mt-4 bg-white text-black block w-fit `} onClick={() => setQuestion("create")}>انشاء السؤال</Link>
                <Link className={` ${question === "update" ? styles.quiz_btn : ""} py-1 px-1.5 text-xs md:px-2.5 md:text-lg lg:text-2xl xl:text-lg rounded-md mt-4 bg-white text-black block w-fit `} onClick={() => setQuestion("update")}>تعديل السؤال</Link>
                <Link className="py-1 px-1.5 text-xs md:px-2.5 md:text-lg rounded-md mt-4 bg-white text-black block w-fit lg:text-2xl xl:text-lg" onClick={handleDeleteQuestion}>حذف السؤال</Link>

              </div>
              {question === "create" ? (
                <div>
                  <Question />
                </div>
              ) : (
                <div>
                  <UpdateQuestion />
                </div>
              )}
            </div>
            {/* End Create Question*/}

            {/* Start Create Answer*/}
            <div className="bg-[#AABED11A] overflow-hidden p-4 welcome rad-10 txt-c-mobile block-mobile">
              <div className='flex items-center 2xl:ml-16 xl:ml-2 lg:ml-28 md:ml-16 text-center gap-3 md:gap-5'>
                <Link className={` ${answer === "create" ? styles.quiz_btn : ""} py-1 px-1.5 text-xs md:px-2.5 md:text-lg lg:text-2xl xl:text-lg rounded-md mt-4 bg-white text-black block w-fit `} onClick={() => setAnswer("create")}>انشاء الاجابه</Link>
                <Link className="py-1 px-1.5 text-xs md:px-2.5 md:text-lg rounded-md mt-4 bg-white text-black block w-fit lg:text-2xl xl:text-lg" onClick={handleDeleteAnswer}>حذف الاجابه</Link>
              </div>
              {answer === "create" ? (
                <div>
                  <TestApp />
                </div>
              ) : (
                <div>
                  <UpdateTestApp />
                </div>
              )}
            </div>
            {/* End Create Answer*/}
          </div>
        </div>
      </div>
    </>
  )
}

export default Quiz