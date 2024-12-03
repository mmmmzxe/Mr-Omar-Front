import React, { useState, useEffect } from "react";
import styles from './finalQuiz.module.css'
import { MdCloudUpload } from "react-icons/md";
import delet from '../assets/SVGRepo_iconCarrier.svg'
import updateQuiz from '../assets/updateQuiz.png'
import toast from 'react-hot-toast';
import add from '../assets/add.png'
const FinalQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lessonId, setLessonId] = useState("");
  const [lessonIdFromPost, setLessonIdFromPost] = useState("");
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [imageAsset, setImageAsset] = useState(null); // حفظ الصورة
  const [progress, setProgress] = useState(0); // التقدم في رفع الصورة
  const quizId = localStorage.getItem("quiz_id");
  const accessToken = localStorage.getItem("accessToken");
  const [answers, setAnswers] = useState([
    { answer_text: '', is_correct: false },
    { answer_text: '', is_correct: false },
    { answer_text: '', is_correct: false },
    { answer_text: '', is_correct: false },
]);
  useEffect(() => {
    const fetchLessons = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        toast.error("الرجاء تسجيل الدخول أولا");
        return;
      }

      try {
        const response = await fetch("https://omarroshdy.com/api/v1/admlessons", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setLessons(data);
        } else {
          toast.error("تاكد من اتصالك بالانترنت");
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
        toast.error("تاكد من اتصالك بالانترنت");
      }
    };

    fetchLessons();
  }, []);

  const handleClearAnswer = (index) => {
    handleInputChange(index, "answer_text", ""); // تحديث النص ليصبح فارغًا
  };
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
  const handleCreateQuiz = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      toast.error("الرجاء تسجيل الدخول أولا");
      return;
    }

    const requestBody = {
      title,
      description,
      lesson_id: lessonId,
    };

    try {
      const response = await fetch("https://omarroshdy.com/api/v1/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      const text = await response.text();
      console.log("Response Text:", text);

      try {
        const data = JSON.parse(text);
        if (response.ok) {
          toast.success("تم إنشاء الكويز بنجاح");
          localStorage.setItem("quiz_id", data.id);
          localStorage.setItem("lesson_id", data.lesson_id);
          setLessonIdFromPost(data.lesson_id);

          setTitle("");
          setDescription("");
          setLessonId("");
        } else {
          toast.error(data.message || "حدث خطأ أثناء إنشاء الكويز");
        }
      } catch (error) {
        console.error("Response is not valid JSON:", error);
        toast.error("استجابة غير صحيحة من الخادم");
      }
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("حدث خطأ أثناء إرسال الطلب");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageAsset(file);
    }
  };
  const handleSubmitQuestion = async (e) => {
    e.preventDefault();

    if (!accessToken) {
      toast.error("الرجاء تسجيل الدخول أولا");
      return;
    }
    if (!quizId) {
      toast.error("الرجاء التأكد من وجود quiz_id");
      return;
    }

    const formData = new FormData();
    formData.append("question_text", questionText);
    formData.append("quiz_id", quizId);

    if (imageAsset) {
      formData.append("image", imageAsset);
    }

    try {
      setIsLoading(true);

      const response = await fetch("https://omarroshdy.com/api/v1/question", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("تم إضافة السؤال بنجاح");
        setQuestionText("");
        setImageAsset(null);

        localStorage.setItem("quiz_id", result.quiz_id);
        localStorage.setItem("question_id", result.id.toString());

        console.log(result.image); // هنا إذا كانت الصورة موجودة
      } else {
        toast.error(result.message || "حدث خطأ أثناء إضافة السؤال");
      }

      setIsLoading(false);
    } catch (error) {
      toast.error("حدث خطأ أثناء إرسال الطلب");
      setIsLoading(false);
    }
  };

const handleInputChange = (index, field, value) => {
    const updatedAnswers = [...answers];
    if (field === 'is_correct') {
        // تأكد أن الإجابة الصحيحة واحدة فقط
        updatedAnswers.forEach((answer, i) => {
            answer.is_correct = i === index;
        });
    } else {
        updatedAnswers[index][field] = value;
    }
    setAnswers(updatedAnswers);
};
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
      toast.error("لا يوجد سؤال للحذف");
    }
  } catch (error) {
    console.error("Request failed:", error);
    toast.error("حدث خطأ أثناء إرسال الطلب حاول مره اخرى");
  } finally {
    setIsLoading(false);
  }
};
const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("accessToken");
  const questionId = localStorage.getItem("question_id");

  if (!token || !questionId) {
    console.error("Missing access token or question ID.");
    return;
  }

  try {
    const responses = await Promise.all(
      answers.map(async (answer) => {
        const formData = new FormData();
        formData.append("question_id", questionId);
        formData.append("answer_text", answer.answer_text);
        formData.append("is_correct", answer.is_correct ? 1 : 0);
        if (answer.image) {
          formData.append("image", answer.image);
        }

        return await fetch("https://omarroshdy.com/api/v1/ans", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      })
    );

    let allSuccessful = true;

    for (const response of responses) {
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error Response:", errorText);
        allSuccessful = false;
        break;
      }
    }

    if (allSuccessful) {
      console.log("All answers submitted successfully.");
      setAnswers([
        { answer_text: "", is_correct: false, image: null, progress: 0, isLoading: false },
        { answer_text: "", is_correct: false, image: null, progress: 0, isLoading: false },
        { answer_text: "", is_correct: false, image: null, progress: 0, isLoading: false },
        { answer_text: "", is_correct: false, image: null, progress: 0, isLoading: false },
      ]);
    }
  } catch (error) {
    console.error("Network error:", error);
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
    <div style={{ background: 'var(--secondary)' }} className="container1 my-8 min-h-screen flex flex-col items-center justify-center space-y-8 p-4">
      {/* البطاقة الأولى: عنوان الاختبار */}
      <div className={`${styles.finalQuiz} bg-[#AABED11A] shadow-md mt-4 rounded-lg w-full max-w-md p-6 text-black dark:text-white `}>
        <label htmlFor="testTitle" className="block text-lg font-semibold mb-3">
          عنوان الاختبار
        </label>
        <hr className="border-gray-300" />
        <input
          id="testTitle"
          type="text"
          placeholder="الفصل الأول"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-full mt-2 text-lg bg-transparent outline-none border-none dark:placeholder:text-gray-400 placeholder:text-black text-black dark:text-white mb-2"
        />
        <hr className="border-gray-300" />
        <input
          type="text"
          required
          placeholder="وصف الاختبار"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-full text-lg bg-transparent outline-none border-none dark:placeholder:text-gray-400 placeholder:text-black text-black dark:text-white my-2"
        />
        <hr className="border-gray-300" />
        <div className="w-full my-4">
          <select
            className="outline-none bg-gray-200 dark:bg-gray-500 dark:text-white w-full text-base border-b-2 border-gray-200 dark:border-categoryColor p-2 rounded-md cursor-pointer text-black"
            value={lessonId}
            onChange={(e) => setLessonId(e.target.value)}
          >
            <option className="bg-white text-black" value="">اختر المحاضره</option>
            {lessons.map((lesson) => (
              <option key={lesson.id} value={lesson.id} className="text-base border-0 outline-none capitalize bg-white text-black">
                {lesson.title} : {lesson.id}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between items-center">
        <button onClick={handleCreateQuiz} className="flex cursor-pointer items-center w-full mt-3">
            <img src={add} alt="add_img"/>
          </button>
          <div className="mt-4 flex justify-end space-x-4 rtl:space-x-reverse">
            <button className="text-blue-500 hover:text-blue-700">
              <img src={delet} onClick={handleDeleteQuiz} alt="delet" />
            </button>
          </div>
        </div>

      </div>

      {/* البطاقة الثانية: عنوان السؤال */}
      <div className={`${styles.finalQuizBottom} bg-[#AABED11A] shadow-md rounded-lg w-full max-w-md p-6 mb-10 `}>
        <input htmlFor="questionTitle"
          placeholder="عنوان السؤال"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="w-full h-full mb-2 text-lg bg-transparent outline-none border-none dark:placeholder:text-gray-400 placeholder:text-black text-black dark:text-white"
        />
        {!imageAsset ? (
        <label className="w-full h-3/4 flex flex-col items-center justify-center cursor-pointer mb-2">
          <div className="w-full h-3/4 flex flex-col items-center justify-center gap-2">
            <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
            <p className="text-gray-500 hover:text-gray-700 dark:hover:text-white">
              ارفع صوره السؤال
            </p>
          </div>
          <input
            type="file"
            name="uploadimage"
            accept="image/*"
            className="w-0 h-0"
            onChange={handleImageChange}
          />
        </label>
         ) : (
          <div className="relative h-full">
            <p className="flex items-center mt-24 md:mt-36 text-2xl text-[#f26a40]">Selected Image: {imageAsset.name}</p>
          </div>
        )}
        <hr className="border-gray-300" />
        <div className="flex justify-between items-center">
        <button onClick={handleSubmitQuestion} className="flex cursor-pointer items-center w-full mt-3">
            <img src={add} alt="add_img"/>
          </button>
          <div className="mt-4 flex justify-end space-x-4 rtl:space-x-reverse">
            <button className="text-blue-500 hover:text-blue-700">
              <img src={delet} onClick={handleDeleteQuestion} alt="delet" />
            </button>
          </div>
        </div>
         
        {answers.map((answer, index) => (
          <div className="space-y-2">
          <div className="flex items-center justify-between space-x-2 rtl:space-x-reverse mt-2">
            <input
              type="radio"
              name="answer"
                checked={answer.is_correct}
                onChange={() =>
                  handleInputChange(index, "is_correct", true)
                }
              className="text-blue-500 focus:ring-blue-500 ml-1"
            />
            <input htmlFor="questionTitle"
              placeholder={`ادخل الاجابه ${index + 1} `}
              value={answer.answer_text}
                onChange={(e) =>
                  handleInputChange(index, "answer_text", e.target.value)
                }
              className="w-full h-full text-lg bg-transparent outline-none border-none dark:placeholder:text-gray-400 placeholder:text-black text-black dark:text-white"
            />
            <button onClick={() => handleClearAnswer(index)} className="text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
           
        </div>
        ))}
        <hr className="border-gray-300" />
        <div className="flex justify-between items-center">
        <button onClick={handleSubmit} className="flex cursor-pointer items-center w-full mt-3">
            <img src={add} alt="add_img"/>
          </button>
          <div className="mt-4 flex justify-end space-x-4 rtl:space-x-reverse">
            <button className="pl-3">
              <img src={updateQuiz} alt="updateQuiz" />
            </button>
            <button className="text-blue-500 hover:text-blue-700">
              <img src={delet} onClick={handleDeleteAnswer} alt="delet" />
            </button>
          </div>
        </div>
      </div>

    </div>

  );
};


export default FinalQuiz