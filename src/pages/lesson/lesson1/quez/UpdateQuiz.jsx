import React, { useState, useEffect } from "react";
import { LuSubtitles } from "react-icons/lu";
import { MdDescription } from "react-icons/md";
import toast from 'react-hot-toast';

const UpdateQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quizId, setQuizId] = useState("");

  // جلب الـ id من localStorage
  useEffect(() => {
    const storedQuizId = localStorage.getItem("quiz_id");
    if (storedQuizId) {
      setQuizId(storedQuizId);  // تعيين الـ id المخزن في الحالة
    }
  }, []);

  // Function to handle form submission
  const handleUpdateQuiz = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      toast.error("الرجاء تسجيل الدخول أولا");
      return;
    }

    const requestBody = {
      title,
      description,
    };

    try {
      // استخدام الـ quizId الذي جلبناه من localStorage
      const response = await fetch(`https://omarroshdy.com/api/v1/quiz/${quizId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      const text = await response.text();  // عرض الاستجابة بالكامل
      console.log("Response Text:", text);

      if (!response.ok) {
        toast.error("حدث خطأ أثناء إرسال الطلب حاول مره اخرى  ");
        return;
      }

      // إذا كانت الاستجابة على شكل JSON
      try {
        const data = JSON.parse(text);
        toast.success("تم تعديل الكويز بنجاح");

        // تفريغ الحقول بعد نجاح العملية
        setTitle("");
        setDescription("");
      } catch (error) {
        console.error("Response is not valid JSON:", error);
        toast.error("حدث خطأ أثناء إرسال الطلب");
      }
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("حدث خطأ أثناء إرسال الطلب");
    }
  };

  return (
    <form onSubmit={handleUpdateQuiz}>
      <div className="w-full my-16 flex items-center justify-center">
        <div className="w-[100%] bg-uploadColor dark:bg-categoryColor border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
          {/* Title input */}
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <LuSubtitles className="text-xl text-gray-700" />
            <input
              type="text"
              required
              placeholder="title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-full text-lg bg-transparent outline-none border-none dark:placeholder:text-gray-400 placeholder:text-black text-black dark:text-white"
            />
          </div>

          {/* Description input */}
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdDescription className="text-xl text-gray-700" />
            <input
              type="text"
              required
              placeholder="Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-full text-lg bg-transparent outline-none border-none dark:placeholder:text-gray-400 placeholder:text-black text-black dark:text-white"
            />
          </div>

          {/* Submit button */}
          <div className="flex items-center w-full">
            <button
              type="submit"
              className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-numberNotfound px-12 py-2 rounded-lg text-lg text-white font-semibold text-center"
            >
              تعديل الكويز
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UpdateQuiz;
