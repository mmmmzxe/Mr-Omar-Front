import img1 from "../overview.svg";
import img2 from "../students.svg";
import img3 from "../lectures.svg";
import img4 from "../financial.svg";

import img6 from "../SVGRepo_iconCarrier.png";
import img7 from "../Training.png";
import img8 from '../return.png';
const nav_link = [
    {
      path: '/dashboard',
      display: 'نظره عامه',
      img: img1,
    },
    {
      path: '/dashboard/all_Student',
      display: 'بيانات الطلاب',
      img: img2,
    },
    {
      path: '/dashboard/all_lecture',
      display: 'جميع المحاضرات',
      img: img3,
    },
    {
      path: '/dashboard/upload',
      display: 'رفع المحاضرات',
      img: img3,
    },
    {
      path: '/dashboard/quiz',
      display: 'انشاء كويز',
      img: img7,
    },
    {
      path: '/dashboard/all_Quiz',
      display: 'الاختبارات',
      img: img7,
    },
    {
      path: '/dashboard/result',
      display: 'نتائج الاختبارات',
      img: img6,
    },
    {
      path: '/dashboard/finacial',
      display: 'التقارير الماليه',
      img: img4,
    },
    {
      path: '/',
      display: 'ارجع الى المنصه',
      img: img8,
    },
     
  ];
  export default nav_link;
  