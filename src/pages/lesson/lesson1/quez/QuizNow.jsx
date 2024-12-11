import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import styles from './ques.module.css';
import axios from "axios";
import toast from 'react-hot-toast';
import { data } from "autoprefixer";

const QuizNow = () => {

    const [quizTitle, setQuizTitle] = useState("");
    const [error, setError] = useState("");
    const [questions, setQuestions] = useState([]);
    const [quizId, setQuizId] = useState(localStorage.getItem("quizId") || "");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selectedAnswerId, setSelectedAnswerId] = useState(null);
    const [quizDuration, setQuizDuration] = useState(0);  // Store the total quiz duration
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const lessonId = localStorage.getItem("lessonId");
    const [questionText, setQuestionText] = useState("");
    const hasAnswerText = answers.some(answer => answer.answer_text != null && answer.answer_text !== "");
    const hasQuestionText = questions.some(question => question.question_text != null && question.question_text !== "");
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [duration, setDuration] = useState(0);  // Duration for each question

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
                    setQuizDuration(data.duration || 0); 
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
    useEffect(() => {
        if (quizDuration > 0 && !isQuizFinished) {
            const countdown = setInterval(() => {
                setQuizDuration(prev => prev - 1);
            }, 1000);

            // Finish quiz when timer runs out
            if (quizDuration === 0) {
                setIsQuizFinished(true);
            }

            return () => clearInterval(countdown);
        }
    }, [quizDuration, isQuizFinished]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get("https://omarroshdy.com/api/v1/question", {
                    headers: { Authorization: `Bearer ${accessToken}` },
                    params: { quiz_id: localStorage.getItem("quizId") },
                });
    
                if (response.data && response.data.length > 0) {
                    const cleanedQuestions = response.data.map((question) => ({
                        ...question,
                        image: question.image === "https://omarroshdy.com/images" ? null : question.image, 
                    }));
    
                    const shuffledQuestions = shuffleArray(cleanedQuestions);
                    setQuestions(shuffledQuestions);
    
                    const firstQuestion = shuffledQuestions[0];
                    setQuestionText(firstQuestion.question_text);
    
                    if (firstQuestion.duration) {
                        setDuration(firstQuestion.duration);
                    }
    
                    localStorage.setItem("questionId", firstQuestion.id);
                    localStorage.setItem("questionsLength", shuffledQuestions.length);
                }
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchQuestions();
    }, [accessToken]);
    

    const shuffleArray = (array) => {
        let shuffledArray = [...array]; 
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));   
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];  
        }
        return shuffledArray;
    };
    useEffect(() => {
        const fetchAnswers = async () => {
            if (questions.length > 0) {
                const questionId = questions[currentQuestionIndex]?.id;
                try {
                    const response = await axios.get("https://omarroshdy.com/api/v1/ans", {
                        headers: { Authorization: `Bearer ${accessToken}` },
                        params: { question_id: questionId },
                    });
    
                    if (response.data && response.data.length > 0) {
                        // Map over the answers to clean up image URLs, similar to what you did for questions
                        const cleanedAnswers = response.data.map((answer) => ({
                            ...answer,
                            image: answer.image === "https://omarroshdy.com/images" ? null : answer.image, 
                        }));
    
                        setAnswers(cleanedAnswers);
                        console.log(response.data)
                    }
                } catch (error) {
                    console.error("Error fetching answers:", error);
                }
            }
        };
    
        fetchAnswers();
    }, [currentQuestionIndex, questions, accessToken]);
    

    const handleAnswerSelect = (id) => {
        setSelectedAnswerId(id);
        localStorage.setItem("answerId", id);
    };
    useEffect(() => {
        if (duration > 0 && !isQuizFinished) {
            const countdown = setInterval(() => {
                setDuration((prevDuration) => prevDuration - 1);
            }, 1000);
    
            if (duration === 0) {
                handleNextQuestion();
            }
    
            return () => clearInterval(countdown);
        }
    }, [duration, isQuizFinished]);
    
    const handleNextQuestion = () => {
        if (currentQuestionIndex === questions.length - 1) {
            setIsQuizFinished(true); // Quiz ends
        } else {
            const nextQuestionIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextQuestionIndex);
    
            // Set duration for the next question
            const nextQuestion = questions[nextQuestionIndex];
            if (nextQuestion?.duration) {
                setDuration(nextQuestion.duration);
            } else {
                setDuration(30); // Default duration if not specified
            }
        }
    };
    
    // Adjust handleConfirm to account for timer expiry and progression
    const handleConfirm = async () => {
        try {
            const studentId = localStorage.getItem("userId");
            const quizId = localStorage.getItem("quizId");
            const questionId = localStorage.getItem("questionId");
            const selectedAnswerId = localStorage.getItem("answerId");
    
            if (!studentId || !quizId || !questionId || !selectedAnswerId) {
                console.error("Missing required data.");
                return;
            }
    
            const selectedAnswer = answers.find(answer => answer.id === parseInt(selectedAnswerId));
            let currentScore = JSON.parse(localStorage.getItem("score")) || 0;
    
            if (selectedAnswer && selectedAnswer.is_correct === 1) {
                currentScore += 1; 
            }
            localStorage.setItem("score", JSON.stringify(currentScore));
    
            await axios.post(
                "https://omarroshdy.com/api/v1/response",
                {
                    student_id: studentId,
                    quiz_id: quizId,
                    question_id: questionId,
                    selected_answer_id: selectedAnswerId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
    
            // Move to the next question
            handleNextQuestion();
           

        } catch (error) {
            console.error("Error submitting response:", error);
            toast.error("حدث خطأ في إرسال الإجابة.");
        }
    };
    
    

    useEffect(() => {
        return () => {
            localStorage.removeItem("quizId");
            localStorage.removeItem("score");  
            localStorage.removeItem("questionsLength");

        };
    }, []);
    const handlePostRequest = async () => {
        const userId = localStorage.getItem('userId');
        const quizId = localStorage.getItem('quizId');
        const score = localStorage.getItem('score');
        const accessToken = localStorage.getItem('accessToken');   
        if (!userId || !quizId || !score || !accessToken) {
            return;
        }
        const body = {
            user_id: userId,
            quiz_id: quizId,
            score: score
        };

        try {
            const response = await fetch('https://omarroshdy.com/api/v1/result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,  
                },
                body: JSON.stringify(body),
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('quizId', data.quiz_id);
                navigate('');
                toast.success("تم تسجيل درجتك  بنجاح");
                console.log('تم إرسال البيانات بنجاح:', data);
            } else {
                console.error('فشل في إرسال البيانات:', data);
                toast.error('لقد تم تسجيل درجتك من قبل لا يمكنك الامتحان لاكثر من مره شكرا لك');
            }
        } catch (error) {
            console.error('خطأ في الاتصال بالـ API:', error);
            alert('حدث خطأ أثناء الاتصال بالخادم.');
        }
    };
    const handleBulletClick = (index) => {
        setCurrentQuestionIndex(index);  
     
    };
    return (

        <div className="container1 md:mt-8">

            {quizId ? (
                <>
                    <div className="flex md:flex-row flex-col-reverse md:mb-8 justify-between items-center  ">
                        <div className="pt-4 w-full mb-4 md:mb-0 md:w-[230px]">
                            <div>
                                <h1 className="bg-[#AABED11A] mt-4 text-center">
                                    <button className="border-none outline-none px-2 py-1 m-2 rounded text-white bg-[#f26a40] cursor-pointer mt-2 text-base">
                                        {quizDuration} Seconds : الوقت المتبقى
                                    </button>
                                </h1>

                            </div>
                        </div>
                        <div className="pt-4 md:w-[160px]">
                            <div className="bg-[#AABED11A] py-2 mt-4 text-center">
                                <a href='/knowResult'>
                                <button className="flex items-center gap-2 border-none outline-none px-2 py-1 mx-auto rounded text-white bg-[#f26a40] cursor-pointer text-base">
                                    <FaChevronRight />
                                    <h2>اعرف نتيجتك</h2>
                                </button>
                                </a>
                            </div>
                        </div>

                    </div>

                    {isQuizFinished ? (
                        <div>
                        <div className="text-center text-lg font-bold text-numberNotfound my-4 pb-8 md:my-8">
                            انتهت جميع الأسئلة. شكرًا لمشاركتك ! اضغط على اعرف نتيجتك
                        </div>
                        <button className="flex items-center gap-2 border-none outline-none px-2 py-1 mx-auto rounded text-white bg-[#f26a40] cursor-pointer text-base " onClick={handlePostRequest}>
                        <FaChevronRight />
                        <h2>حفظ الكويز</h2>
                    </button>
                    </div>
                    ) : (
                        <>
                            <div className="cursor-pointer">
                                {questions.length > 0 && questions[currentQuestionIndex] && (
                                    <>
                                        {/* إذا كان السؤال يحتوي على صورة */}
                                        {questions[currentQuestionIndex].image && questions[currentQuestionIndex].image.trim() !== "" && (
                                            <div className="flex justify-center md:pt-16 pt-8 pb-6">
                                                <img
                                                    src={questions[currentQuestionIndex].image}
                                                    alt="Question Image"
                                                    className="md:w-[500px] md:h-[150px] w-[300px] h-[80px] rounded-lg"
                                                />
                                            </div>
                                        )}

                                        {/* إذا كان السؤال يحتوي على نص */}
                                        {questions[currentQuestionIndex].question_text && (
                                            <h3 className={`${styles.question} flex items-center justify-center pb-6 border-b-[1px] border-b-[#F0F0F0] text-black dark:text-white md:text-[16px] text-sm `}>
                                                {questions[currentQuestionIndex].question_text}
                                            </h3>
                                        )}
                                    </>
                                )}
                            </div>
                            <div className="flex justify-center gap-2 mt-4">
                                {questions.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`w-4 h-4 rounded-full ${index === currentQuestionIndex ? "bg-blue-500" : "bg-gray-300"}`}
                                        onClick={() => handleBulletClick(index)}
                                        aria-label={`Go to question ${index + 1}`}
                                    ></button>
                                ))}
                            </div>

                            {hasAnswerText && (
                                <ul className={`${styles.start_Quiz} flex flex-col gap-4 text-sm lg:text-base text-[#767676] my-8 pb-8}`}>
                                 {answers.map((answer) => (
    <li
        key={answer.id}
        className={`${styles.input_Start} bg-[#AABED11A] px-2 xl:mx-64 rounded-lg pb-4 flex items-center gap-2 duration-300 dark:text-white text-black`}
    >
        <input
            className="mt-3 mr-2"
            type="radio"
            name="answer"
            value={answer.id}
            checked={selectedAnswerId === answer.id}
            onChange={() => handleAnswerSelect(answer.id)}
        />
        {answer.answer_text && (
            <span className={`${styles.answer} mt-2 text-lg`}>{answer.answer_text}</span>  // Display text if it exists
        )}
        {answer.image && (
            <div className="flex justify-center mt-2">
                <img
                    src={answer.image}
                    alt={`Answer ${answer.id}`}
                    className="md:w-[200px] md:h-[100px] w-[150px] h-[75px] rounded-lg"
                />
            </div>
        )}
    </li>
))}

                                    <div className={`${styles.input_Start} xl:mx-64 pb-4`}>
                                        <button className="border-none outline-none px-4 py-1.5 rounded text-white bg-[#f26a40] cursor-pointer mt-2 text-base" onClick={handleConfirm}>
                                            <Link to="">تاكيد</Link>
                                        </button>
                                    </div>
                                </ul>
                            )}


                            {/* عرض الصورة خارج الـ ul إذا كانت الإجابة تحتوي على صورة */}
                            {answers.some(answer => !answer.answer_text && answer.image) && (
                                <>
                                    <ul className={`${styles.start_Quiz} flex justify-between gap-4 my-12 pb-8}`}>
                                        {answers.map((answer) => (
                                            <li>

                                                {!answer.answer_text && answer.image && (
                                                    <img
                                                        key={answer.id}
                                                        src={answer.image}
                                                        alt="Answer Image"
                                                        className="md:w-[250px] md:h-[100px] w-[150px] h-[45px]"
                                                    />
                                                )}
                                                <input
                                                    className="text-center 2xl:mr-32 xl:mr-28 md:mr-16 mr-8 mt-6"
                                                    type="radio"
                                                    name="answer"
                                                    value={answer.id}
                                                    checked={selectedAnswerId === answer.id}
                                                    onChange={() => handleAnswerSelect(answer.id)}
                                                />
                                            </li>
                                        ))}

                                    </ul>
                                    <div className='text-end'>
                                        <button
                                            onClick={handleConfirm}
                                            className="border-none outline-none px-4 mb-4 py-1.5 rounded text-white bg-[#f26a40] cursor-pointer text-base"
                                        >
                                            تأكيد
                                        </button>
                                    </div>
                                </>
                            )}
                        </>
                    )}

                </>
            ) : (
                <p className="text-center my-12 py-4">لا يوجد اختبار حتى الان</p>  
            )}
        </div>
    )
}

export default QuizNow