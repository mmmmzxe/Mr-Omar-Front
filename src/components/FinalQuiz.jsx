import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FinalQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lessonId, setLessonId] = useState("");
  const [lessons, setLessons] = useState([]);
  const [duration, setDuration] = useState("");
  const [optional, setOptional] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      if (!accessToken) {
        toast.error("الرجاء تسجيل الدخول أولا");
        return;
      }

      try {
        const response = await fetch("https://omarroshdy.com/api/v1/admlessons", {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
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
  }, [accessToken]);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !description || !lessonId || !duration) {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }
  
    try {
      const response = await fetch("https://omarroshdy.com/api/v1/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          title,
          description,
          lesson_id: lessonId,
          duration,
          optional: optional ? 1 : 0,
        }),
      });
  
      const responseText = await response.text();
      try {
        const data = JSON.parse(responseText);
        if (response.ok) {
          localStorage.setItem("quizId", data.id);
          toast.success("تم إنشاء الكويز بنجاح! يمكنك الآن إضافة الأسئلة.");
          navigate("/questions");
        } else {
          toast.error(data.message || "حدث خطأ أثناء إنشاء الكويز");
        }
      } catch (jsonError) {
        console.error("Invalid JSON response:", responseText);
        toast.error("الاستجابة من السيرفر غير صحيحة");
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
      toast.error("تاكد من اتصالك بالانترنت");
    }
  };
  
  

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 text-black dark:text-white">
      <h1 className="text-2xl font-semibold text-center">إنشاء أو تحديث الكويز</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 rounded-lg shadow-md  bg-gray-100 dark:bg-slate-900"
      >
        <div>
          <label className="block text-lg font-medium mb-2">اسم الكويز</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="أدخل اسم الكويز"
            className="w-full p-3 rounded-lg bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">وصف الكويز</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="أدخل وصف الكويز"
            className="w-full p-3 rounded-lg bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">اختر الدرس</label>
          <select
            value={lessonId}
            onChange={(e) => setLessonId(e.target.value)}
            className="w-full p-3 rounded-lg bg-black dark:text-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="" disabled>
              اختر درسًا
            </option>
            {lessons.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">المدة الزمنية (بالدقائق)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="أدخل المدة الزمنية"
            className="w-full p-3 rounded-lg bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label className="block text-lg font-medium">اختياري؟</label>
          <input
            type="checkbox"
            checked={optional}
            onChange={(e) => setOptional(e.target.checked)}
            className="h-6 w-6"
          />
        </div>

        <button
          type="submit"
          className="w-1/3 py-3 bg-orange-600 text-white flex justify-center items-center mx-auto text-center font-semibold rounded-lg hover:bg-blue-700"
        >
          إضافة الأسئلة
        </button>
      </form>
    </div>
  );
};

export default FinalQuiz;
