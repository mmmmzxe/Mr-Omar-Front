import React, { useState } from "react";
import { LuSubtitles } from "react-icons/lu";
import { MdCloudUpload } from "react-icons/md";
import toast from 'react-hot-toast';
import Loader from "../../../upload/Loader";

const Question = () => {
  const [questionText, setQuestionText] = useState("");
  const [imageAsset, setImageAsset] = useState(null); // حفظ الصورة
  const [isLoading, setIsLoading] = useState(false); // حالة التحميل
  const [progress, setProgress] = useState(0); // التقدم في رفع الصورة
  const quizId = localStorage.getItem("quiz_id");
  const accessToken = localStorage.getItem("accessToken");

  // دالة لإرسال السؤال
 
  


  // دالة لاختيار صورة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageAsset(file); // تعيين الصورة إلى الـ state
    }
  };
  const handleSubmit = async (e) => {
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
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full my-8 flex items-center justify-center">
        <div className="w-[100%] bg-uploadColor dark:bg-categoryColor md:w-[100%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
          {/* Title input */}
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <LuSubtitles className="text-xl text-gray-700" />
            <input
              type="text"
              required
              placeholder="Enter your question..."
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full h-full text-lg bg-transparent outline-none border-none dark:placeholder:text-gray-400 placeholder:text-black text-black dark:text-white"
            />
          </div>

          {/* Image input */}
          <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-240 cursor-pointer rounded-lg">
            {isLoading ? (
              <div className="w-full flex flex-col items-center justify-center">
                <Loader />
                <div className="w-full bg-gray-300 h-2 mt-4">
                  <div className="bg-blue-600 h-2" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-center mt-2">{Math.round(progress)}%</p>
              </div>
            ) : (
              <>
                {!imageAsset ? (
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700 dark:hover:text-white">
                        Click here to upload image
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
              </>
            )}
          </div>

          {/* Submit button */}
          <div className="flex items-center w-full">
            <button
              type="submit"
              className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-numberNotfound px-6 py-2 rounded-lg text-lg text-white font-semibold text-center"
            >
              Create Question
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Question;
