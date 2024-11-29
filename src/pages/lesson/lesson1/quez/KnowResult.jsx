import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../lesson1/lesson.module.css';
import toast from 'react-hot-toast';
import Loader from '../../../upload/Loader';

const KnowResult = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.name) {
      setUserName(user.name);
    } else {
      setError('هذا الاسم غير مسجل فى المنصه');
    }
    const fetchResult = async () => {
      const quizId = localStorage.getItem('quizId');
      const accessToken = localStorage.getItem('accessToken');
      const questionsLength = localStorage.getItem('questionsLength');

      if (!quizId || !accessToken || !questionsLength) {
        setError('تاكد من اتصالك بالانترنت!');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://omarroshdy.com/api/v1/result?quiz_id=${quizId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          if (Array.isArray(data) && data.length > 0) {
            const latestResult = data[data.length - 1];
            setResult(latestResult);
            const score = latestResult.score;
            const halfLength = Math.ceil(questionsLength / 2);

            if (score >= halfLength) {
              toast.success("لقد نجحت فى الاختبار يمكنك مشاهده المحاضره التاليه شكرا لك");
              // تأخير لمدة 10 ثوانٍ قبل التوجيه
              setTimeout(() => {
                navigate(-5); // توجيه إلى الصفحة المحاضرات
              }, 10000);
            } else {
              toast.error(" سيتم تحويلك الى المحاضره مباشره راجع مره اخرى ثم ادخل الاختبار");
              setTimeout(() => {
                navigate(-4); // توجيه إلى الصفحة محاضره اللى عليها الكويز
              }, 5000);

            }
          } else {
            setError('لا يوجد درجات ');
          }
        } else {
          setError('تاكد من اتصالك بالانترنت');
        }
      } catch (error) {
        setError('تاكد من اتصالك بالانترنت');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [navigate]);


  if (loading) {
    return <div className='text-center mb-4'><Loader /><h2>جارى تحميل درجتك</h2></div>;
  }

  if (error) {
    return <div>خطأ: {error}</div>;
  }

  return (
    <div className={`${styles.knowResult} container1`}>
      <h1 className="relative">نتيجه الاختبار النهائيه</h1>
      <div className="bg-[#AABED11A] p-6 rounded-md relative">
        <span className="absolute right-2.5 top-2.5 text-sm text-black dark:text-gray-200">
          {result?.created_at ? formatDate(result.created_at) : <Loader />}
        </span>
        {/* عرض اسم المستخدم هنا */}
        <h4 className="m-0 font-normal text-numberNotfound text-xl">
          Welcome : {userName}
        </h4>
        <p className="dark:text-gray-200 text-black mt-5 mb-4 text-base">
          We hope that you passed this test
        </p>
        <div className="mt-3 pt-4 text-center text-sm text-black dark:text-gray-200 flex items-center justify-center border-t border-[#eeeeee]">
          <h2 className="mr-1 text-2xl">Score</h2>:
          <p className="ml-1 text-2xl text-numberNotfound">
            {result?.score || <Loader />}
          </p>
        </div>
      </div>
    </div>
  );
};

export default KnowResult;
