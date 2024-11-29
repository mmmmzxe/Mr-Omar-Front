import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from '../lesson1/lesson.module.css'
//import { Link, useNavigate, useLocation } from 'react-router-dom';
const VideoPage3 = () => {
  const location = useLocation();
  const { videoUrl, embeded } = location.state || {};
  const [quizTitle, setQuizTitle] = useState(""); 
  const [error, setError] = useState(""); 
  const accessToken = localStorage.getItem("accessToken");
  const lessonId = localStorage.getItem("lessonId");
  const navigate = useNavigate(); 
  useEffect(() => {
      if (!lessonId) {
          setError("لا يوجد lessonId في localStorage.");
          return;
      }

      const fetchQuizData = async () => {
          try {
              const response = await fetch(`https://omarroshdy.com/api/v1/quizle/${lessonId}`, {
                  method: "GET",
                  headers: {
                      "Authorization": `Bearer ${accessToken}`, 
                      "Content-Type": "application/json"
                  }
              });

              const data = await response.json();
              if (data && data.id) {
                  setQuizTitle(data.title); 
                  localStorage.setItem("quizId", data.id);
              } else {
                  throw new Error("لا يوجد اختبارات حتى الان.");
              }
          } catch (error) {
              setError(error.message);
          }
      };

      fetchQuizData();
  }, [lessonId, accessToken]);
  const handleStartQuiz = () => {
    if (!localStorage.getItem("quizId")) {
      setError("لا يوجد اختبار للبدء فيه.");
    } else {
      navigate("/readyQuez");  // إعادة التوجيه إلى صفحة الاختبار
    }
  };
  useEffect(() => {
    if (!videoUrl && !embeded) {
      setError('لا يوجد فيديو لعرضه.');
    }
  }, [videoUrl, embeded]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="md:py-12 py-2">
      <h2 className={`${styles.main_title} uppercase dark:text-white text-black mx-auto my-8 border-2 border-black dark:border-white px-5 py-2.5 md:text-2xl text-xl w-fit relative z-10 transition duration-300`}>
        . شاهد الان
      </h2>
      <div className="container1">

        {embeded ? (
          <div className="" dangerouslySetInnerHTML={{ __html: embeded }} />
        ) : videoUrl ? (

          <div>
            <div>
              <div >
                <iframe
                  className={`${styles.howToUse} md:w-[600px] md:h-[350px]`}
                  src={videoUrl}
                  width="100%"
                  height="500"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="lesson-video"
                />
              </div>
            </div>
          </div>

        ) : (
          <div>لا يوجد فيديو لعرضه.</div>
        )}
        <div className={styles.quez}>
            <ul className='flex'>
                <li className='pointer-events-none list-none m-6 relative'><Link className={`${styles.active} no-underline text-[16px] font-semibold transition duration-300 text-[#1a1a1a] dark:text-white`} >الشرح</Link></li>
                <li className='list-none my-6  relative'><Link className='no-underline text-[16px] font-semibold transition duration-300 text-[#1a1a1a] dark:text-white' to="/readyQuez" onClick={handleStartQuiz}>الاختبار</Link></li>
            </ul>
        </div>
      </div>
      
    </div>
  );
};

export default VideoPage3;
