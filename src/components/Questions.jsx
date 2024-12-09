import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Questionss = () => {
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState([{ text: "", isCorrect: false, image: null }]);
  const quizId = localStorage.getItem("quizId");
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  if (!quizId || !accessToken) {
    toast.error("لم يتم العثور على معرف الكويز أو التوكن");
    navigate("/all_Quiz");
    return null;
  }

  const handleAddAnswer = () => {
    setAnswers([...answers, { text: "", isCorrect: false, image: null }]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSaveQuestion = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("question_text", questionText);
      formData.append("quiz_id", quizId);
      if (image) {
        formData.append("image", image);
      }

      const response = await fetch("https://omarroshdy.com/api/v1/question", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,

        },
        body: formData,
      });

      const questionData = await response.json();
      if (response.ok) {
        await Promise.all(
          answers.map((answer) => {
            const answerFormData = new FormData();
            answerFormData.append("answer_text", answer.text);
            answerFormData.append("question_id", questionData.id);
            answerFormData.append("is_correct", answer.isCorrect ? 1 : 0);

            if (answer.image) {
              answerFormData.append("image", answer.image);
            }

            return fetch("https://omarroshdy.com/api/v1/ans", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              body: answerFormData,
            });
          })
        );

        toast.success("تم حفظ السؤال والإجابات!");
        setQuestionText("");

        setAnswers([{ text: "", isCorrect: false, image: null }]);
      } else {
        toast.error("فشل حفظ السؤال");
      }
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ في الاتصال");
    }
    finally{
      setIsLoading(true);
    }
  };

  const handleFinish = () => {
  
    localStorage.removeItem("quizId");
    navigate("/all_Quiz");
   
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-center">إضافة أسئلة</h1>

      <div className="flex gap-3 w-full justify-center items-center">
       <div className="w-full">
         <label>نص السؤال</label>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="أدخل نص السؤال"
          className="w-full p-3 rounded-lg text-black border"
        />
        </div>
      <div className="relative w-[5%]">
      <label
    htmlFor={`file-upload`}
    className=" w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none flex items-center justify-center gap-2 p-2"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-gray-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m6.75 0V5.25m0 0H9.75m6 0h1.5M4.5 15.75a3 3 0 00-3-3H3m18 3a3 3 0 003-3h-1.5M5.25 12v9.75A2.25 2.25 0 007.5 24h9a2.25 2.25 0 002.25-2.25V12m-13.5 0h13.5"
      />
    </svg>
   
  </label>
  <input
    id="file-upload"
    type="file"
    onChange={handleImageChange}
    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
  />
</div>

      </div>

      <div>
        <h2 className="text-lg font-medium">الإجابات</h2>
        {answers.map((answer, index) => (
          <div key={index} className="flex items-center text-black space-x-2">
            <input
              type="text"
              value={answer.text}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[index].text = e.target.value;
                setAnswers(newAnswers);
              }}
              placeholder="أدخل نص الإجابة"
              className="w-full p-2 rounded-lg text-black border"
            />
            <input
              type="checkbox"
              checked={answer.isCorrect}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[index].isCorrect = e.target.checked;
                setAnswers(newAnswers);
              }}
              className="h-5 w-5"
            />
<div className="relative mt-6 ">
  <label
    htmlFor={`file-upload-${index}`}
    className=" w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none flex items-center justify-center gap-2 p-2"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-gray-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m6.75 0V5.25m0 0H9.75m6 0h1.5M4.5 15.75a3 3 0 00-3-3H3m18 3a3 3 0 003-3h-1.5M5.25 12v9.75A2.25 2.25 0 007.5 24h9a2.25 2.25 0 002.25-2.25V12m-13.5 0h13.5"
      />
    </svg>
   
  </label>
  <input
    id={`file-upload-${index}`}
    type="file"
    onChange={(e) => {
      const file = e.target.files[0];
      const newAnswers = [...answers];
      newAnswers[index].image = file;
      setAnswers(newAnswers);
    }}
    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
  />
</div>


          </div>
        ))}
        <button
          onClick={handleAddAnswer}
          className="py-2 px-4 bg-blue-600 mt-6 text-white rounded-lg"
        >
          إضافة إجابة
        </button>
      </div>

      <div className="flex justify-between">
        <button
  onClick={handleSaveQuestion}
  className="py-2 px-6 bg-green-600 text-white rounded-lg"
  disabled={isLoading}
>
  {isLoading ? "جارٍ الحفظ..." : "حفظ السؤال"}
</button>

        <button
          onClick={handleFinish}
          className="py-2 px-6 bg-red-600 text-white rounded-lg"
        >
          إنهاء الكويز
        </button>
      </div>
    </div>
  );
};

export default Questionss;
