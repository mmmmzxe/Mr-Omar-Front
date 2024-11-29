import React, { useState } from 'react';

const TestApp = () => {
    const [answers, setAnswers] = useState([
        { answer_text: '', is_correct: false },
        { answer_text: '', is_correct: false },
        { answer_text: '', is_correct: false },
        { answer_text: '', is_correct: false },
    ]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('accessToken');
        const questionId = localStorage.getItem('question_id');

        if (!token || !questionId) {
            console.error('Missing access token or question ID.');
            return;
        }

        const formattedAnswers = answers.map((answer) => ({
            ...answer,
            question_id: questionId, // إضافة الـ question_id لكل إجابة
        }));

        try {
            const responses = await Promise.all(
                formattedAnswers.map((answer) =>
                    fetch('https://omarroshdy.com/api/v1/ans', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify(answer),
                    })
                )
            );

            let allSuccessful = true;

            for (const response of responses) {
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Error Response:', errorText);
                    allSuccessful = false;
                    break;
                }
            }

            if (allSuccessful) {
                console.log('All answers submitted successfully.');
                // إعادة تعيين النموذج إلى القيم الافتراضية
                setAnswers([
                    { answer_text: '', is_correct: false },
                    { answer_text: '', is_correct: false },
                    { answer_text: '', is_correct: false },
                    { answer_text: '', is_correct: false },
                ]);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
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
        </div>
    );
};

export default TestApp;
