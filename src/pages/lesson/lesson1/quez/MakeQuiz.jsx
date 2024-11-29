import React, { useState, useEffect } from "react";
import { LuSubtitles } from "react-icons/lu";
import { MdDescription } from "react-icons/md";
import toast from 'react-hot-toast';

const MakeQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lessonId, setLessonId] = useState("");
  const [lessonIdFromPost, setLessonIdFromPost] = useState("");
  const [lessons, setLessons] = useState([]);
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

  return (
    <form onSubmit={handleCreateQuiz}>
      <div className="w-full my-8 flex items-center justify-center">
        <div className="w-[100%] bg-uploadColor dark:bg-categoryColor md:w-[100%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
          {/* Title input */}
          <div className="w-full py-4 border-b border-gray-300 flex items-center gap-2">
            <LuSubtitles className="text-xl text-gray-700" />
            <input
              type="text"
              required
              placeholder="عنوان الكويز..."
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
              placeholder="وصف الكويز...."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-full text-lg bg-transparent outline-none border-none dark:placeholder:text-gray-400 placeholder:text-black text-black dark:text-white"
            />
          </div>

          {/* Lesson ID input */}
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

          {/* Submit button */}
          <div className="flex items-center w-full">
            <button
              type="submit"
              className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-numberNotfound px-12 py-2 rounded-lg text-lg text-white font-semibold text-center"
            >
              انشاء
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MakeQuiz;
