import React, { useState } from 'react';

const UpdateTestApp = () => {
    const [answers, setAnswers] = useState([
        { answer_text: '', is_correct: false },
        { answer_text: '', is_correct: false },
        { answer_text: '', is_correct: false },
        { answer_text: '', is_correct: false },
    ]);

    const handleInputChange = (index, field, value) => {
        const updatedAnswers = [...answers];
        if (field === 'is_correct') {
            updatedAnswers.forEach((answer, i) => {
                answer.is_correct = i === index;
            });
        } else {
            updatedAnswers[index][field] = value;
        }
        setAnswers(updatedAnswers);
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem('accessToken');
        const questionId = localStorage.getItem('question_id');

        if (!token || !questionId) {
            console.error('Missing access token or question ID.');
            return;
        }

        // Prepare FormData for each answer and send requests one by one
        try {
            for (let i = 0; i < answers.length; i++) {
                const answerToUpdate = answers[i];
                const formData = new FormData();
                formData.append('answer_text', answerToUpdate.answer_text);
                formData.append('question_id', questionId);
                formData.append('is_correct', answerToUpdate.is_correct);

                const response = await fetch(`https://omarroshdy.com/api/v1/updateans/${i}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (response.ok) {
                    console.log(`Answer ${i + 1} updated successfully.`);
                } else {
                    const errorText = await response.text();
                    console.error(`Error updating answer ${i + 1}:`, errorText);
                }
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <div className="container">
            <form>
                <div className="w-full my-8 flex items-center justify-center">
                    <div className="w-[100%] bg-uploadColor dark:bg-categoryColor md:w-[100%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
                        {answers.map((answer, index) => (
                            <div
                                key={index}
                                className="w-full py-2 border-b border-gray-300 flex items-center gap-2"
                            >
                                <input
                                    type="radio"
                                    name="answer"
                                    checked={answer.is_correct}
                                    onChange={() =>
                                        handleInputChange(index, 'is_correct', true)
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder={`ادخل الاجابه ${index + 1} ...`}
                                    className="w-full h-full text-lg bg-transparent outline-none border-none dark:placeholder:text-gray-400 placeholder:text-black text-black dark:text-white"
                                    value={answer.answer_text}
                                    onChange={(e) =>
                                        handleInputChange(index, 'answer_text', e.target.value)
                                    }
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleUpdate}
                            className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg"
                        >
                            تحديث جميع الإجابات
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateTestApp;
