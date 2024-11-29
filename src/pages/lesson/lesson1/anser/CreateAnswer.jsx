import React, { useState } from "react";
import { LuSubtitles } from "react-icons/lu";
import { MdCloudUpload } from "react-icons/md";
import Loader from "../../../upload/Loader";
import toast from 'react-hot-toast';

const CreateAnswer = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);
  const [answerText, setAnswerText] = useState("");   
  const [isCorrect, setIsCorrect] = useState("");  

  const questionId = localStorage.getItem("question_id");   

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!answerText && !imageAsset) {
      toast.error("Please provide either an answer or an image.");
      return;
    }
  
    setIsLoading(true);
  
    const formData = new FormData();
    formData.append("question_id", questionId);
    formData.append("is_correct", isCorrect);
    
    if (answerText) {
      formData.append("answer_text", answerText);
    }
  
    if (imageAsset) {
      formData.append("image", imageAsset);
    }
  
    try {
      const token = localStorage.getItem("accessToken");
  
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://omarroshdy.com/api/v1/ans");
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          console.log("Progress: ", progress);
          setProgress(Math.round(progress));
        }
      };
  
      xhr.onload = () => {
        if (xhr.status === 201) {
          const data = JSON.parse(xhr.responseText);
          localStorage.setItem("answer_id", data.id);
          setAnswerText("");     
          setImageAsset(null);   
          setIsCorrect(""); 
          setProgress(0);        
          toast.success("Answer created successfully!");
          setIsLoading(false);  
        } else {
          toast.error("Error: Something went wrong.");
          setIsLoading(false);
        }
      };
  
      xhr.onerror = () => {
        toast.error("Error submitting data.");
        setIsLoading(false);
      };
  
      xhr.send(formData);
  
    } catch (error) {
      toast.error("Error submitting data.");
      setIsLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full my-8 flex items-center justify-center">
        <div className="w-[100%] bg-uploadColor dark:bg-categoryColor md:w-[100%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <LuSubtitles className="text-xl text-gray-700" />
            <input
              type="text"
              placeholder="answer_text..."
              className="w-full h-full text-lg bg-transparent outline-none border-none dark:placeholder:text-gray-400 placeholder:text-black text-black dark:text-white"
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}  
            />
          </div>
          <div className="w-full">
            <select
              className="outline-none bg-gray-200 dark:bg-gray-500 dark:text-white w-full text-base border-b-2 border-gray-200 dark:border-categoryColor p-2 rounded-md cursor-pointer text-black"
              value={isCorrect}
              onChange={(e) => setIsCorrect(e.target.value)} 
            >
              <option className="bg-white text-black" value="">Select Correct Answer</option>
              <option className="text-base border-0 outline-none capitalize bg-white text-black" value="1">Correct</option>
              <option className="text-base border-0 outline-none capitalize bg-white text-black" value="0">Incorrect</option>
            </select>
          </div>
          <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
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
                      onChange={(e) => setImageAsset(e.target.files[0])} 
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
          <div className="flex items-center w-full">
            <button
              type="submit"
              className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-numberNotfound px-12 py-2 rounded-lg text-lg text-white font-semibold"
            >
              انشاء الاجابه
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateAnswer;
