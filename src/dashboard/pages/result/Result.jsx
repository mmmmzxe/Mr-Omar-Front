import React, { useState, useEffect } from 'react';
import '../result/result.css';
import styles from '../quiz/quiz.module.css';
import style from '../../dashboard.module.css';
import delet from '../../../assets/delet.svg';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import SideBar from '../../component/SideBar';
import HeaderSearch from '../../component/HeaderSearch';
import toast from 'react-hot-toast';

const Result = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    fetch('https://omarroshdy.com/api/v1/quiz', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setQuizzes(data);
      })
      .catch(error => {
        console.error('Error fetching quiz:', error);
      });
  }, [accessToken]);

  const fetchResults = (quizId) => {
    fetch(`https://omarroshdy.com/api/v1/result?quiz_id=${quizId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setResults(data);
      })
      .catch(error => {
        console.error('Error fetching results:', error);
      });
  };

  const handleQuizChange = (event) => {
    const selectedQuizId = event.target.value;
    if (selectedQuizId) {
      fetchResults(selectedQuizId);
    }
  };
  const handleDelete = (resultId) => {
    if (!accessToken) {
      toast.error("توكين الوصول غير موجود");
      return;
    }

    fetch(`https://omarroshdy.com/api/v1/result/${resultId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => {
        if (response.ok) {
          toast.success("تم حذف النتيجة بنجاح");
          setResults(results.filter(result => result.id !== resultId));
        } else {
          toast.error("فشل في حذف النتيجة، حاول مرة أخرى");
        }
      })
      .catch(() => {
        toast.error("حدث خطأ أثناء حذف النتيجة");
      });
  };

  // تصفية النتائج بناءً على الاسم
  const filteredResults = results.filter((result) =>
    result.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={style.header_Dashboard}><HeaderSearch /></div>
      <div className='flex'>
        <SideBar />
        <div className={`${styles.quiz}  w-full`}>
          <h1 className={`${styles.dashboard_Title} text-2xl font-semibold m-[20px_20px_40px] text-[#f26a40] relative`}>
            نتائج الاختبارات
          </h1>
          <div className='flex h-[45px] items-center gap-4 mr-8'>
            <div className="md:inline-flex w-1/3 relative">
              <input
                type="text"
                placeholder="بحث عن اسم الطالب..."
                className="w-full flex-1 rounded-full text-gray-900 text-lg placeholder:text-base placeholder:tracking-wide shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-normal focus:ring-1 focus:ring-darkText sm:text-sm px-4 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon className="absolute text-black top-2.5 left-4 text-xl" />
            </div>
            <div className='w-2/3 flex items-center gap-4'>
              <div>
                <select className="w-[151px] h-[42px] p-[4px_12px] bg-[rgba(170,190,209,0.2)] rounded-[10px] text-black dark:text-white text-[16px] font-normal cursor-pointer appearance-none outline-none border-none bg-no-repeat bg-left-center">
                  <option value="1" className='text-black'>الصف الدراسي</option>
                  <option value="2" className='text-black'>الاول الثانوي</option>
                  <option value="3" className='text-black'>الثاني الثانوي</option>
                  <option value="4" className='text-black'>الثالث الثانوي</option>
                </select>
              </div>
              <div>
                <select
                  className="w-[151px] h-[42px] p-[4px_12px] bg-[#AABED11A] rounded-[10px] text-black dark:text-white text-[16px] font-normal cursor-pointer appearance-none outline-none border-none bg-no-repeat bg-left-center"
                  onChange={handleQuizChange}
                >
                  <option className='text-black'>عنوان الكويز</option>
                  {quizzes.map((quiz) => (
                    <option
                      key={quiz.id}
                      value={quiz.id}
                      className="text-base border-0 outline-none capitalize bg-white text-black"
                    >
                      {quiz.title} : {quiz.id}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="projects p-5 bg-[#AABED11A] rounded-lg m-5">
            <div className="overflow-x-auto">
              <table className="text-lg w-full">
                <thead className='bg-dashboardOrange font-semibold dark:text-white text-black dark:bg-[#AABED11A]'>
                  <tr>
                    <td>اسم الطالب</td>
                    <td>الصف الدراسى</td>
                    <td>درجه الاختبار</td>
                    <td>التاريخ</td>
                    <td>التحكم</td>
                  </tr>
                </thead>
                <tbody className='dark:text-white text-black'>
                  {filteredResults.map((result) => (
                    <tr key={result.id}>
                      <td>{result.user.name}</td>
                      <td>{result.user.studyyear || "غير محدد"}</td>
                      <td>{result.score}</td>
                      <td>{new Date(result.created_at).toLocaleDateString()}</td>
                      <td>
                        <div className='flex items-center gap-2'>
                          <MoreVertIcon />
                          <EditIcon />
                          <img
                            src={delet}
                            alt="delet"
                            width={20}
                            height={20}
                            className="cursor-pointer"
                            onClick={() => handleDelete(result.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
