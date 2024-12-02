import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./student.module.css";
import style from '../../dashboard.module.css';
import delet from "../../../assets/delet.svg";
import Pieprogress from "./Pieprogress";
import Lineprogress from "./Lineprogress";
import next from '../../../assets/next.svg';
import prev from '../../../assets/prev.svg';
import EditIcon from '@mui/icons-material/Edit';
import SideBar from "../../component/SideBar";
import HeaderSearch from "../../component/HeaderSearch";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const StudentDetails = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [score, setScore] = useState(null);
  const [studyYear, setStudyYear] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const handlModel = () => {
    setIsModalOpen(true);
  };
  const updateModel = () => {
    setIsUpdateOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeUpdateModal = () => {
    setIsUpdateOpen(false);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const studentId = localStorage.getItem("studentId");

    if (accessToken && studentId) {
      // Fetching student details
      fetch("https://omarroshdy.com/api/v1/allstudents", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const student = data.find((student) => student.id === parseInt(studentId));
          if (student) {
            setStudentName(student.name);
            setStudentEmail(student.email);
            setStudyYear(student.studyyear);
          } else {
            console.log("Student not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching student data:", error);
        });

      // Fetching result details
      fetch(`https://omarroshdy.com/api/v1/result/${studentId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((resultData) => {
          if (resultData) {
            setScore(resultData.score);
            setCreatedAt(resultData.created_at);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching result data:", error);
          setLoading(false);
        });
    } else {
      console.log("Access token or student ID not found in local storage");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Convert score to percentage if needed  
  const scorePercentage = score !== null ? ((score / 10) * 100).toFixed(2) + "%" : "-";
  const updateStudent = () => {
    const accessToken = localStorage.getItem("accessToken");
    const studentId = localStorage.getItem("studentId");

    if (accessToken && studentId) {
      setLoading(true);
      fetch(`https://omarroshdy.com/api/v1/updstu/${studentId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
        }),
      })
        .then((response) => {
          if (response.ok) {
            toast.success("تم تحديث الطالب بنجاح");
            navigate('/dashboard/all_Student');
            closeUpdateModal();
          } else {
            toast.error("فشل فى تحديث الطالب، حاول مرة أخرى");
          }
        })
        .catch(() => {
          toast.error("فشل فى تحديث الطالب، حاول مرة أخرى");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.error("فشل فى تحديث الطالب، حاول مرة أخرى");
    }
  };

  const deleteStudent = () => {
    const accessToken = localStorage.getItem("accessToken");
    const studentId = localStorage.getItem("studentId");

    if (accessToken && studentId) {
      setLoading(true);
      fetch(`https://omarroshdy.com/api/v1/delstu/${studentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            toast.success("تم حذف الطالب بنجاح");
            navigate('/dashboard/all_Student');
            setIsModalOpen(false);
          } else {
            toast.error("فشل فى حذف الطالب حاول مره اخرى");
          }
        })
        .catch((error) => {
          toast.error("فشل فى حذف الطالب حاول مره اخرى");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.error("فشل فى حذف الطالب حاول مره اخرى");
    }
  };

  return (
    <>
      <div className={style.header_Dashboard}><HeaderSearch /></div>
      <div className="flex">
        <SideBar />
        <div className='container my-8'>
          <div className={styles.main}>
            <div className={`${styles.upperpart} flex lg:my-0 my-8 lg:flex-row lg:gap-24 gap-8 items-center text-center flex-col`}>
              <div className={styles.rightsied}>
                <div className={styles.personal}>
                  <h1 className={styles.personal_heading}>معلومات شخصية</h1>
                  <button onClick={updateModel} className={`${styles.edit_btn} text-black dark:text-white`}>
                    <EditIcon />
                    <span className="text-black dark:text-white">تعديل</span>
                  </button>
                  {isUpdateOpen && (
                    <div className={styles.modalOverlay}>
                      <div className={styles.modalContent}>
                        <div className={`${styles.personal_info}`}>
                          {/* الاسم */}
                          <div className={styles.personal_box}>
                            <label className={styles.lable}>الاسم</label>
                            <input
                              type="text"
                              className="block w-full rounded-md border-0 bg-gray-200 py-1.5 px-4 outline-none text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-skyText sm:text-sm sm:leading-6 mt-2"
                              value={newName}
                              onChange={(e) => setNewName(e.target.value)}
                            />
                          </div>

                          {/* البريد الإلكتروني */}
                          <div className={styles.personal_box}>
                            <label className={styles.lable}>البريد الإلكتروني</label>
                            <input
                              type="email"
                              className="block w-full rounded-md border-0 bg-gray-200 py-1.5 px-4 outline-none text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-skyText sm:text-sm sm:leading-6 mt-2"
                              value={newEmail}
                              onChange={(e) => setNewEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            className={`${styles.delet} text-black`}
                            onClick={updateStudent}
                            disabled={loading}
                          >
                            {loading ? "جاري التحديث..." : "تحديث"}
                          </button>
                          <button className="text-black" onClick={closeUpdateModal}>
                            إلغاء
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <button onClick={handlModel} className={`${styles.delet_btn} text-black dark:text-white`}>
                    <img src={delet} alt="delet" width={24} height={24} />
                    <span>حذف</span>
                  </button>
                  {isModalOpen && (
                    <div className={styles.modalOverlay}>
                      <div className={styles.modalContent}>
                        <p className="text-black">
                          هل أنت متأكد من حذف الطالب {studentName} من علي المنصة؟
                        </p>
                        <div className="flex items-center gap-4">
                          <button
                            className={`${styles.delet} text-black`}
                            onClick={deleteStudent}
                            disabled={loading}
                          >
                            {loading ? "جاري الحذف..." : "حذف"}
                          </button>
                          <button className="text-black" onClick={closeModal}>
                            إلغاء
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
                <div className={`${styles.personal_info}`}>
                  {/* الاسم */}
                  <div className={styles.personal_box}>
                    <label className={styles.lable}>الاسم</label>
                    <div className={styles.info_box}>
                      <p className={`${styles.info} text-black dark:text-white`}>{studentName}</p>
                    </div>
                  </div>

                  {/* البريد الإلكتروني */}
                  <div className={styles.personal_box}>
                    <label className={styles.lable}>البريد الإلكتروني</label>
                    <div className={styles.info_box}>
                      <p className={`${styles.info} text-black dark:text-white`}>{studentEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.leftsied}>
                <h1 className={`${styles.personal_heading} mb-4`}>نسبة الحضور والغياب</h1>
                <div className={styles.chart_box}>
                  <div className={styles.pie_container}>
                    <Pieprogress />
                  </div>
                  <div className={styles.line_container}>
                    <Lineprogress />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.downpart}>
              <h1 className={styles.personal_heading}>تفاصيل الاختبارات</h1>
              <table className={styles.table}>
                <thead className="text-black dark:text-white">
                  <tr>
                    <th className={styles.th}>الدرجة</th>
                    <th className={styles.th}>النسبة المئوية</th>
                    <th className={styles.th}>الفصل الدراسى</th>
                    <th className={styles.th}>التاريخ</th>
                  </tr>
                </thead>
                <tbody className="text-black dark:text-white">
                  <tr>
                    <td className={styles.td}>{score !== null ? score : "غير متوفر"}</td>
                    <td className={styles.td}>{scorePercentage}</td>
                    <td className={styles.td}>{studyYear}</td>
                    <td className={styles.td}>{createdAt ? new Date(createdAt).toLocaleDateString() : "غير متوفر"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.lastrow}>
              <div className={styles.next_container}>
                <img src={next} alt="next" width={24} height={24} />
                <button className={`${styles.next_btn} text-black dark:text-white`}>الطالب التالي</button>
              </div>
              <div className={styles.prev_container}>
                <button className={`${styles.prev_btn} text-black dark:text-white`}>الطالب السابق</button>
                <img src={prev} alt="prev" width={24} height={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDetails;