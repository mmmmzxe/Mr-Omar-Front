import React, { useState, useEffect } from 'react';
import '../result/result.css';
import styles from '../quiz/quiz.module.css';
import styless from '../../dashboard.module.css';
import style from '../allStudent/student.module.css';
import delet from '../../../assets/delet.svg'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import SideBar from '../../component/SideBar';
import HeaderSearch from '../../component/HeaderSearch';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const AllQuizes = () => {
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const navigate = useNavigate();
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
  const updateModel = () => {
    setIsUpdateOpen(true);
  };
  const closeUpdateModal = () => {
    setIsUpdateOpen(false);
  };
  const handlModel = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleUpdateQuiz = () => {
    const token = localStorage.getItem('accessToken');
    const updatedData = {
      title: newTitle || undefined,
      description: newDescription || undefined,
    };
  
    fetch(`https://omarroshdy.com/api/v1/quiz/${selectedQuizId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          toast.success("تم تحديث الكويز بنجاح");
          closeUpdateModal();
          // إعادة تحميل الكويزات من الخادم لتحديث الواجهة
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
            })
            .catch((error) => {
              console.error('Error fetching updated quizzes:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error updating quiz:', error);
      });
  };
  const handleDeleteQuiz = () => {
    const token = localStorage.getItem('accessToken');
  
    fetch(`https://omarroshdy.com/api/v1/quiz/${selectedQuizId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.ok) {
        toast.success('تم حذف الكويز بنجاح');
        navigate('/dashboard');
        setQuizes((prevQuizes) => prevQuizes.filter((quiz) => quiz.id !== selectedQuizId));
        closeModal();
      } else {
        toast.error('فشل حذف الكويز');
      }
    })
    .catch((error) => {
      console.error('Error deleting quiz:', error);
      toast.error('حدث خطأ أثناء حذف الكويز');
    });
  };
   
  return (
    <>
      <div className={styless.header_Dashboard}><HeaderSearch /></div>
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
                          <button onClick={updateModel}><EditIcon /></button>
                          {isUpdateOpen && (
                            <div className={style.modalOverlay}>
                              <div className={style.modalContent}>
                                <div className={`${style.personal_info}`}>
                                  {/* الاسم */}
                                  <div className={style.personal_box}>
                                    <label className={style.lable}>عنوان الاختبار</label>
                                    <input
                                      type="text"
                                      placeholder="عنوان جديد"
                                      value={newTitle}
                                      onChange={(e) => setNewTitle(e.target.value)}
                                      className="block w-full rounded-md border-0 bg-gray-200 py-1.5 px-4 outline-none text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-skyText sm:text-sm sm:leading-6 mt-2"
                                    />

                                  </div>

                                  {/* البريد الإلكتروني */}
                                  <div className={style.personal_box}>
                                    <label className={style.lable}>  التفاصيل</label>
                                    <input
                                      type="text"
                                      placeholder="تفاصيل جديدة"
                                      value={newDescription}
                                      onChange={(e) => setNewDescription(e.target.value)}
                                      className="block w-full rounded-md border-0 bg-gray-200 py-1.5 px-4 outline-none text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-skyText sm:text-sm sm:leading-6 mt-2"
                                    />
                                  </div>
                                </div>
                                <div className="w-full">
                                  <select
                                    className="outline-none bg-gray-200 dark:bg-gray-500 dark:text-white w-full text-base border-b-2 border-gray-200 dark:border-categoryColor p-2 rounded-md cursor-pointer text-black"
                                    value={selectedQuizId}
                                    onChange={(e) => setSelectedQuizId(e.target.value)}
                                  >
                                    <option value="">اختر عنوان الاختبار</option>
                                    {quizes.map((quiz) => (
                                      <option key={quiz.id} value={quiz.id}>
                                        {quiz.title} : {quiz.id}
                                      </option>
                                    ))}
                                  </select>

                                </div>
                                <div className="flex items-center gap-4">
                                  <button onClick={handleUpdateQuiz} className={`${style.delet} text-black`}>
                                    تعديل
                                  </button>
                                  <button className="text-black" onClick={closeUpdateModal}>
                                    إلغاء
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                          <button onClick={handlModel}><img
                            src={delet}
                            alt="delet"
                            width={20}
                            height={20}
                          /></button>
{isModalOpen && (
                              <div className={style.modalOverlay}>
                                <div className={style.modalContent}>
                                  <p className="text-black">
                                    هل أنت متأكد من حذف الكويز من علي المنصة؟
                                  </p>
                                  <div className="w-full">
                                    <select
                                      className="outline-none bg-gray-200 dark:bg-gray-500 dark:text-white w-full text-base border-b-2 border-gray-200 dark:border-categoryColor p-2 rounded-md cursor-pointer text-black"
                                      value={selectedQuizId}
                                      onChange={(e) => setSelectedQuizId(e.target.value)}
                                    >
                                      <option value="">اختر عنوان الاختبار</option>
                                      {quizes.map((quiz) => (
                                        <option key={quiz.id} value={quiz.id}>
                                          {quiz.title} : {quiz.id}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <button onClick={handleDeleteQuiz} className={`${style.delet} text-black`}>
                                      حذف
                                    </button>
                                    <button className="text-black" onClick={closeModal}>
                                      إلغاء
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
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
