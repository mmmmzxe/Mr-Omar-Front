import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import axios from "axios";
import './instructure.css'
import { FaInfoCircle } from "react-icons/fa";
import toast from 'react-hot-toast';
import planData from '../../../../assets/data/plan'
const StartQuez = () => {
    const [seconds, setSeconds] = useState(30);
    const [quizTitle, setQuizTitle] = useState("");
    const [error, setError] = useState("");
    const [questions, setQuestions] = useState([]);
    const [quizId, setQuizId] = useState(localStorage.getItem("quizId") || "");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selectedAnswerId, setSelectedAnswerId] = useState(null);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const lessonId = localStorage.getItem("lessonId");
    const [questionText, setQuestionText] = useState("");
    const hasAnswerText = answers.some(answer => answer.answer_text != null && answer.answer_text !== "");
    useEffect(() => {
        if (!lessonId) {
            setError("لا يوجد lessonId في localStorage.");
            return;
        }

        const fetchQuizData = async () => {
            try {
                const response = await fetch(`https://omarroshdy.com/api/v1/quizle/${lessonId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                });

                const data = await response.json();
                if (data && data.id) {
                    setQuizTitle(data.title);
                    localStorage.setItem("quizId", data.id);
                } else {
                    throw new Error("لا يوجد اختبارات حتى الان");
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchQuizData();
    }, [lessonId, accessToken]);


    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === "quizId") {
                setQuizId(event.newValue);
            }
            if (event.key === "answerId") {
                setSelectedAnswerId(event.newValue);
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);
    // Fetch answers for the current question
    useEffect(() => {
        const fetchAnswers = async () => {
            if (questions.length > 0) {
                const questionId = questions[currentQuestionIndex]?.id;
                try {
                    const response = await axios.get("https://omarroshdy.com/api/v1/ans", {
                        headers: { Authorization: `Bearer ${accessToken}` },
                        params: { question_id: questionId },
                    });

                    setAnswers(response.data || []);
                } catch (error) {
                    console.error("Error fetching answers:", error);
                }
            }
        };

        fetchAnswers();
    }, [currentQuestionIndex, questions, accessToken]);
    useEffect(() => {
        // إذا انتقل المستخدم من الصفحة، نقوم بمسح questionId و score من localStorage
        return () => {
            //localStorage.removeItem("quizId");
            localStorage.removeItem("score");  // حذف النتيجة من localStorage
            localStorage.removeItem("questionsLength");

            console.log("Question ID and score removed from localStorage.");
        };
    }, []);
    useEffect(() => {
        // دالة لتفريغ الـ localStorage عند العودة (back) إلى الصفحة الرئيسية
        const handlePopState = (event) => {
            if (event.state === null) {
                // تحقق من أن المستخدم عاد إلى الصفحة الرئيسية
                if (window.location.pathname === "/home") {
                    // حذف quizId من localStorage
                    localStorage.removeItem("quizId");
                    console.log("quizId removed from localStorage.");
                }
            }
        };

        // إضافة مستمع الحدث `popstate`
        window.addEventListener("popstate", handlePopState);

        // تنظيف المستمع عند مغادرة الصفحة
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };

    }, []);

    return (
        <>
            <div className="flex items-center justify-center m-5 gap-5">
                {/* start Plan */}

                <div className="plan green md:my-5 p-5 md:p-10">
                    <div className="top bg-numberNotfound text-center  p-5 mb-3">
                        <h2 className="m-0 text-white">اختبار على {quizTitle}</h2>
                    </div>
                    {planData.map((item, index) => (
                        <ul className="list-none p-0" key={index}>
                            <li>
                                <IoCheckmarkDoneSharp className="yes" />
                                <span className="md:text-lg text-xs text-black dark:text-white">{item.desc1}</span>
                                <FaInfoCircle className="help" />
                            </li>
                            <li>
                                <IoCheckmarkDoneSharp className="yes" />
                                <span className="md:text-lg text-xs text-black dark:text-white">{item.desc2}</span>
                                <FaInfoCircle className="help" />
                            </li>
                            <li>
                                <IoCheckmarkDoneSharp className="yes" />
                                <span className="md:text-lg text-xs text-black dark:text-white">{item.desc3}</span>
                                <FaInfoCircle className="help" />
                            </li>
                            <li>
                                <IoCheckmarkDoneSharp className="yes" />
                                <span className="md:text-lg text-xs text-black dark:text-white">{item.desc4}</span>
                                <FaInfoCircle className="help" />
                            </li>
                            <li>
                                <IoCheckmarkDoneSharp className="yes" />
                                <span className="md:text-base text-xs text-black dark:text-white">{item.desc5}</span>
                                <FaInfoCircle className="help" />
                            </li>

                            <li>
                                <IoCheckmarkDoneSharp className="yes" />
                                <span className="md:text-base text-xs text-black dark:text-white">{item.desc6}</span>
                                <FaInfoCircle className="help" />
                            </li>

                        </ul>

                    ))}
                    <Link to="/quizNow" className="py-1 px-2.5 rounded-md mt-4 bg-numberNotfound text-white block w-fit ">ابدا الامتحان</Link>
                </div>

                {/* End Plan */}

            </div>



        </>
    );
};

export default StartQuez;