import React from "react";
import styles from "./finacial.module.css";
import style from '../../dashboard.module.css';
import img1 from '../../../assets/studentnumber.svg'
import lectursImg from '../../../assets/lecturs-num.svg'
import profit from '../../../assets/profets-noncomplete.svg'
import { Pagination, Stack } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import delet from '../../../assets/delet.svg'
import EditIcon from '@mui/icons-material/Edit';
import SideBar from "../../component/SideBar";
import HeaderSearch from "../../component/HeaderSearch";
const Finacial = () => {
    return (
        <>
            <div className={style.header_Dashboard}><HeaderSearch /></div>
            <div className="flex">
                <SideBar />
                <div className={styles.container}>
                    <div className={styles.main}>
                        <div className={`${styles.statsitc} mr-4 md:mr-12`}>
                            <div className={styles.card}>
                                <img
                                    src={img1}
                                    alt="studentnumber"
                                    width={40}
                                    height={40}
                                    className="mx-auto my-2"
                                />
                                <p className={styles.content}>نسبة المدفوعات المكتملة</p>
                                <span className={styles.numbers}>450%</span>
                            </div>
                            <div className={styles.card}>
                                {" "}
                                <img
                                    src={lectursImg}
                                    alt="lecturs-num"
                                    width={40}
                                    height={40}
                                    className="mx-auto my-2"
                                />
                                <p className={styles.content}>إجمالي المدفوعات المكتملة</p>
                                <span className={styles.numbers}>1200</span>
                            </div>
                            <div className={styles.card}>
                                {" "}
                                <img
                                    src={profit}
                                    alt="profets-noncomplete"
                                    width={40}
                                    height={40}
                                    className="mx-auto my-2"
                                />
                                <p className={styles.content}>إجمالي المدفوعات غير المكتملة</p>
                                <span className={styles.numbers}>30</span>
                            </div>
                        </div>
                        {/* scound row */}
                        <div className={`${styles.secoundrow} my-4`}>
                            <div className="projects md:inline-flex w-1/3 relative">
                                <input
                                    type="text"
                                    placeholder="بحث....."
                                    className="w-full  flex-1 rounded-full text-gray-900 text-lg placeholder:text-base placeholder:tracking-wide shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-normal focus:ring-1 focus:ring-darkText sm:text-sm px-4 py-2"
                                />

                                <SearchIcon className="absolute text-black top-2.5 left-4 text-xl" />

                            </div>
                            <div className={styles.select_container}>
                                <div>
                                    <select className={styles.selected}>
                                        <option className="text-black" value="1">الصف الدراسي</option>
                                        <option className="text-black" value="2">الاول الثانوي</option>
                                        <option className="text-black" value="3">الثاني الثانوي </option>
                                        <option className="text-black" value="4">الثالث الثانوي</option>
                                    </select>
                                </div>
                                <div>
                                    <select className={styles.selected_history}>
                                        <option className="text-black">التاريخ </option>
                                        <option className="text-black" value="1">10/10/2024</option>
                                    </select>
                                </div>
                                <div>
                                    <select className={styles.selected_payments}>
                                        <option className="text-black" value="1">طريقة الدفع</option>
                                        <option className="text-black" value="2">بطاقة ائتمان</option>
                                        <option className="text-black" value="3">تحويل بنكي</option>
                                        <option className="text-black" value="3">فودافون كاش</option>
                                        <option className="text-black" value="3">نقدي</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* therd row */}
                        <div className={styles.downpart}>
                            <h1 className='text-black dark:text-white text-lg'>
                                تفاصيل المدفوعات الخاصة بالطلاب
                            </h1>
                            <table className={styles.table}>
                                <thead>
                                    <tr className="text-black dark:text-white">
                                        <th className={styles.th}>اسم الطالب</th>
                                        <th className={styles.th}>الصف الدراسي</th>
                                        <th className={styles.th}>المبلغ المدفوع</th>
                                        <th className={styles.th}>حالة الدفع</th>
                                        <th className={styles.th}>التاريخ</th>
                                        <th className={styles.th}>طريقة الدفع</th>
                                        <th className={styles.th}>التحكم</th>
                                    </tr>
                                </thead>
                                <tbody className="text-black dark:text-white">
                                    {[...Array(6)].map((_, index) => (
                                        <tr key={index} className={styles.test}>
                                            <td className={styles.td}>محمود أحمد عبدالله</td>
                                            <td className={styles.td}>الأول الثانوي</td>
                                            <td className={styles.td}>200 جنيه</td>
                                            <td className={styles.td}>دفعة جزئية</td>
                                            <td className={styles.td}>10/10/2024</td>

                                            <td className={styles.td}>بطاقة ائتمان</td>
                                            <td className={styles.td}>
                                                <div className={styles.controll}>
                                                    <EditIcon />
                                                    <img
                                                        src={delet}
                                                        alt="delet"
                                                        width={20}
                                                        height={20}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Last Row */}
                        <div className={styles.lastrow}>
                            <button className={`${styles.button} `}>
                                <span className={styles.sapn}>+ إضافة دفعة جديدة</span>
                            </button>
                            <div className={styles.Pagination}>
                                <Stack spacing={1}>
                                    <Pagination
                                        count={6}
                                        sx={{
                                            '& .MuiPaginationItem-root': {
                                                color: 'gray',
                                                borderColor: 'white',
                                            },
                                            '& .MuiPaginationItem-root.Mui-selected': {
                                                backgroundColor: 'gray',
                                                color: 'black',
                                            },
                                        }}
                                    />
                                </Stack>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Finacial;
