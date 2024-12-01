import React, { useEffect } from 'react';
import EducationalStages from './educational stages/EducationalStages';
import PlatformContent from './mansa content/PlatformContent';
import Hero from './hero/Hero';
import toast from 'react-hot-toast';

const Home = () => {

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('https://omarroshdy.com/api/v1/allstudents', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`  
          }
        });
        const data = await response.json();

        // حساب عدد الطلاب وتخزين حالات is_active
        const activeStudents = data.filter(student => student.is_active === 1);
        const activeCount = activeStudents.length;
        const isActiveArray = activeStudents.map(student => student.is_active);

        // تخزين البيانات في localStorage
        localStorage.setItem('activeStudentsCount', activeCount);
        localStorage.setItem('isActiveArray', JSON.stringify(isActiveArray));

        console.success('تم جلب البيانات بنجاح');
      } catch (error) {
        console.error('Error fetching students:', error);
        console.error('حدث خطأ أثناء جلب البيانات');
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://omarroshdy.com/api/v1/admlessons', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        const data = await response.json();
        // تخزين عدد الدروس في localStorage
        const lessonsCount = data.length;
        localStorage.setItem('lessonsCount', lessonsCount);
        console.success('تم جلب الدروس بنجاح');
      } catch (error) {
        console.error('Error fetching lessons:', error);
        console.error('حدث خطأ أثناء جلب الدروس');
      }
    };
    fetchLessons();
  }, []);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
          toast.error('يرجى تسجيل الدخول.');
          return;
        }

        const response = await fetch('https://omarroshdy.com/api/v1/quiz', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        const data = await response.json();
        // تخزين عدد الكويزات في localStorage
        const quizCount = data.length;
        localStorage.setItem('quizCount', quizCount);

        console.success('تم جلب الكويزات بنجاح');
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        console.error('حدث خطأ أثناء جلب الكويزات');
      }
    };

    fetchQuizzes();
  }, []);
  return (
    <>
      <Hero />
      <PlatformContent />
      <div className='container1'>
        <EducationalStages />  
      </div>
    </>
  );
};

export default Home;
