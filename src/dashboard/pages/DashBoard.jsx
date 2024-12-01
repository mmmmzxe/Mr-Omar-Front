import React, { useState, useEffect } from 'react';
import styles from '../dashboard.module.css'
import Row2 from '../drawdashboard/Row2'
import Row3 from '../drawdashboard/Row3';
import TopBar from '../component/TopBar';
import SideBar from '../component/SideBar';
import img1 from "../../assets/Frame 7.png"
import img2 from "../../assets/Frame 7 (1).png";
import img3 from "../../assets/Frame 7 (2).png";
import img4 from "../../assets/Frame 7 (3).png";
import img5 from "../../assets/Frame 7 (4).png";
 
const DashBoard = () => {
  const [activeCount, setActiveCount] = useState(0);
  const [lectureCount, setLectureCount] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  useEffect(() => {
    const count = localStorage.getItem('activeStudentsCount');
    const quiz = localStorage.getItem('quizCount');
    const lecture = localStorage.getItem('lessonsCount');
    if (count) {
      setActiveCount(Number(count));
    }
    if (quiz) {
      setQuizCount(Number(quiz));
    }
    if (lecture) {
      setLectureCount(Number(lecture));
    }
  }, []);
  
  return (
    <div>
      <div className={styles.header_Dashboard}><TopBar /></div>
      <div className='flex'>
        <SideBar />
        <div>
        <div className='my-8'>
      <div className={`${styles.overview_Dashboad} container ml-2.5 md:ml-0`}>
        {/* العنصر الأول */}
        <div className={`${styles.card} w-[320px] md:w-[205px] mr-7`}>
          <img src={img1} alt="عدد الطلاب النشيطين" width={40} height={40} className='m-auto' />
          <p className={styles.content}>عدد الطلاب النشيطين</p>
          <span className={`${styles.numbers} text-black dark:text-white text-center my-2`}>{activeCount}</span>
        </div>

        {/* العنصر الثاني */}
        <div className={`${styles.card} w-[320px] md:w-[205px] mr-7`}>
          <img src={img2} alt="عدد الطلاب المسجلين" width={40} height={40} className='m-auto' />
          <p className={styles.content}>عدد الطلاب المسجلين</p>
          <span className={`${styles.numbers} text-black dark:text-white text-center my-2`}>{activeCount}</span>
        </div>

        {/* العنصر الثالث */}
        <div className={`${styles.card} w-[320px] md:w-[205px] mr-7`}>
          <img src={img3} alt="عدد المحاضرات" width={40} height={40} className='m-auto' />
          <p className={styles.content}>عدد المحاضرات</p>
          <span className={`${styles.numbers} text-black dark:text-white text-center my-2`}>{lectureCount}</span>
        </div>

        {/* العنصر الرابع */}
        <div className={`${styles.card} w-[320px] md:w-[205px] mr-7`}>
          <img src={img4} alt="عدد الاختبارات" width={40} height={40} className='m-auto' />
          <p className={styles.content}>عدد الاختبارات</p>
          <span className={`${styles.numbers} text-black dark:text-white text-center my-2`}>{quizCount}</span>
        </div>

        {/* العنصر الخامس */}
        <div className={`${styles.card} w-[320px] md:w-[205px] mr-7`}>
          <img src={img5} alt="المبالغ المحصلة" width={40} height={40} className='m-auto' />
          <p className={styles.content}>المبالغ المحصلة</p>
          <span className={`${styles.numbers} text-black dark:text-white text-center my-2`}>15000</span>
        </div>
      </div>
    </div>
          <div className={`${styles.draw_Dashboard} container my-16 lg:pl-64 pl-0`}>
            <Row2 />
            <Row3 />

          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard