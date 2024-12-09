import React, { useEffect, useState } from 'react';
import styles from '../lesson1/lesson.module.css';
import clock from '../../../assets/clock.svg';
import lec1 from '../../../assets/IMG-20241109-WA0040.jpg';
import { useNavigate } from 'react-router-dom';
import CommonSection from './CommonSection';
import toast from 'react-hot-toast';
import Loader from '../../upload/Loader';

const Lesson3 = () => {
  const [lessonData, setLessonData] = useState([]);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

   // حالة لتحديد إذا كان المستخدم مسجل دخول أم لا
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      // إذا لم يكن هناك accessToken، اعرض رسالة خطأ
      toast.error("قم بتسجيل حساب لتتمكن من مشاهده المحاضرات");
      navigate('/login');
      setIsLoggedIn(false);
      return;
    }
    const fetchLessonData = async () => {
      try {
        const response = await fetch('https://omarroshdy.com/api/v1/hislesson2', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch lesson data');
        }
        const data = await response.json();
        setLessonData(data);
      } catch (error) {
        console.error('Error fetching lesson data:', error);
        toast.error('هناك مشكلة في تحميل البيانات');
      } finally {
        setLoading(false);
      }
    };
    

    fetchLessonData();
  }, []);

  const handleStartWatching = (lessonId) => {
    const lesson = lessonData.find(item => item.id === lessonId);
    if (lesson) {
      const enteranceStatus = lesson.enteranceStatus;
      
      if (enteranceStatus && enteranceStatus.success === true) {
        localStorage.setItem('lessonId', lessonId);
        localStorage.setItem('duration', lesson.duration);  // Save duration as well
        
        navigate(`/lesson-video/${lessonId}`, { 
          state: { 
            videoUrl: lesson.video_url, 
            embeded: lesson.embeded,
            duration: lesson.duration // Pass duration to the video page
          } 
        });
      } else {
        toast.error("لم تتمكن من مشاهده المحاضره الا بعد اداء امتحان المحاضره السابق");
        navigate('');
      }
    }
  };

  return (
    <>
      <CommonSection title=".مرحبا بكم طلاب الصف الثالث الثانوى فى منصه مستر عمر" />
      <div className={`${styles.lesson} container1 `}>
        {loading ? (
           <div className="flex w-full justify-center items-center h-screen">
           <Loader />
         </div>
        ) : lessonData.length > 0 ? (
          lessonData.map((lesson, index) => (
            <div key={index} className={`${styles.lesson_box} bg-white rounded-md my-4 md:my-16`}>
              <img className='w-full max-w-full' src={lesson.poster} alt="lesson-img" />
              <div className="p-5">
                <div className="flex gap-2">
                  <h3 className="m-0 text-black text-lg md:text-lg">{lesson.duration || '50 minutes'}</h3>
                  <img src={clock} alt="duration" />
                </div>
                <div className={styles.lesson_details}>
                  <h3 className="m-0 text-black text-xl md:text-3xl">{lesson.title}</h3>
                  <p className="leading-6 text-[rgba(92,93,95,1)] mt-2 text-base md:text-xl">{lesson.description}</p>
                </div>
                <div className="text-center border border-[#f26a40] md:p-2 p-1 my-6 bg-[#f26a40] rounded-lg">
                  <button
                    className="text-white no-underline"
                    onClick={() => handleStartWatching(lesson.id)}
                  >
                    ابدأ المشاهدة
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center text-xl py-4'>لا يوجد محاضرات حتى الان</p>
        )}
      </div>
    </>
  );
};

export default Lesson3;
