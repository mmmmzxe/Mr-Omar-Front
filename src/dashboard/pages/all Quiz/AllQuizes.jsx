import React, { useState, useEffect } from 'react';
import '../result/result.css';
import styles from '../quiz/quiz.module.css';
import style from '../../dashboard.module.css';
import delet from '../../../assets/delet.svg'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import SideBar from '../../component/SideBar';
import HeaderSearch from '../../component/HeaderSearch';

const AllQuizes = () => {
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    fetch('https://omarroshdy.com/api/v1/quiz', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setQuizes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className={style.header_Dashboard}><HeaderSearch /></div>
      <div className='flex'>
        <SideBar />
        <div className={`${styles.quiz}  w-full`}>

          <h1 className={`${styles.dashboard_Title} text-2xl font-semibold m-[20px_20px_40px] text-[#f26a40] relative`}>
            جميع الاختبارات
          </h1>
          <div className='flex h-[45px] items-center gap-4 mr-8'>
            <div className="md:inline-flex w-1/3 relative">
              <input
                type="text"
                placeholder="بحث....."
                className="w-full flex-1 rounded-full text-gray-900 text-lg placeholder:text-base placeholder:tracking-wide shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-normal focus:ring-1 focus:ring-darkText sm:text-sm px-4 py-2"
              />

              <SearchIcon className="absolute text-black top-2.5 left-4 text-xl" />

            </div>
            <div className='w-2/3 flex items-center gap-4'>
              <div>
                <select className="w-[151px] h-[42px] p-[4px_12px] bg-[rgba(170,190,209,0.2)] rounded-[10px] text-black dark:text-white text-[16px] font-normal cursor-pointer appearance-none outline-none border-none bg-no-repeat bg-left-center"
                >
                  <option value="1" className='text-black'>الصف الدراسي</option>
                  <option value="2" className='text-black'>الاول الثانوي</option>
                  <option value="3" className='text-black'>الثاني الثانوي </option>
                  <option value="4" className='text-black'>الثالث الثانوي</option>
                </select>
              </div>
              <div>
                <select className="w-[151px] h-[42px] p-[4px_12px] bg-[#AABED11A] rounded-[10px] text-black dark:text-white text-[16px] font-normal cursor-pointer appearance-none outline-none border-none bg-no-repeat bg-left-center"
                >
                  <option className='text-black'>الحاله</option>
                  <option value="1" className='text-black'>ممتحن</option>
                  <option value="2" className='text-black'>غير ممتحن</option>
                </select>
              </div>

            </div>
          </div>

          <div className="projects p-5 bg-[#AABED11A] rounded-lg m-5">
            <div className="overflow-x-auto">
              <table className="text-lg w-full">
                <thead className='bg-dashboardOrange font-semibold dark:text-white text-black dark:bg-[#AABED11A]'>
                  <tr>
                    <td>عنوان الاختبار</td>
                    <td>التاريخ</td>
                    <td>التفاصيل</td>
                    <td>التحكم</td>
                  </tr>
                </thead>
                <tbody className='dark:text-white text-black'>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center">Loading...</td>
                    </tr>
                  ) : quizes.length > 0 ? (
                    quizes.map((quiz) => (
                      <tr key={quiz.id}>
                        <td>{quiz.title}</td>
                        <td>{new Date(quiz.created_at).toLocaleDateString()}</td>
                        <td>{quiz.description}</td>
                        <td><div className='flex items-center gap-2'>
                          <MoreVertIcon />
                          <EditIcon
                            className=''
                          />
                          <img
                            src={delet}
                            alt="delet"
                            width={20}
                            height={20}
                          />

                        </div></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllQuizes;
