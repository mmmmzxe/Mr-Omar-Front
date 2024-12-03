import React, { useState, useEffect } from "react";
import styles from "./student.module.css";
import style from '../../dashboard.module.css';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import HeaderSearch from "../../component/HeaderSearch";
import SideBar from "../../component/SideBar";

const AllStudent = () => {
  const [students, setStudents] = useState([]);
  const [openmodel, setOpenModel] = useState(false);
  const [detailsIndex, setDetailsIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);

  const toggleDetails = (index, studentId) => {
    localStorage.setItem("studentId", studentId);
    console.log("Stored Student ID:", studentId);

    setDetailsIndex(detailsIndex === index ? null : index);
  };
  const closeModel = () => {
    setOpenModel(false);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    fetch("https://omarroshdy.com/api/v1/allstudents", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Sort students by id in ascending order
        const sortedStudents = data.sort((a, b) => a.id - b.id);
        setStudents(sortedStudents);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  // Get current students based on page number
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Function to store student ID in localStorage
  const handleControlClick = (studentId) => {
    localStorage.setItem("selectedStudentId", studentId);
    console.log("Student ID stored in localStorage:", studentId);
  };
  useEffect(() => {
    const studentId = localStorage.getItem("studentId");
    if (studentId) {
      console.log("Retrieved Student ID from localStorage:", studentId);
    } else {
      console.log("No student ID found in localStorage");
    }
  }, []);

  return (
    <>
      <div className={style.header_Dashboard}><HeaderSearch /></div>
      <div className="flex">
        <SideBar />
        <div className='container mt-12 flex'>
          <div className={styles.main}>
            <div className={styles.firstrow}>
              <div className="projects md:inline-flex w-1/3 relative">
                <input
                  type="text"
                  placeholder="بحث....."
                  className="w-full flex-1 rounded-full text-gray-900 text-lg placeholder:text-base placeholder:tracking-wide shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-normal focus:ring-1 focus:ring-darkText sm:text-sm px-4 py-2"
                />
                <SearchIcon className="absolute text-black top-2.5 left-4 text-xl" />
              </div>
              <div className={styles.select_container}>
                <div>
                  <select className={`${styles.selected} ml-1`}>
                    <option value="1" className='text-black '>الصف الدراسي</option>
                    <option value="2" className='text-black'>الاول الثانوي</option>
                    <option value="3" className='text-black'>الثاني الثانوي </option>
                    <option value="4" className='text-black'>الثالث الثانوي</option>
                  </select>
                </div>
                <div>
                  <select className={`${styles.selected_state} ml-1`}>
                    <option className="text-black">الحاله</option>
                    <option value="1" className='text-black'>ممتحن</option>
                    <option value="2" className='text-black'>غير ممتحن</option>
                  </select>
                </div>

                <div>
                  <select className={styles.selected_log}>
                    <option value="1" className='text-black'>حالة التسجيل</option>
                    <option value="2" className='text-black'>نشط</option>
                    <option value="3" className='text-black'>غير نشط</option>
                  </select>
                </div>
              </div>
            </div>

            <table className={styles.table}>
              <thead className="text-black dark:text-white">
                <tr>
                  <th className={styles.th}>كود الطالب</th>
                  <th className={styles.th}>اسم الطالب</th>
                  <th className={styles.th}>الصف الدراسي</th>
                  <th className={styles.th}>التاريخ</th>
                  <th className={styles.th}>حالة التسجيل</th>
                  <th className={styles.th}>التحكم</th>
                </tr>
              </thead>
              <tbody className="text-black dark:text-white">
                {currentStudents.map((student, index) => (
                  <tr key={student.id}>
                    <td className={styles.td}>{student.id}</td>
                    <td className={styles.td}>{student.name}</td>
                    <td className={styles.td}>{student.studyyear}</td>
                    <td className={styles.td}>{new Date(student.created_at).toLocaleDateString()}</td>
                    <td className={styles.td}>
                      {student.is_active === 1 ? "نشط" : "غير نشط"}
                    </td>
                    <td onClick={() => toggleDetails(index, student.id)} className={styles.td}>
                      <MoreVertIcon />
                      {detailsIndex === index && (
                        <Link to="/dashboard/details" className={styles.detailsBox}>
                          عرض التفاصيل
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.lastrow}>
<Link to='/signup'>          <button className={`${styles.button} xl:ml-32 ml-0`}>
            <span
              onClick={() => setOpenModel((prev) => !prev)}
              className={`${styles.sapn} text-base md:text-xl`}
            >
              + إضافة طالب
            </span>
          </button></Link>
          <button className={`${styles.button} xl:ml-32 ml-0`}>
            <span
              onClick={() => setOpenModel((prev) => !prev)}
              className={`${styles.sapn} text-base md:text-xl`}
            >
              + اضافه اشعار  
            </span>
          </button>
          <div className={`${styles.Pagination} xl:ml-16 ml-0  `}>
              <Stack spacing={1}>
                <Pagination
                  count={Math.ceil(students.length / studentsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  sx={{
                    '& .MuiPaginationItem-root': {
                      color: 'gray',
                      borderColor: 'gray',
                    },
                    '& .MuiPaginationItem-root.Mui-selected': {
                      backgroundColor: 'gray',
                      color: 'orange',
                    },
                  }}
                />
              </Stack>
            </div>
        </div>
           
          </div>
          {openmodel && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h1 className={styles.model_heading}>إرسال إشعارات جماعية</h1>
              <input
                placeholder="اكتب الإشعار الذي تود إرساله"
                type="text"
                className={styles.input_model}
              />
              <div className={styles.model_input_container}>
                <div className={styles.input_and_label}>
                  <input id="first" type="checkbox" />
                  <label htmlFor="first">الصف الأول الثانوي</label>
                </div>
                <div className={styles.input_and_label}>
                  <input id="secound" type="checkbox" />
                  <label htmlFor="secound">الصف الثاني الثانوي</label>
                </div>
                <div className={styles.input_and_label}>
                  <input id="therd" type="checkbox" />
                  <label htmlFor="therd">الصف الثالث الثانوي</label>
                </div>
              </div>
              <div className={styles.send_or_cansel}>
                <button className={styles.send}>إرسال</button>
                <button onClick={closeModel} className={styles.cansel}>
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default AllStudent;
