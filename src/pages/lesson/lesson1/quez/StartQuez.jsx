import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronRight, FaInfoCircle } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import axios from "axios";
import toast from 'react-hot-toast';
import planData from '../../../../assets/data/plan';
import './instructure.css';

const StartQuez = () => {
    const [seconds, setSeconds] = useState(30); // Timer in seconds
    const [quizTitle, setQuizTitle] = useState("");
    const [error, setError] = useState("");
    const [questions, setQuestions] = useState([]);
    const [quizId, setQuizId] = useState(localStorage.getItem("quizId") || "");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selectedAnswerId, setSelectedAnswerId] = useState(null);
    const [duration, setDuration] = useState(0); // New duration state
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const lessonId = localStorage.getItem("lessonId");

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
        const fetchAnswers = async () => {
            if (questions.length > 0) {
                const questionId = questions[currentQuestionIndex]?.id;
                try {
                    const response = await axios.get("https://omarroshdy.com/api/v1/ans", {
                        headers: { Authorization: `Bearer ${accessToken}` },
                        params: { question_id: questionId,},
                    });

                    setAnswers(response.data || []);
                    console.log(response.data);
                } catch (error) {
                    console.error("Error fetching answers:", error);
                }
            }
        };

        fetchAnswers();
    }, [currentQuestionIndex, questions, accessToken]);

   

    return (
        <>
            <div className="flex items-center justify-center m-5 gap-5">
                {/* Plan Section */}
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
                    <Link to="/quizNow" className="py-1 px-2.5 rounded-md mt-4 bg-numberNotfound text-white block w-fit">
                        ابدا الامتحان
                    </Link>
                </div>
            </div>
        </>
    );
};

export default StartQuez;
