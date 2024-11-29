import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";

const Test2 = () => {
  const [answers, setAnswers] = useState([
    { answer_text: "", is_correct: false, image: null, progress: 0, isLoading: false },
    { answer_text: "", is_correct: false, image: null, progress: 0, isLoading: false },
    { answer_text: "", is_correct: false, image: null, progress: 0, isLoading: false },
    { answer_text: "", is_correct: false, image: null, progress: 0, isLoading: false },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedAnswers = [...answers];
    if (field === "is_correct") {
      // تأكد أن الإجابة الصحيحة واحدة فقط
      updatedAnswers.forEach((answer, i) => {
        answer.is_correct = i === index;
      });
    } else {
      updatedAnswers[index][field] = value;
    }
    setAnswers(updatedAnswers);
  };

  const handleFileChange = (index, file) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].image = file;
    setAnswers(updatedAnswers);
  };

  const handleFileUpload = (index, file) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].isLoading = true;
    setAnswers(updatedAnswers);

    const token = localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("image", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://omarroshdy.com/api/v1/upload");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        updatedAnswers[index].progress = Math.round(progress);
        setAnswers([...updatedAnswers]);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        updatedAnswers[index].isLoading = false;
        setAnswers([...updatedAnswers]);
      } else {
        updatedAnswers[index].isLoading = false;
        updatedAnswers[index].progress = 0;
        setAnswers([...updatedAnswers]);
        console.error("Error uploading file.");
      }
    };

    xhr.onerror = () => {
      updatedAnswers[index].isLoading = false;
      updatedAnswers[index].progress = 0;
      setAnswers([...updatedAnswers]);
      console.error("Network error while uploading file.");
    };

    xhr.send(formData);
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-1/2 md:my-16 my-8 flex items-center justify-center">
        <div className="w-[50%] bg-uploadColor dark:bg-categoryColor md:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
          {answers.map((answer, index) => (
            <div key={index} className="w-full py-2 border-b border-gray-300">
              <input
                type="radio"
                name="answer"
                checked={answer.is_correct}
                onChange={() =>
                  handleInputChange(index, "is_correct", true)
                }
              />
              <input
                type="text"
                placeholder={`answer_text${index + 1}...`}
                className="w-full h-full text-lg bg-transparent outline-none border-none dark:placeholder:text-gray-400 placeholder:text-black text-black dark:text-white"
                value={answer.answer_text}
                onChange={(e) =>
                  handleInputChange(index, "answer_text", e.target.value)
                }
              />
              <label className="w-full flex items-center justify-center mt-4">
                {answer.isLoading ? (
                  <div className="w-full">
                    <div className="w-full bg-gray-300 h-2">
                      <div
                        className="bg-blue-600 h-2"
                        style={{ width: `${answer.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-center mt-2">{answer.progress}%</p>
                  </div>
                ) : (
                  <>
                    {!answer.image ? (
                      <div className="flex flex-col items-center cursor-pointer">
                        <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                        <p className="text-gray-500 hover:text-gray-700 dark:hover:text-white">
                          Click here to upload image
                        </p>
                        <input
                          type="file"
                          name={`uploadimage${index}`}
                          accept="image/*"
                          className="w-0 h-0"
                          onChange={(e) => {
                            handleFileChange(index, e.target.files[0]);
                            handleFileUpload(index, e.target.files[0]);
                          }}
                        />
                      </div>
                    ) : (
                      <p className="mt-2">Selected: {answer.image.name}</p>
                    )}
                  </>
                )}
              </label>
            </div>
          ))}
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

export default Test2;
